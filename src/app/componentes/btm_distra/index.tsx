import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";

interface BotoesFunctionProps {
  id: number;
  distrato: boolean;
  exclude?: boolean;
}

export default function BtmDistrato({ id, distrato, exclude }: BotoesFunctionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const HandleDelet = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/solicitacao/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distrato: true,
          
        }),
      });

      if (res.ok) {
        toast({
          title: "Distrato Efetuado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: JSON.stringify(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };
  return (
    <>
      <Tooltip label="Distrato">
        <Box
          p={"0.2rem"}
          border={"1px solid gray"}
          borderRadius={"6px"}
          cursor={"pointer"}
          onClick={onOpen}
          _hover={{ bg: "gray.300" }}
          hidden={distrato || exclude}
        >
          <Image src="/rasgado.png" alt="distrato" boxSize={"1.5rem"} />
        </Box>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalBody p={10}>
            <Text fontWeight={"bold"} fontSize={"20px"} textAlign={"center"}>
              Você tem certeza de que deseja efetuar o distrato com esse
              cliente?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Flex gap={3}>
              <Button leftIcon={<IoIosArrowBack />} onClick={onClose}>
                NÃO
              </Button>

              <Button
                leftIcon={<BsFillTrashFill />}
                onClick={HandleDelet}
                colorScheme="red"
              >
                SIM
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
