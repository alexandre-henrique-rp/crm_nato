"use client";

import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

interface CpfProps {
  OnCpf: string;
}

export const ModalConsultaRegistro = ({ OnCpf }: CpfProps) => {
  const [CPF, setCPF] = useState("");
  const [CPFMask, setCPFMask] = useState("");
  const toast = useToast();
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

useEffect(() => {
  console.log('aki');
  onOpen();
}, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!CPF) {
      toast({
        title: "Erro!",
        description: "o CPF e obrigatorio!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    const data = {
      cpf: CPF
    };

    const ID = session?.user?.id;
    try {
      const request = await fetch(`/api/consulta/cpf/${CPF}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (request.ok) {
        const response = await request.json();
        console.log(response);

        toast({
          title: "Sucesso!",
          description: "Alerta criado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao criar alerta!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="blur(15px) hue-rotate(90deg)"
        />
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalHeader>Forneça o cpf do cliente</ModalHeader>
          <FormControl>
            <Divider />
            <ModalBody>
              <Box>
                <FormLabel>CPF</FormLabel>
                <Input
                  type="number"
                  value={CPFMask}
                  onChange={(e) => {
                    const valor = e.target.value;
                    const valorLinpo = unMask(valor);
                    const masked = mask(valorLinpo, "999.999.999-99");
                    const cpfNumber = unMask(CPF);
                    setCPFMask(masked);
                    setCPF(cpfNumber);
                  }}
                />
              </Box>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button colorScheme="whatsapp" mr={3} onClick={onClose}>
                Continuar cadatro
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};
