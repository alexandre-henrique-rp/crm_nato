"use client";
import { Input, InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

// Definindo o tipo para SetValue, ajuste conforme necessário para o tipo correto da sua aplicação
interface InputTel1Props extends InputProps {
  SetValue: solictacao.SolicitacaoGetType;
}

export const InputTel2 = ({ SetValue, ...props }: InputTel1Props) => {
  const [tel1, setTel1] = useState<string>("");

  useEffect(() => {
    if (SetValue && SetValue.telefone2) {
      setTel1(SetValue.telefone2); // Atribuindo o valor inicial do telefone
    }
  }, [SetValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      setTel1(e.target.value);
    }
  };

  return (
    <InputMask
      mask="(99) 9 9999-9999"
      maskChar={null}
      value={tel1}
      onChange={handleChange}
    >
      <Input
        type="tel"
        placeholder="(__) _____-____"
        name="telefone2"
        variant="flushed"
        {...props} // Spread dos props adicionais do Chakra UI
      />
    </InputMask>
  );
};
