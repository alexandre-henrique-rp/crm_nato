"use client";
import CpfMask from "@/app/componentes/cpf_mask";
import { SelectComponent } from "@/app/componentes/select";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Tooltip,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckEmail from "@/app/componentes/checkEmail";
import { Whatsapp } from "@/app/componentes/whatsapp";
import { SelectCorretor } from "@/app/componentes/select_user";
import Loading from "@/app/loading";

interface relacionamentoProps {
  onvalue: any;
  ishidden: any;
}

export default function SolicitacaoForm({
  onvalue,
  ishidden
}: relacionamentoProps) {
  const [nome, setnome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cpfdois, setCpfdois] = useState("");
  const [ConstrutoraID, setConstrutoraID] = useState(0);
  const [empreendimento, setempreendimento] = useState(0);
  const [CorretorId, setCorretorId] = useState(0);
  const [email, setemail] = useState("");
  const [uploadCnh, setCnhFile] = useState<string>("");
  const [uploadRg, setRgFile] = useState<string>("");
  const [relacionamento, setrelacionamento] = useState<string>("nao");
  const [Voucher, setVoucher] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [teldois, SetTeldois] = useState<string>("");
  const [DataNascimento, setDataNascimento] = useState<Date | string | any>();
  const [Load, setLoad] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
 
  const handlesubmit = async () => {
    if (!nome || !cpf || !email || !relacionamento) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } else {
      const data: solictacao.SolicitacaoPost = {
        nome: nome,
        telefone: tel,
        cpf: cpf,
        telefone2: teldois,
        email: email,
        uploadRg: uploadRg,
        uploadCnh: uploadCnh,
        corretor: user?.hierarquia === "ADM" ? CorretorId : Number(user?.id),
        construtora: Number(ConstrutoraID),
        empreedimento: Number(empreendimento),
        dt_nascimento: DataNascimento,
        relacionamento: cpfdois ? [cpfdois] : [],
        rela_quest: relacionamento === "sim" ? true : false,
        voucher: Voucher
      };

      try {
        setLoad(true);
        const response = await fetch("/api/solicitacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          toast({
            title: "Sucesso",
            description: "Solicitacao enviada com sucesso",
            status: "success",
            duration: 3000,
            isClosable: true
          });
          setLoad(false);
          router.push("/home");
        }
        
      } catch (error) {
        console.log(error);
      }
     
    }
  };

  if (user?.empreendimento.length === 1 && !empreendimento) {
    setempreendimento(user.empreendimento[0].id);
  }

  if (user?.construtora.length === 1 && !ConstrutoraID) {
    setConstrutoraID(user.construtora[0].id);
  }

  // Função para converter arquivo em base64
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
      } catch (error) {}
    }
  };

  // Função chamada quando um arquivo CNH é selecionado
  const handleCnhChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("🚀 ~ file:", file)
    
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setCnhFile(base64);
      } catch (error) {}
    }
  };

  if (
    relacionamento === "sim" &&
    cpfdois.length === 11 &&
    nome &&
    cpf &&
    email &&
    tel &&
    DataNascimento
  ) {
    ishidden("sim");
    const data: solictacao.SolicitacaoPost = {
      nome: nome,
      cpf: cpf,
      telefone: tel,
      telefone2: teldois,
      dt_nascimento: DataNascimento,
      email: email,
      uploadRg: uploadRg,
      uploadCnh: uploadCnh,
      corretor: user?.hierarquia === "ADM" ? CorretorId : Number(user?.id),
      relacionamento: [cpfdois],
      cpfdois: cpfdois,
      construtora: Number(ConstrutoraID),
      empreedimento: Number(empreendimento),
      rela_quest: relacionamento === "sim" ? true : false,
      voucher: Voucher
    };
    onvalue(data);
  }

  if (relacionamento === "nao" || cpfdois.length < 11) {
    ishidden("nao");
  }

  if (Load) {
    return <Loading />;
  }

  return (
    <Stack spacing={4} p={4} maxWidth="900px" mx="auto">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <Box>
          <FormLabel>Nome Completo</FormLabel>
          <Input type="text" onChange={(e) => setnome(e.target.value)} />
        </Box>

        <Box>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            type="date"
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </Box>

        <Box>
          <FormLabel>Whatsapp com DDD</FormLabel>
          <Whatsapp setValue={tel} onValue={setTel} />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={6}
        mt={6}
        alignItems={"end"}
      >
        <Box>
          <FormLabel>Whatsapp com DDD 2</FormLabel>
          <Whatsapp setValue={teldois} onValue={SetTeldois} />
        </Box>

        <Box>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={(e) => setemail(e.target.value.replace(/\s/g, ""))}
            value={email}
          />
        </Box>
        <Box>
          <CheckEmail email={email} nome={nome} />
        </Box>
        <Box>
          <CheckEmail email={email} nome={nome} />
        </Box>
        {user?.hierarquia === "ADM" && (
          <Box>
            <FormLabel>Corretor</FormLabel>
            <SelectCorretor idcorretor={setCorretorId} />
          </Box>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>CPF</FormLabel>
          <CpfMask setvalue={cpf} onvalue={setCpf} />
        </Box>
        {user?.empreendimento && (
          <Box>
            <FormLabel>Empreendimento</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="empreendimento"
              SetValue={user.empreendimento}
              onValue={(e: any) => setempreendimento(e)}
            />
          </Box>
        )}

        {user?.construtora && (
          <Box>
            <FormLabel>Construtora</FormLabel>
            <SelectComponent
              hierarquia={user.hierarquia}
              tag="construtora"
              SetValue={user.construtora.map((item) => ({
                id: item.id,
                nome: item.razaosocial
              }))}
              onValue={(e: any) => setConstrutoraID(e)}
            />
          </Box>
        )}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={6}>
        <FormControl as={GridItem} colSpan={[6, 2]}>
          <FormLabel>CNH</FormLabel>
          <Input type="file" variant="flushed" onChange={handleRgChange} />
        </FormControl>

        <FormControl as={GridItem} colSpan={[6, 2]}>
          <FormLabel>RG</FormLabel>
          <Input type="file" variant="flushed" onChange={handleCnhChange} />
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={6}>
        <Box>
          <FormLabel>
            Relacionamento
            <Tooltip
              label="Preencha este campo caso o Contrato contenha mais de um proprietário"
              aria-label="A tooltip"
            >
              <Icon ml={2} color="black" cursor="pointer" boxSize={3} />
            </Tooltip>
          </FormLabel>
          <Select
            onChange={(e) => setrelacionamento(e.target.value)}
            value={relacionamento}
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </Select>
        </Box>

        {relacionamento === "sim" && (
          <Box>
            <FormLabel>CPF do relacionado</FormLabel>
            <CpfMask setvalue={cpfdois} onvalue={setCpfdois} />
          </Box>
        )}

        <Box>
          <FormLabel>
            Voucher
            <Tooltip
              label="Voucher para Atendimento em qualquer unidade Soluti"
              aria-label="A tooltip"
            >
              <Icon ml={1} color="black" cursor="pointer" boxSize={3} />
            </Tooltip>
          </FormLabel>
          <Input type="text" onChange={(e) => setVoucher(e.target.value)} />
        </Box>
      </SimpleGrid>

      <Button
        mt={6}
        variant="outline"
        width="100%"
        maxWidth="250px"
        height="50px"
        onClick={handlesubmit}
        hidden={relacionamento === "sim"}
      >
        CRIAR CONTA
      </Button>
    </Stack>
  );
}
