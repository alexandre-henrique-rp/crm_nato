import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";






export const AlertComponent = () => {
  

  return (
    <> 
    <Alert
      status="success"
      variant="subtle"
      w={"full"}
      justifyContent={"space-between"}
    >
      <AlertIcon boxSize="40px" mr={0}/>
      <AlertTitle fontSize="lg">
        Solicitação enviada com sucesso!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Aguarde pelo retorno do e-mail informado.
      </AlertDescription>
    </Alert>
    </> 
  );
}