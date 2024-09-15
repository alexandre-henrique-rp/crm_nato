"use client";

import { Box, Input, InputProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface InputCpfProps extends InputProps {
  setValueName: string;
}

export default function InputName({ setValueName, ...props }: InputCpfProps) {
  const [Nome, setNome] = useState<string>("");

  useEffect(() => {
    const ValorSemAcentos = setValueName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setNome(UpCase);
  }, [setValueName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const ValorSemAcentos = valor.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const removeCaracteresEspeciais = ValorSemAcentos.replace(/[^a-zA-Z\s]/g, "");
    const Linite1EspacoEntre = removeCaracteresEspeciais.replace(/\s+/g, " ");
    const RemosEspacosExtras = Linite1EspacoEntre.trim();
    const UpCase = RemosEspacosExtras.toUpperCase();
    setNome(UpCase);
    props.onChange && props.onChange(e); // Mantém o evento original se passado
  };

  return (
    <>
  <Input {...props} value={Nome} type="text" onChange={handleChange} />
    </>
);
}
