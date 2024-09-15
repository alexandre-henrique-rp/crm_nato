'use client';
import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../bt_create_alert_cliente"
import { AlertComponent } from "../alerts";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

interface SetDataProps {
    Id: number
    DataAlert: any
}

export default function CardListAlertCliente({Id, DataAlert}: SetDataProps) {
    const [ Data, setData ] = useState<any>([]);
    const { data: session } = useSession();
    const user = session?.user;
    const hierarquia = user?.hierarquia;

    const { Alert } = useContext(AlertContext)

      const RequesteAlert = async () => {
        const req = await fetch(
          `/api/alerts/solicitacao/${Id}`
        );
        if (req.ok) {
          const res = await req.json();
          setData(res);
        }
      };

    useEffect(() => {
        if(DataAlert.length > 0) {
            setData(DataAlert)
        }
        if (Alert.length > 0) {
            setData(Alert)
        } 
    }, [ DataAlert, Alert ]);

    const AtualizarAlert = (e: number) => {
      if (e === 1) RequesteAlert();
    };
    
    return (
      <>
        <Box
          w={{ base: "95%", md: "65%" }} // Ajuste a largura conforme necessário
          p={6} // Padding interno
          bg="white"
          borderRadius={8}
          boxShadow="2xl"
        >
          <Text fontSize={{ base: "xl", md: "2xl" }}>Alertas</Text>
          <Divider borderColor="#00713D" my={4} />
          <Stack spacing={6}>
            {Data &&
              Data.map((item: solictacao.AlertProps) => {
                const fakeStatus = true;
                return (
                  <AlertComponent
                    atualizar={AtualizarAlert}
                    key={item.id}
                    msg={item.texto}
                    titulo={item.titulo}
                    status={item.tag}
                    ID={item.id}
                    DeleteAlertStatus={
                      hierarquia === "USER" ? fakeStatus : item.status
                    }
                  />
                );
              })}
          </Stack>
        </Box>
      </>
    );
}