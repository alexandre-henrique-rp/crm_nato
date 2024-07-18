"use client";
import { Flex, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SelectProps {
  SetValue: any;
  onValue: any;
  hierarquia: string;
  tag: string;
}

export const SelectComponent = ({
  SetValue,
  onValue,
  hierarquia,
  tag
}: SelectProps) => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        if (tag === "empreendimento") {
          const req = await fetch("/api/empreendimento/getall");
          const res = await req.json();
          setData(res);
        } else if (tag === "construtora") {
          const req = await fetch("/api/construtora/getall");
          const res = await req.json();
          console.log("🚀 ~ res:", res);
          setData(res);
        } else {
          const req = await fetch("/api/usuario/getall");
          const res = await req.json();
          setData(res);
        }
      })();
    } else if (hierarquia === "CONST") {
      (async () => {
        if (tag === "empreendimento") {
          const req = await fetch("/api/empreendimento/getall");
          const res = await req.json();
          setData(res);
        } else if (tag === "construtora") {
          const req = await fetch("/api/construtora/getall");
          const res = await req.json();
          setData(res);
        } else {
          const req = await fetch("/api/usuario/getall");
          const res = await req.json();
          setData(res);
        }
      })();
    } else {
      setData(SetValue);
      onValue(Number(SetValue));
    }
  }, [SetValue, hierarquia, onValue, tag]);
  return (
    <Flex w={"full"} py={"0.5rem"}>
      <Select onChange={(e) => onValue(Number(e.target.value))} placeholder={`Escolha ${tag === "construtora"? "uma construtora" : "um" + tag }`}>
        {Data &&
          Data.map((item: any) => (
            <option key={item.id} value={item.id}>
              {tag === "construtora" ? item.razaosocial : item.nome}
            </option>
          ))}
      </Select>
    </Flex>
  );
};
