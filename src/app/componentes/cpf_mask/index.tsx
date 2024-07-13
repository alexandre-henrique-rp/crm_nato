import { Box, Input, useToast } from "@chakra-ui/react";
import { resolve } from "path";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

interface CpfMaskProps {
  setvalue: string;
  onvalue: any;
  desativado?: boolean;
}

const CpfMask: React.FC<CpfMaskProps> = ({
  setvalue,
  onvalue,
  desativado = false
}) => {
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [Disablee, setDesativado] = useState(false);
  const toast = useToast(); // Hook para exibir toasts do Chakra UI

  useEffect(() => {
    setDesativado(desativado); // Define o estado de desativado
    handleMask(setvalue); // Atualiza a máscara quando o valor do CPF muda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setvalue, desativado]);

  const handleMask = (data: any) => {
    const valor = data;
    const valorLimpo = unMask(valor); // Remove a máscara para obter apenas os dígitos
    const masked = mask(valorLimpo, ["999.999.999-99"]); // Aplica a máscara de CPF
    setValue(masked); // Atualiza o valor exibido no input
    if (valorLimpo.length === 11) {
      // Validação do CPF
      Promise.resolve(setTimeout(() => resolve, 1000));
      const isValid = validaCPF(valorLimpo);
      setIsInvalid(valor !== "" && !isValid); // Define como inválido se estiver preenchido e for inválido
      // Exibe toast apenas quando o CPF estiver preenchido totalmente e for válido
      if (isValid) {
        // Passa o valor e a validade para o componente pai
        onvalue(valorLimpo);
        toast({
          title: "CPF válido!",
          status: "success",
          duration: 2000,
          isClosable: true
        });
      } else if (!isValid) {
        toast({
          title: "CPF inválido!",
          status: "error",
          duration: 2000,
          isClosable: true
        });
      }
    }
    if (valorLimpo.length < 11) {
      onvalue(valorLimpo);
    }
  };

  const validaCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

    if (cpf.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  };

  return (
    <Box w="Full">
      <Input
        disabled={Disablee}
        type="text"
        border={"1px solid #b8b8b8cc"}
        onChange={(e) => handleMask(e.target.value)}
        value={value}
        borderColor={isInvalid ? "crimson" : undefined}
        placeholder="Digite o CPF"
      />
    </Box>
  );
};

export default CpfMask;
