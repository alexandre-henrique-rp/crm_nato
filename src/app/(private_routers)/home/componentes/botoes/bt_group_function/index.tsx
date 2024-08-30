"use client";

import BtmDistrato from "@/app/componentes/btm_distra";
import { BotaoRetorno } from "@/app/componentes/btm_retorno";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Image,
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
  distrato: boolean;
  exclude?: boolean;
}

export const BotoesFunction = ({ id, onUpdate, distrato, exclude }: BotoesFunctionProps) => {
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
        <Box hidden={exclude}>
          <IconButton
            colorScheme="red"
            variant="outline"
            icon={<BsFillTrashFill />}
            aria-label="Delete"
            onClick={onOpen}
            _hover={{ bg: "red.300", color: "white", border: "none" }}
          />
        </Box>
        <BtmDistrato id={id} distrato={distrato} exclude={exclude} />
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
            <Flex gap={3}>

            <Button colorScheme="blue" leftIcon={<IoIosArrowBack />} onClick={onClose} />

            <Button
              // leftIcon={<BsFillTrashFill />}
              onClick={(e) => HandleDelet(e)}
              colorScheme="red"
            >
              Confirmar Exclusão
            </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
