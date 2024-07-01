"use client";

import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    GridItem,
    Input,
    Select,
    SimpleGrid,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useState } from "react";
import { mask, unMask } from "remask";

export const DadosPessoaisComponent = () => {
    // const { data: session } = useSession ();
    // const User: any = session?.user;
    // const id = User?.id;
    const [Name, setName] = useState<string>("");
    const [Cpf, setCpf] = useState<string>("");
    const [Cnh, setCnh] = useState<string>("");
    const [Whatapp, setWhatapp] = useState<string>("");
    const [CnhFile, setCnhFile] = useState<string>("");
    const [RgFile, setRgFile] = useState<string>("");
    const [Cep, setCep] = useState<string>("");
    const [Cep2, setCep2] = useState<string>("");
    const [Rua, setRua] = useState<string>("");
    const [Bairro, setBairro] = useState<string>("");
    const [Cidade, setCidade] = useState<string>("");
    const [Complemento, setComplemento] = useState<string>("");
    const [Uf, setUf] = useState<string>("");
    const [Numero, setNumero] = useState<string>("");
    const [Email, setEmail] = useState<string>("");
    const [Genero, setGenero] = useState<string>("");
    const [Escolaridade, setEscolaridade] = useState<string>("");
    const [DataNascimento, setDataNascimento] = useState<string>("");
    const [Looad, setLooad] = useState<boolean>(false);
    const toast = useToast();
    // const router = useRouter();

    useEffect(() => {
        (async () => {
            // const res = await fetch(`/api/User/get/${id}`);
            const resp = await res.json();
console.log(resp)
            const CepMask = (data: any) => {
                const valor = data;
                const valorLinpo = unMask(valor);
                const masked = mask(valorLinpo, ["99999-999"]);
                return masked
            };

            const WhatsAppMask = (data: any) => {
                const valor = data;
                const valorLinpo = unMask(valor);
                const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
                return masked;
            };
        
            const CpfMask = (data: any) => {
                const valor = data;
                const valorLinpo = unMask(valor);
                const masked = mask(valorLinpo, ["999.999.999-99"]);
                return masked;
            };
        
            const CnhMask = (data: any) => {
                const valor = data;
                const valorLinpo = unMask(valor);
                const masked = mask(valorLinpo, ["99999999999"]);
               return masked;
            };


            setName(resp?.nome);
            setCpf(CpfMask(resp?.Cpf_number));
            setCnh(CnhMask(resp?.cnh_number));
            setWhatapp(WhatsAppMask(resp?.whatsapp));
            setCnhFile(resp?.fotos_cnh?.url);
            setRgFile(resp?.fotos_rg?.url);
            setCep(resp?.cep);
            setCep2(CepMask(resp?.cep));
            setRua(resp?.rua);
            setBairro(resp?.bairro);
            setCidade(resp?.cidade);
            setComplemento(resp?.complemento);
            setUf(resp?.estado);
            setNumero(resp?.numero);
            setEmail(resp?.email);
            setGenero(resp?.genero);
            setEscolaridade(resp?.escolaridade);
            setDataNascimento(resp?.data_nascimento);
        })();
    }, []);
    const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        setLooad(true);
        try {
            
            const data = {
                cnh_number: Cnh,
                Cpf_number: Cpf,
                nome: Name,
                whatsapp: Whatapp,
                email: Email,
                foto_rg: RgFile,
                foto_cnh: CnhFile,
                cep: Cep,
                cidade: Cidade,
                bairro: Bairro,
                complemento: Complemento,
                estado: Uf,
                numero: Numero,
                rua: Rua,
                genero: Genero,
                Escolaridade: Escolaridade,
            };
            const rest = await fetch(`/api/User/put/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await rest.json();
            console.log(response);
            setLooad(false);
        } catch (error) {
            setLooad(false);
            console.log(error);
        }
    };
    const WhatsAppMask = (e: any) => {
        const valor = e.target.value;
        const valorLinpo = unMask(valor);
        const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
        setWhatapp(masked);
    };

    const CpfMask = (e: any) => {
        const valor = e.target.value;
        const valorLinpo = unMask(valor);
        const masked = mask(valorLinpo, ["999.999.999-99"]);
        setCpf(masked);
    };

    const CnhMask = (e: any) => {
        const valor = e.target.value;
        const valorLinpo = unMask(valor);
        const masked = mask(valorLinpo, ["99999999999"]);
        setCnh(masked);
    };

    const CepMask = (e: any) => {
        const valor = e.target.value;
        const valorLinpo = unMask(valor);
        const masked = mask(valorLinpo, ["99999-999"]);
        setCep2(masked);
        setCep(valorLinpo);
    };
    const ConsultaCep = async () => {
        const res = await fetch(`https://viacep.com.br/ws/${Cep}/json/`);
        const json = await res.json();
        setRua(json.logradouro);
        setBairro(json.bairro);
        setCidade(json.localidade);
        setUf(json.uf);
    };

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                mx={2}
                borderWidth={0}
                overflowX="auto"
                flexDir={"column"}
            >
                {/* Dados pessoais */}
                <Box
                    w="70%"
                    h="100%"
                    p={10}
                    m={7}
                    bg="white"
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Text fontSize={"2xl"}> Dados Pessoais </Text>
                    <Divider borderColor={"#00713D"} pt={2} />
                    <Text fontWeight={"ligth"} fontSize={"sm"} pt={2}>
                        Utilizamos esses dados para entrar em contato com você
                    </Text>

                    <Stack
                        pt={4}
                        bg="white"
                        _dark={{
                            bg: "#141517",
                        }}
                        spacing={6}
                    >
                        <SimpleGrid columns={6} spacing={6}>
                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 2]}
                            >
                                <FormLabel fontSize="sm" fontWeight="md">
                                    Nome Completo
                                </FormLabel>
                                <Input
                                    type="text"
                                    value={Name}
                                    variant="flushed"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 2]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Data de Nascimento
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    value={DataNascimento}
                                    onChange={(e) =>
                                        setDataNascimento(e.target.value)
                                    }
                                    type="date"
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 2]}
                            >
                                <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Numero do CPF
                                </FormLabel>
                                <Input
                                    type="text"
                                    variant="flushed"
                                    onChange={CpfMask}
                                    value={Cpf}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 2]}
                            >
                                <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Numero da CNH
                                </FormLabel>
                                <Input
                                    type="text"
                                    variant="flushed"
                                    onChange={CnhMask}
                                    value={Cnh}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 1]}
                            >
                                <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Gênero
                                </FormLabel>
                                <Select
                                    variant="flushed"
                                    size="md"
                                    value={Genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                    placeholder="Selecione Seu Gênero"
                                >
                                    <option value="masculino">Masculino</option>
                                    <option value="feminino">Feminino</option>
                                </Select>
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Escolaridade
                                </FormLabel>
                                <Select
                                    variant="flushed"
                                    size="md"
                                    value={Escolaridade}
                                    onChange={(e) =>
                                        setEscolaridade(e.target.value)
                                    }
                                    placeholder="Selecione Sua Escolaridade"
                                >
                                    <option value="Ensino Fundamental Incompleto">
                                        Ensino Fundamental Incompleto
                                    </option>
                                    <option value="Ensino Fundamental Completo">
                                        Ensino Fundamental Completo
                                    </option>
                                    <option value="Ensino Médio incompleto">
                                        Ensino Médio incompleto
                                    </option>
                                    <option value="Ensino Médio Completo">
                                        Ensino Médio Completo
                                    </option>
                                    <option value="Ensino Superior Incompleto">
                                        Ensino Superior Incompleto
                                    </option>
                                    <option value="Ensino Superior Completo">
                                        Ensino Superior Completo
                                    </option>
                                </Select>
                            </FormControl>

                            <FormControl as={GridItem} colSpan={[6, 3]}>
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    CNH
                                </FormLabel>
                                <Input
                                    type="File"
                                    variant="flushed"
                                    value={CnhFile}
                                    onChange={(e) => setCnhFile(e.target.value)}
                                ></Input>
                            </FormControl>
                            <FormControl as={GridItem} colSpan={[6, 3]}>
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    RG
                                </FormLabel>
                                <Input
                                    type="File"
                                    variant="flushed"
                                    value={RgFile}
                                    onChange={(e) => setRgFile(e.target.value)}
                                ></Input>
                            </FormControl>
                        </SimpleGrid>
                    </Stack>
                </Box>
                {/* Fim dados Pessoais */}

                {/* Inicio Dados de contato */}
                <Box
                    w="70%"
                    h="100%"
                    p={10}
                    bg="white"
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Text fontSize={"2xl"}> Dados de contato </Text>
                    <Divider borderColor={"#00713D"} pt={2} />

                    <Stack pt={10}>
                        <SimpleGrid columns={6} spacing={6}>
                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    CEP
                                </FormLabel>
                                <Input
                                    type="text"
                                    variant="flushed"
                                    onChange={CepMask}
                                    value={Cep2}
                                    onBlur={ConsultaCep}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Endereço
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Rua}
                                    disabled
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Cidade
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Cidade}
                                    disabled
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Estado
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Uf}
                                    disabled
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Bairro
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Bairro}
                                    disabled
                                />
                            </FormControl>
                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 1]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Número
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Numero}
                                    onChange={(e) => setNumero(e.target.value)}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 2]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Complemento
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="text"
                                    value={Complemento}
                                    onChange={(e) =>
                                        setComplemento(e.target.value)
                                    }
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Telefone Celular
                                </FormLabel>
                                <Input
                                    type="text"
                                    variant="flushed"
                                    onChange={WhatsAppMask}
                                    value={Whatapp}
                                />
                            </FormControl>

                            <FormControl
                                isRequired
                                as={GridItem}
                                colSpan={[6, 3]}
                            >
                                <FormLabel
                                    htmlFor="email_address"
                                    fontSize="sm"
                                    fontWeight="md"
                                    color="gray.700"
                                    _dark={{
                                        color: "gray.50",
                                    }}
                                >
                                    Email
                                </FormLabel>
                                <Input
                                    variant="flushed"
                                    type="email"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </SimpleGrid>
                    </Stack>
                    <Button
                        onClick={handleSubmit}
                        inlineSize={"30%"}
                        colorScheme={"green"}
                        size={"md"}
                        isLoading={Looad}
                    >
                        Salvar e Enviar
                    </Button>
                </Box>
                {/* Fim dados de contato */}
            </Flex>
        </>
    );
};
