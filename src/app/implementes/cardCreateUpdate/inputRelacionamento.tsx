"use client";

import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputProps,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import { revalidateTag } from "next/cache";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { mask, unMask } from "remask";

interface InputRelacionamentoProps extends InputProps {
  setValueRelacionamento: any;
}

export function InputRelacionamento({
  setValueRelacionamento,
  ...props
}: InputRelacionamentoProps) {
  const [Relacionamento, setRelacionamento] = useState<string>("");
  const [RelacionamentoMask, setRelacionamentoMask] = useState<string>("");
  const [RelacionamentoData, setRelacionamentoData] = useState<any>([]);
  const Toast = useToast();

  async function UpdateRelacionamento(id: number, dados: any) {
    const upDate = await fetch(`/api/solicitacao/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });
    const data = await upDate.json();
    if (upDate.ok) {
      return data;
    }
  }

  async function GetDadosCpf(cpf: string) {
    const request = await fetch(`/api/consulta/cpf/${cpf}`);
    const data = await request.json();
    if (request.ok) return data;
    else return null;
  }

  useEffect(() => {
    setRelacionamentoData(setValueRelacionamento.relacionamento);
  }, []);

  const handleChange = async () => {
    const request = await fetch(`/api/consulta/cpf/${Relacionamento}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await request.json();
    const retorno = data.solicitacoes[0];

    if (request.ok) {
      const ArrayData = [
        ...RelacionamentoData,
        {
          id: retorno.id,
          cpf: retorno.cpf,
          name: retorno.name,
          email: retorno.email,
          createdAt: retorno.createdAt,
          dt_nascimento: retorno.dt_nascimento,
          telefone: retorno.telefone,
        },
      ];
      setRelacionamentoData(ArrayData);
      const ArrayAtual = ArrayData.map((item: any) => item.cpf);

      const relacionamentoAtual = [...ArrayAtual, setValueRelacionamento.cpf];

      const processo = await Promise.all(
        relacionamentoAtual.map(async (r: any) => {
          const request = await fetch(`/api/consulta/cpf/${r}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await request.json();
          const filtro = relacionamentoAtual.filter((item: any) => item !== r);

          if (request.ok) {
            const retorno = await UpdateRelacionamento(
              data.solicitacoes[0].id,
              {
                relacionamento: JSON.stringify(filtro),
              }
            );
            return retorno;
          }
        })
      );

      if (processo.length > 0) {
        Toast({
          title: "Relacionamento adicionado",
          description: "Relacionamento adicionado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // revalidateTag("get_solicitacao_id");
      }
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

  const handleDelete = async (cpf: string) => {
    const filtro = RelacionamentoData.filter((item: any) => item.cpf !== cpf);
    const ArrayExclude = RelacionamentoData.filter(
      (item: any) => item.cpf === cpf
    );

    const dados = {
      ...(filtro.length > 0 && {
        relacionamento: JSON.stringify(filtro.map((item: any) => item.cpf)),
      }),
      ...(filtro.length == 0 && { relacionamento: [] }),
    };
    const upDate = await fetch(
      `/api/solicitacao/update/${setValueRelacionamento.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      }
    );

    if (upDate.ok) {
      const request = await GetDadosCpf(cpf);
      const UpateExclude = await UpdateRelacionamento(ArrayExclude[0].id, {});

      Toast({
        title: "Relacionamento Removido",
        description: "Relacionamento Removido da lista com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setRelacionamentoData(filtro);
      revalidateTag("get_solicitacao_id");
    }
  };

  const MaskCpf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const Limpo = unMask(value);
    const Mask = mask(Limpo, ["999.999.999-99"]);
    setRelacionamentoMask(Mask);
    setRelacionamento(Limpo);
  };

  return (
    <>
      <Flex gap={4}>
        <Input
          type="text"
          {...props}
          value={RelacionamentoMask}
          onChange={MaskCpf}
          size={"sm"}
        />
        <IconButton
          icon={<FaPlus />}
          aria-label={"Adicionar"}
          onClick={handleChange}
          colorScheme={"teal"}
          size={"sm"}
        />
      </Flex>
      <Flex>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"link"}
              fontWeight={"bold"}
              mt={2}
              _hover={{ color: "teal.700" }}
            >
              Relacionamentos
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Lista de Relacionamento</PopoverHeader>
            <PopoverBody>
              {RelacionamentoData.length > 0 &&
                RelacionamentoData.map((item: any) => (
                  <Flex justifyContent={"space-between"} key={item.id}>
                    <Link
                      key={item.id}
                      href={`/solicitacoes/${item.id}`}
                      color="teal.600"
                      fontWeight="bold"
                    >
                      {item.cpf}
                    </Link>
                    <IconButton
                      icon={<FaPlus />}
                      aria-label={"remover"}
                      onClick={() => handleDelete(item.cpf)}
                      colorScheme={"cyan"}
                      size={"xs"}
                    />
                  </Flex>
                ))}
              {RelacionamentoData.length == 0 && (
                <Text fontWeight={"bold"}>
                  Cliente não possui relacionamento
                </Text>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
      {/* <Box hidden>
        <Input
          value={JSON.stringify(
            RelacionamentoData.map((item: any) => item.cpf)
          )}
          name="relacionamentoDb"
          hidden
        />
      </Box> */}
    </>
  );
}
