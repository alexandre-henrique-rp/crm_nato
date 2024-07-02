"use client";

import { Box, effect, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { mask, unMask } from "remask";

interface CpfMaskProps {
  setvalue: string;
  onvalue: any;
}

export default function CpfMask({ setvalue, onvalue }: CpfMaskProps) {
  const [value, setValue] = useState("");
  useEffect(() => {
    CpfMask(setvalue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setvalue]);

  const CpfMask = (data: any) => {
    const valor = data;
    const valorLimpo = unMask(valor);
    const masked = mask(valorLimpo, ["999.999.999-99"]);
    onvalue(valorLimpo);
    setValue(masked);
    return masked;
  };

  return (
    <Box w="Full">
      <FormLabel>CPF</FormLabel>
      <Input
        type="text"
        onChange={(e) => CpfMask(e.target.value)}
        value={value}
      />
    </Box>
  );
}
