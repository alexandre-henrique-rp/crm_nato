"use client";

import { Box, Input, InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

export interface InputCpfProps extends InputProps {
  setValueCpf: string;
}

  /**
   * Input que aceita CPF, aplica a máscara automaticamente e retorna o valor sem máscara.
   *
   * @param setValueCpf - valor do CPF sem máscara
   * @param props - props do Input do Chakra
   *
   * @returns componente Input com a máscara de CPF
   */
export default function InputCpf({ setValueCpf, ...props }: InputCpfProps) {
  const [cpf, setCpf] = useState<string>("");

  useEffect(() => {
    const valorLimpo = unMask(setValueCpf);
    const maskCpf = mask(valorLimpo, ["999.999.999-99"]);
    setCpf(maskCpf);
  }, [setValueCpf]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const valorLimpo = unMask(valor);
    const maskCpf = mask(valorLimpo, ["999.999.999-99"]);
    setCpf(maskCpf);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
      {setValueCpf && (
        <Input {...props} value={cpf} type="text" color={"teal.500"} _hover={{color:"teal.500"}} _focus={{color:"teal.500", borderColor:"teal.500"}}/>
      )}
      {!setValueCpf && (
        <Input {...props} value={cpf} type="text" onChange={handleChange} />
      )}
      <Box hidden>
        <Input value={unMask(cpf)} type="text" name="cpf" hidden />
      </Box>
    </>
  );
}
