'use client'

import { Box, Flex, Text } from "@chakra-ui/react"
import { VerifyEmailComponent } from "../../VerifyEmail"
import Loading from "@/app/loading"
import { useState } from "react"


export const GeralVerifyEmailProps = () => {
  const [Load, setLoad] = useState<boolean>(false);

  const detectLoad = (e: any) => {
    if (e ==1) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  };

  if (Load) {
    return (
      <>
        <Loading />
      </>
    );
  }
  
  return (
    <>
     {/* Verde */}
     <Flex
        w={"100vw"}
        h={"100vh"}
        maxH={"100%"}
        maxW={"100%"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        

        {/* Branco */}
        <Flex
          shadow={"2xl"}
          borderRadius={"15px"}
          w={"600px"}          
          p={"25px"}
          gap={"-10px"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {/* [Texto confirme seu email] */}
          <Box w={"100%"}>
            <Text
              w={"50%%"}
              fontSize={"25px"}
              textAlign={"center"}
              color="#00713D"
              alignItems={"center"}
              fontWeight={"bold"}
            >
              CONFIRME SEU EMAIL
            </Text>
          </Box>

          {/* [Texto redefina sua Senha e] */}
          <Box w={"75%"}>
            <Text
              fontSize={"14px"}
              textAlign={"center"}
              color="#00713D"
              alignItems={"center"}
              fontWeight={"bold"}
            >
              Por favor, insira seu endereço de Email CADASTRADO abaixo para
              redefinir sua senha.
            </Text>
          </Box>
          {/* Form */}
          <Box w={"75%"}>
            <VerifyEmailComponent reload={detectLoad} />
          </Box>
        </Flex>
      </Flex>
    </>
  )
}