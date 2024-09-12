'use client';
import { chakra } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

type CardFormProps = PropsWithChildren<Omit<HTMLFormProps, 'action'> & {action: (formData: FormData) => Promise<any>}>;


export function CardFormComponent(props: CardFormProps) {
    return (
        <>
           <chakra.form{...props} />
        </>
    );
}