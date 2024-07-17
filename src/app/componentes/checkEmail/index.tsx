import { Button, useToast } from "@chakra-ui/react";

interface checkEmailProps {
  nome: string;
  email: string;
}

export default function CheckEmail({ nome, email }: checkEmailProps) {
  const toast = useToast();

  const sendEmail = async () => {
    if (!nome && !email) {
      toast({
        title: "Erro",
        description: "Preencha os campos Nome e Email",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    } else {
      const request = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
      if (!request.ok) {
        toast({
          title: "Erro",
          description: "Erro ao enviar e-mail",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right"
        });
      }
      toast({
        title: "Sucesso",
        description: "E-mail enviado com sucesso",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  return (
    <>
      <Button colorScheme={"green"} onClick={sendEmail}>
        Confirmar Email
      </Button>
    </>
  );
}