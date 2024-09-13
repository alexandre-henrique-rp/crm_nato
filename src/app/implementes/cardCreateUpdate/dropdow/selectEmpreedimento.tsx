"use client";
import { Select, SelectProps } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface SelectEmpreedimentoProps extends SelectProps {}

export default function SelectEmpreedimento({ ...props }: SelectEmpreedimentoProps) {
  const [Data, setData] = useState<any>([]);
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;

  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        const req = await fetch("/api/empreendimento/getall");
        const res = await req.json();
        setData(res);
      })();
    } else {
      const empreedimento = user?.empreendimento;
      setData(empreedimento);
    }
  }, []);

  return (
    <>
      <Select
        {...props}
        name="empreendimento"
        placeholder="Selecione uma empreendimento"
      >
        {Data.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.nome}
          </option>
        ))}
      </Select>
    </>
  );
}
