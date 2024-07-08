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
import { Interface } from "readline";


interface ModallPropsFormuulario {
  rota: any;
  empreedimento?: number;
  clienteId?: number;
}


export const ModalFormComponent = ({ rota, empreedimento, clienteId }: ModallPropsFormuulario ) => {
  const [Titulo, setTitulo] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [IdEmpreedimento, setIdEmpreedimento] = useState<number>(0);
 const [StatusAlert, setStatusAlert] = useState("");
 const [Empreedimeto, setEmpreedimeto] = useState([]);
 const toast = useToast();
  const { data: session } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
     if(rota === "geral") {
       const request = await fetch("/api/empreendimento/getall");
       if (request.ok) {
         const response = await request.json();
         setEmpreedimeto(response);
       }
     }
    })();
  }, [rota]);



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

    const data: AlertsType.AlertsProps = rota === "geral" ? {
      tipo: rota,
      empreendimento: IdEmpreedimento,
      tag: "info",
      texto: Descricao,
      titulo: Titulo,
    }
    : {
      tipo: "CORRETOR",
      corretor: session?.user?.id,
      empreendimento: empreedimento,
      solicitacao_id: clienteId,
      tag: StatusAlert,
      texto: Descricao,
      titulo: Titulo,
    };

    try {
      const request = await fetch(`/api/alerts/cerate`, {
        method: "POST",
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
      <Box
        w={"100%"}
        h={"100%"}
        borderRadius={"15px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Button
          bg={"#00713D"}
          textColor={"white"}
          variant="solid"
          _hover={{ bg: "#00631B" }}
          size="lg"
          onClick={onOpen}
        >
          Criar Alerta
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
        {OverlayTwo()}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Formulário de Acesso</ModalHeader>
          <ModalCloseButton />
          <FormControl onSubmit={handleSubmit}>
            <ModalBody>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={StatusAlert}
                onChange={(e) => setStatusAlert(e.target.value)}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="loading">Loading</option>
              </Select>

              <FormControl id="title" isRequired mt={4}>
                <FormLabel>Título</FormLabel>
                <Input
                  value={Titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Digite o título"
                />
              </FormControl>

              <FormControl id="text" isRequired mt={4}>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  value={Descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Digite o texto"
                />
              </FormControl>

            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
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
