"use client";

import { Input, InputProps, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent } from "react";

interface InputUpdateCnhProps extends InputProps {
  onFileUploaded: (data: any) => string;
}

export default function InputUpdateCnh({
  onFileUploaded,
  ...props
}: InputUpdateCnhProps) {
  const toast = useToast();
  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement | any>
  ) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await axios
        .post(`/api/doc/post`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          onFileUploaded(response.data.data);
          toast({
            title: "Arquivo salvo",
            description: response.data.message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log(error);
          toast({
            title: "Erro ao salvar arquivo",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <>
      <Input
        {...props}
        type="file"
        variant="flushed"
        accept=".jpg, .png, .pdf"
        onChange={handleFileChange}
      />
    </>
  );
}
