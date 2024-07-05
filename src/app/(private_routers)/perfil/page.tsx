"use client";

import {
    Box,
    Text,
    Input,
    Flex,
    Tabs,
    TabList,
    Tab,
    Divider,
    FormControl,
    Stack,
    SimpleGrid,
    FormLabel,
    GridItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { DadosPessoaisAdmComponent, DadosPessoaisComponent } from "./components/dados-pessoais";

export default function perfilPage() {
    
    return (

    <>
        <Flex
            alignItems="center"
            justifyContent="space-evenly"
            pt={10}
            pb={10}
            borderWidth={0}
            overflowX="auto"
            flexDir={"column"}   
        >

<DadosPessoaisAdmComponent />

          
        </Flex>
    </>
    );
}
