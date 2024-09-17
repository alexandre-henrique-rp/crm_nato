'use client'
import { InputCpfContext } from "@/app/implementes/cardCreateUpdate/imputs/inputCpf";
import { InputNameContext } from "@/app/implementes/cardCreateUpdate/imputs/inputName";
import { Button } from "@chakra-ui/react";
import { useContext } from "react";




export function BtnSaveUser() {
     const { NameContex } = useContext(InputNameContext);
     const { CpfContex } = useContext(InputCpfContext);

    return (
        <>
            <Button
                mt={4}
                colorScheme="green"
                type="submit"
            >
                Salvar
            </Button>
        </>
    );
}