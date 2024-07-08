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
} from "@chakra-ui/react";
import { useState } from "react";
import { Interface } from "readline";


interface ModallPropsFormuulario {
  rota: any

}


export const ModalFormComponent = ({ rota }: ModallPropsFormuulario ) => {
  const [formData, setFormData] = useState({
    status: "",
    title: "",
    text: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alerts, setAlerts] = useState([]);

  const [showButton, setShowButton] = useState(false);
  if (alerts.length === 0) {
    (async () => {
      const request = await fetch("/api/alerts/geral");
      if (request.ok) {
        const response = await request.json();
        setShowButton(true);
        setAlerts(response);
      }
    })();
  }




  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      // backdropBlur='2px'
    />
  );
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = {
      status: formData.status,
      title: formData.title,
      text: formData.text,
      tipo: rota 
    };

    // Lógica para enviar os dados do formulário
    console.log(formData);
    onClose();
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
                value={formData.status}
                onChange={handleChange}
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
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Digite o título"
                />
              </FormControl>

              <FormControl id="text" isRequired mt={4}>
                <FormLabel>Texto</FormLabel>
                <Textarea
                  name="text"
                  value={formData.text}
                  onChange={handleChange}
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
