"use client";

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidBellRing } from "react-icons/bi";

export const ModalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alerts, setAlerts] = useState([]);

  const [showButton, setShowButton] = useState(false);

  // (async () => {
  //   const storage = localStorage.getItem("id");
  //   const request = await fetch("/api/alerts", {
  //     method: "GET",
  //   });
  //   if (request.ok) {
  //     const response = await request.json();
  //     setShowButton(true);
  //     setAlerts(response);
  //   }
  // })();

  return (
    <>
      {showButton && (
        <Button
          color={"#00713D"}
          variant="transparent-with-icon"
          boxSize={4}
          leftIcon={<BiSolidBellRing />}
          onClick={onOpen}
        ></Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Alertas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider borderColor={"#00713D"} pt={2} />
            <Stack pt={10} pb={10}>
              <Box>
                <Stack spacing={3}>
                  {alerts.map((alert, index) => (
                    <Alert key={index} status="error">
                      <AlertIcon />
                      {alert}
                    </Alert>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
