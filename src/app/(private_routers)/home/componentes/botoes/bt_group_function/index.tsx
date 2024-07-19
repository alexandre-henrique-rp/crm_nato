"use client";

import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

interface BotoesFunctionProps {
  id: number;
  onUpdate: any;
}

export const BotoesFunction = ({ id, onUpdate }: BotoesFunctionProps) => {
  const route = useRouter();
  const { data: session } = useSession();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const HandleDelet = async (e: MouseEvent<HTMLButtonElement>) => {
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
        onUpdate(id);
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
      });
    }
  };
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
          onClick={onOpen}
        />
      </ButtonGroup>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalBody p={10}>
            <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"center"}>
              Você tem certeza de que deseja deletar esta solicitação?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button leftIcon={<IoIosArrowBack />} onClick={onClose} />

            <Button
              leftIcon={<BsFillTrashFill />}
              onClick={(e) => HandleDelet(e)}
              colorScheme="red"
            >
              Confirmar Exclusão
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
