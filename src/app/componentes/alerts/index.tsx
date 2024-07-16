import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle
} from "@chakra-ui/react";

interface AlertProps {
  msg: string;
  titulo: string;
  status: any;
}

export const AlertComponent = ({ msg, titulo, status }: AlertProps) => {
  return (
    <>
      {status && (
        <>
          <Alert status={status} variant="subtle" w={"full"} gap={"1rem"}>
            <AlertIcon boxSize="2rem" />
            <AlertTitle fontSize="lg">{titulo}</AlertTitle>
            <AlertDescription maxWidth="sm">{msg}</AlertDescription>
          </Alert>
        </>
      )}
    </>
  );
};
