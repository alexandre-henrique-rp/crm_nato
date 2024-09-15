"use client";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface DropEmpreendimentoProps {
  value: number;
}
export default function DropEmpreendimento({ value }: DropEmpreendimentoProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;
  const [Data, setData] = useState<any>([]);
  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        const req = await fetch("/api/empreendimento/getall");
        const res = await req.json();
        setData(res);
      })();
    } else {
      const Empreedimento = user?.empreendimento;
      setData(Empreedimento);
    }
  }, []);

  return (
    <>
      {Data.length > 1 && (
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="link" colorScheme="gray" pt={3}>
                Alterar Empreendimento
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Alterar Empreendimento</PopoverHeader>
              <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
                <Select
                  size={"sm"}
                  borderRadius={"10px"}
                  placeholder="Selecione"
                  name="empreendimento"
                  value={Number(value)}
                >
                  {Data.map((item: any) => (
                    <option key={item.id} value={Number(item.id)}>
                      {item.nome}
                    </option>
                  ))}
                </Select>
                <IconButton
                  icon={<FaPlus />}
                  aria-label={"substituir"}
                  colorScheme={"teal"}
                  size={"sm"}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
}
