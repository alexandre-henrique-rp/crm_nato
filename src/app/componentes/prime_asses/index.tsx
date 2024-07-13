"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SenhaComponent } from "../Senha";


export const ModalPrimeAsses = () => {
  const [Senha, setSenha] = useState("");
  const [ConfirmeSenha, setConfirmeSenha] = useState("");
 const toast = useToast();
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const primeiro_asseso = session?.user?.reset_password;
  const primeiro_asseso = true;

  useEffect(() => {
    if (primeiro_asseso){
      onOpen();
    }
  }, [onOpen, primeiro_asseso]);



  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      // backdropBlur='2px'
    />
  );

  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (Senha !== ConfirmeSenha) {
      toast({
        title: "Erro!",
        description: "As senhas devem ser iguais!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const data = {
      password: Senha,
    };

    const ID = session?.user?.id;
    try {
      const request = await fetch(`src/app/api/reset_password/${ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (request.ok) {
        const response = await request.json();
  
        toast({
          title: "Sucesso!",
          description: "Alerta criado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Erro ao criar alerta!",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"xl"}>
        {OverlayTwo()}
        <ModalOverlay />
        <ModalContent bg={"gray.100"}>
          <ModalHeader>Atualizção de senha</ModalHeader>
          <FormControl onSubmit={handleSubmit}>
            <ModalBody >
              <Box>
              <FormLabel>Nova senha</FormLabel>
              <SenhaComponent onvalue={(e: any) => setSenha(e)} setvalue={Senha} envClick={undefined} />
              </Box>
              <Box mt={4}>
              <FormLabel>Confirmação de senha</FormLabel>
              <SenhaComponent onvalue={(e: any) => setConfirmeSenha(e)} setvalue={ConfirmeSenha} envClick={handleSubmit} />
              </Box>
             
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="green" mr={3} type="submit">
                Enviar
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};
