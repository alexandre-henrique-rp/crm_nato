"use client";

import { ButtonGroup, Flex, IconButton, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

interface BotoesFunctionProps {
  id: number;
  onUpdate: any;
}

export const BotoesFunction = ({ id , onUpdate}: BotoesFunctionProps ) => {
  const route = useRouter();
  const { data: session } = useSession();
  const toast = useToast();

  const HandleDelet = async(e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
     try {
      const res = await fetch(`/api/solicitacao/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: session?.token }),
      });

      if (res.ok) {
        onUpdate();
        toast({
          title: "Solicitação deletada",
          description: "Solicitação deletada com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      
     } catch (error) {
      toast({
        title: "Erro, em remover a solicitação",
        description: JSON.stringify(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      })
     }

    
  }
  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <ButtonGroup variant="solid" size="sm" spacing={3}>
        <IconButton
          colorScheme="blue"
          icon={<BsBoxArrowUpRight />}
          aria-label="Up"
          onClick={() => route.push(`/solicitacoes/${id}`)}
        />
        <IconButton
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
          aria-label="Delete"
          onClick={(e) => HandleDelet(e)}
        />
      </ButtonGroup>
    </Flex>
  );
};
