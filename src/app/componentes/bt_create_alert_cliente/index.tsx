"use client";

import {
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
import { createContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface BtCreateAlertClienteProps {
  DataSolicitacao: solictacao.SolicitacaoGetType;
}

interface AlertType {
  id: number;
  titulo: string;
  texto: string;
  tipo: string;
  corretor: number;
  empreendimento: number;
  solicitacao_id: number;
  tag: string;
}

interface AlertContextType {
  Alert: AlertType[];
  setAlert: (data: AlertType[]) => void;
}

export const AlertContext = createContext<AlertContextType>({
  Alert: [],
  setAlert: () => {},
});

export function BtCreateAlertCliente({
  DataSolicitacao,
}: BtCreateAlertClienteProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;
  const [Data, setData] = useState<any>();
  const [Update, setUpdate] = useState<any>([]);
  const [Loading, setLoading] = useState(false);
  const [Titulo, setTitulo] = useState("");
  const [Descricao, setDescricao] = useState("");
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" />
  );

  useEffect(() => {
    if (DataSolicitacao) setData(DataSolicitacao);
  }, [DataSolicitacao]);

  const HandleUpdateAlert = async () => {
    try {
      const request = await fetch(`/api/alerts/solicitacao/${Data.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (request.ok) {
        const response = await request.json();
        return response;
      }
    } catch (error) {
      console.error("Erro ao buscar alertas atualizados:", error);
    }

    return [];
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data: AlertsType.AlertsProps = {
        tipo: "CORRETOR",
        corretor: Data?.corretor.id,
        empreendimento: Data?.empreedimento.id,
        solicitacao_id: Data?.id,
        tag: "warning",
        texto: Descricao,
        titulo: `${Data?.nome?.split(" ")[0]} ${
          Data?.nome?.split(" ")[1]
        } - ${Titulo}`,
      };

      // Send a POST request to the /api/alerts/create endpoint with the data object.
      const request = await fetch(`/api/alerts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // If the request was successful, show a success toast message.
      if (request.ok) {
        toast({
          title: "Sucesso!",
          description: "Alerta criado com sucesso!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        const response = await HandleUpdateAlert();
        if (response) {
          setUpdate(response);
        }
        setLoading(false);
        onClose();
      }

      // Close the modal.
    } catch (error) {
      // If there was an error, show an error toast message.
      toast({
        title: "Erro!",
        description: "Erro ao criar alerta!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <>
      {hierarquia === "ADM" && (
        <AlertContext.Provider value={{ Alert: Update, setAlert: setUpdate }}>
          <Button
            colorScheme="yellow"
            variant="solid"
            size="md"
            onClick={onOpen}
            isLoading={Loading}
            spinner={<BeatLoader size={8} color="black" />}
          >
            CRIAR ALERTA
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
            {OverlayTwo()}
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {Data?.nome &&
                  `Criar Alerta para ${Data?.nome} vendedor ${Data?.corretor.nome}`}
              </ModalHeader>
              <ModalCloseButton />
              <FormControl>
                <ModalBody>
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
                  <Button
                    variant="ghost"
                    onClick={onClose}
                    isLoading={Loading}
                    spinner={<BeatLoader size={8} color="black" />}
                  >
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="green"
                    mr={3}
                    onClick={handleSubmit}
                    isLoading={Loading}
                    spinner={<BeatLoader size={8} color="black" />}
                  >
                    Enviar
                  </Button>
                </ModalFooter>
              </FormControl>
            </ModalContent>
          </Modal>
        </AlertContext.Provider>
      )}
    </>
  );
}
