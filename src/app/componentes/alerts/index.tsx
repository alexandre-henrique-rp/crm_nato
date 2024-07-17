'use client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  IconButton,
  useToast
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoIosWarning } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

interface AlertProps {
  msg: string;
  titulo: string;
  status: any;
  ID?: number;
  DeleteAlertStatus?: boolean | null;
}

export const AlertComponent = ({ msg, titulo, status, ID, DeleteAlertStatus }: AlertProps) => {
  const toast = useToast();
  const route = useRouter();

  const DeleteAlert = async () => {
    const request = await fetch(`/api/alerts/delete/${ID}`, {
      method: "DELETE",
    });
    if (request.ok) {
      const response = await request.json();
      toast({
        title: response.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      route.refresh();
    }
  };
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
            <Flex gap={"0.4rem"}>
              {!DeleteAlertStatus && <Icon as={IoIosWarning} color={"yellow.500"}  fontSize={"1.5rem"} />}
              <AlertIcon boxSize="1.3rem" />
              <AlertTitle fontSize="md">{titulo.toUpperCase()}</AlertTitle>
              <AlertDescription fontSize="sm">{msg}</AlertDescription>
            </Flex>

           { DeleteAlertStatus && <IconButton
              colorScheme="red"
              variant={"ghost"}
              fontSize={"2rem"}
              _hover={{ color: "white", bg: "red.500" }}
              aria-label="Delete Alerta"
              icon={<IoCloseCircleOutline />}
              onClick={DeleteAlert}
            />}
          </Alert>
        </>
      )}
    </>
  );
};
