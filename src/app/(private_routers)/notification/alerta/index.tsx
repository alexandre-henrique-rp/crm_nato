"use client";

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  Alert,
  AlertIcon,
  Stack,
  Flex,
} from "@chakra-ui/react";

export const AlertForm = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [broker, setBroker] = useState("");
  const [client, setClient] = useState("");
  const [alert, setAlert] = useState(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar a mensagem ao servidor ou processar conforme necessário
    setAlert({ type: messageType, message, userId, broker, client });
    setMessage("");
    setUserId("");
    setMessageType("info");
    setBroker("");
    setClient("");
  };
  return (
    <Flex justifyContent={"center"} alignItems={"center"} py={20}>
      <Box p={6} w={"50%"} borderRadius="lg" boxShadow="2xl">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
          Enviar Alerta
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl id="user-id" isRequired>
              <FormLabel fontWeight="bold" color="gray.600">
                ID do Usuário
              </FormLabel>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Digite o ID do usuário"
                variant="outline"
              />
            </FormControl>
            <FormControl id="broker" isRequired>
              <FormLabel fontWeight="bold" color="gray.600">
                Corretor
              </FormLabel>
              <Select
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                placeholder="Selecione o corretor"
                variant="outline"
              >
                <option value="broker1">Corretor 1</option>
                <option value="broker2">Corretor 2</option>
                <option value="broker3">Corretor 3</option>
              </Select>
            </FormControl>
            <FormControl id="client" isRequired>
              <FormLabel fontWeight="bold" color="gray.600">
                Cliente
              </FormLabel>
              <Select
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="Selecione o cliente"
                variant="outline"
              >
                <option value="client1">Cliente 1</option>
                <option value="client2">Cliente 2</option>
                <option value="client3">Cliente 3</option>
              </Select>
            </FormControl>
            <FormControl id="message-type" isRequired>
              <FormLabel fontWeight="bold" color="gray.600">
                Tipo de Mensagem
              </FormLabel>
              <Select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                placeholder="Selecione o tipo de mensagem"
                variant="outline"
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </Select>
            </FormControl>
            <FormControl id="message" isRequired>
              <FormLabel fontWeight="bold" color="gray.600">
                Mensagem
              </FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem"
                variant="outline"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              size="lg"
              fontSize="lg"
            >
              Enviar Alerta
            </Button>
          </Stack>
        </form>
        {alert && (
          <Alert status={alert.type} mt={6} borderRadius="md">
            <AlertIcon />
            {`Usuário ID ${alert.userId} | Corretor: ${alert.broker} | Cliente: ${alert.client} | Mensagem: ${alert.message}`}
          </Alert>
        )}
      </Box>
    </Flex>
  );
};
