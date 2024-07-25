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
  const [IsContinue, setIsContinue] = useState(false);
  const [IsRedirect, setIsRedirect] = useState(false);
  const [IsCancel, setIsCancel] = useState(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const handleSubmit = async (e: any) => {
    const ValorCertfic = e.target.value;

    if (!ValorCertfic) {
      toast({
        title: "Erro!",
        description: "o CPF e obrigatorio!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else if (ValorCertfic.length < 11) {
      toast({
        title: "Erro!",
        description: "Falta caracteres no CPF!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      try {
        const request = await fetch(`/api/consulta/cpf/${ValorCertfic}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (request.ok) {
          const response = await request.json();
          console.log(response);
          // onClose();
        }
      } catch (error) {
        toast({
          title: "Erro!",
          description: "Erro ao criar alerta!",
          status: "error",
          duration: 3000,
          isClosable: true
        });
      }
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
                  onBlur={(e) => {
                    const valor = e.target.value;
                    const valorLinpo = unMask(valor);
                    const masked = mask(valorLinpo, "999.999.999-99");
                    const cpfNumber = unMask(masked);
                    handleSubmit(cpfNumber);
                  }}
                />
              </Box>
            </ModalBody>
            <Divider />
            <ModalFooter>
              {IsContinue && (
                <Button colorScheme="whatsapp" onClick={onClose}>
                  Continuar cadatro
                </Button>
              )}
              {IsRedirect && (
                <Button colorScheme="whatsapp" onClick={onClose}>
                  Redirecionar
                </Button>
              )}
              {IsCancel && (
                <Button colorScheme="whatsapp" onClick={onClose}>
                  Cancelar
                </Button>
              )}
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </>
  );
};
