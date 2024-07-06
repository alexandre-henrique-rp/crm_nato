"use client";

import CpfMask from "@/app/componentes/cpf_mask";
import { SelectComponent } from "@/app/componentes/select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { mask, unMask } from "remask";

interface RelacionadoProps {
  SetValue: any;
}

export default function RelacionadoForm({ SetValue }: RelacionadoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [cpfdoismask, setCpfdoismask] = useState("");
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [email, setemail] = useState("");
  const [uploadCnh, setCnhFile] = useState<string>("");
  const [uploadRg, setRgFile] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [Whatapp, setWhatapp] = useState<string>("");
  const [Whatappdois, setWhatappdois] = useState<string>("");
  // const [base64String, setBase64String] = useState("");
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  console.log(empreendimento);

  useEffect(() => {
    (() => {
      const cpf = SetValue.cpfdois;
      const masked = mask(cpf, ["999.999.999-99"]);
      setCpfdoismask(masked);
      setCpfdois(cpf);
    })();
  }, [SetValue.cpfdois]);
  console.log("teste", SetValue.cpfdois);

  const handlesubmit = () => {
    if (!nome || !cpf || !email) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const dados = {
        nome: nome,
        whatsapp: Whatapp,
        cpf: cpf,
        tel: tel,
        email: email,
        foto_rg: uploadRg,
        foto_cnh: uploadCnh,
        construtora: Number(ConstrutoraID),
        empreendimento: Number(empreendimento),
        token: session?.token,
      };

      const data = [dados, SetValue];
      data.map(async (item: any) => {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Solicitações enviadas com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          router.push("/home");
        }
      });
    }
  };

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setTel(valorLinpo);
    setWhatapp(masked);
  };

  const WhatsAppMask2 = (e: any) => {
    const valor = e.target.value;
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    SetTeldois(valorLinpo);
    setWhatappdois(masked);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          const result = reader.result as string;
          const base64String = result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("O resultado do FileReader é null ou undefined"));
        }
      };

      reader.onerror = () => {
        reject(new Error("Erro ao ler o arquivo"));
      };

      reader.readAsDataURL(file);
    });
  };

  // Função chamada quando um arquivo RG é selecionado
  const handleRgChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setRgFile(base64);
      } catch (error) {
        console.error("Erro ao processar o arquivo RG:", error);
      }
    }
  };

  // Função chamada quando um arquivo CNH é selecionado
  const handleCnhChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setCnhFile(base64);
      } catch (error) {
        console.error("Erro ao processar o arquivo CNH:", error);
      }
    }
  };

  return (
    <>
      <Box display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>nome Completo</FormLabel>
          <Input type="text" onChange={(e: any) => setnome(e.target.value)} />
        </Box>

        <Box w="33%">
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Input type="text" onChange={WhatsAppMask} value={Whatapp} />
        </Box>
        <Box w="33%">
          <FormLabel> Whatsapp com DDD 2</FormLabel>
          <Input type="text" onChange={WhatsAppMask2} value={Whatappdois} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="33%">
          <FormLabel>CPF </FormLabel>
          <CpfMask desativado setvalue={cpfdois} onvalue={setCpf} />
        </Box>
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <Box w="48%">
          <FormLabel>email</FormLabel>
          <Input type="text" onChange={(e: any) => setemail(e.target.value)} />
        </Box>

        {user?.empreendimento && (
          <Box w="48%">
            <FormLabel>Empreendimento</FormLabel>
            <SelectComponent
              SetValue={user.empreendimento}
              onValue={(e: any) => setempreendimento(e)}
            />
          </Box>
        )}

        {user?.construtora && (
          <Box w="48%">
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              SetValue={user.construtora.map((item: any) => {
                return { id: item.id, nome: item.razaosocial };
              })}
              onValue={(e: any) => setConstrutoraID(e)}
            />
          </Box>
        )}
      </Box>

      <Box mt={6} display={"Flex"} justifyContent={"space-between"} w={"full"}>
        <FormControl as={GridItem} colSpan={[6, 2]}>
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
            onChange={(e) => handleRgChange(e)}
          ></Input>
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 2]}>
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
            onChange={(e) => handleCnhChange(e)}
          ></Input>
        </FormControl>
      </Box>

      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        maxWidth="100%"
        textColor={"Black"}
        onClick={handlesubmit}
      >
        CRIAR CONTA
      </Button>
    </>
  );
}
