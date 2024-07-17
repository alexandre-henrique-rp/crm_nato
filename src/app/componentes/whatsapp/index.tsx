import { chakra, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { mask, unMask } from "remask";

export const Whatsapp = () => {
  const [Tel, setTel] = useState("");
  const [IsvalideTel, setIsvalideTel] = useState(false);
  const toast = useToast();

  const WhatsAppMask = (e: any) => {
    const valor = e.target.value;
    if (valor.length === 0) {
      setIsvalideTel(false);
    }
    const valorLinpo = unMask(valor);
    const masked = mask(valorLinpo, ["(99) 9999-9999", "(99) 9 9999-9999"]);
    setTel(masked);
  };

  const checkwhatsapp = async (whatsapp: string): Promise<boolean> => {
    const request = await fetch("/api/verificador/whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        telefone: whatsapp
      })
    });

    const data = await request.json();
    if (data.status === 'INVALID_WA_NUMBER') {
      return false;
    }
    return true;
  };

  return (
    <>
      <Input
        type="text"
        value={Tel}
        onChange={WhatsAppMask}
        onBlur={async (e) => {
          const valor = unMask(e.target.value);
          if (valor.length === 11) {
            const check = await checkwhatsapp(e.target.value);
            if (!check) {
              setIsvalideTel(true);
            }else{
              setIsvalideTel(false);
            }
          }
        }}
      />
      {IsvalideTel && (
        <chakra.span color="red" fontSize={"xs"} fontWeight="bold">
          Esse telefone não tem whatsapp
        </chakra.span>
      )}
    </>
  );
};
