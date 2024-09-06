"use client";

import {
    Box,
  Flex,
  IconButton,
  Input,
  InputProps,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface InputRelacionamentoProps extends InputProps {
  setValueRelacionamento: string[];
}


export function InputRelacionamento({
  setValueRelacionamento,
  ...props
}: InputRelacionamentoProps) {
  const [Relacionamento, setRelacionamento] = useState<string>("");
  const [RelacionamentoData, setRelacionamentoData] = useState<any>([]);
  const Toast = useToast();

  console.log(setValueRelacionamento);
  useEffect(() => {
      setRelacionamentoData(setValueRelacionamento);
  }, []);

  const handleChange = async () => {
    const request = await fetch(`src/app/api/consulta/cpf/${Relacionamento}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    if (request.ok) {
      setRelacionamentoData([...RelacionamentoData, data]);
      setRelacionamento("");
      //setar o valor RelacionamentoData para ser resgatado no FormData quando o submit for realizado
     
    } else {
      Toast({
        title: "cpf não encontrado",
        description: "Cpf não tem cadastro no sistema",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Flex>
        <Input
          type="text"
          {...props}
          value={Relacionamento}
          onChange={(e) => setRelacionamento(e.target.value)}
        />
        <IconButton
          icon={<FaPlus />}
          aria-label={"Adicionar"}
          onClick={handleChange}
          colorScheme={"teal"}
        />
      </Flex>
      <Flex>
        {RelacionamentoData.length > 0 &&
          RelacionamentoData.map((item: any) => (
            <Link
              key={item.id}
              href={`/solicitacoes/${item.id}`}
              color="teal.600"
              fontWeight="bold"
            >
              {item.cpf}
            </Link>
          ))}
      </Flex>
      <Box hidden>
        <Input value={JSON.stringify(RelacionamentoData.map((item: any) => item.cpf))} name="relacionamentoDb" hidden/>
      </Box>
    </>
  );
}
