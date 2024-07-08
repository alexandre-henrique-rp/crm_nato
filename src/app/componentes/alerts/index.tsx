import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";


interface AlertProps {
  msg: string
  titulo: string
  // status: "success" | "error" | "info" | "warning" | "loading"
  status: any
}



export const AlertComponent = ({msg, titulo, status}: AlertProps) => {
  return (
    <> 
    {status && (
      <>
       <Alert
      status={status}
      variant="subtle"
      w={"full"}
      justifyContent={"space-between"}
    >
      <AlertIcon boxSize="40px" mr={0}/>
      <AlertTitle fontSize="lg">
        {titulo}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {msg}
      </AlertDescription>
    </Alert>
      </>
      )}
    </> 
  );
}