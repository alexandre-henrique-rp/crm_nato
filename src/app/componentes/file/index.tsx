"use client";

import { Box, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface VerificadorFileProps {
    onFileConverted: any;
}

export default function VerificadorFileComponent({ onFileConverted }: VerificadorFileProps) {
    const handleFileChange = (event: ChangeEvent<HTMLInputElement | any>) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            onFileConverted(reader.result, file.name);
          };
          reader.readAsDataURL(file);
        }
      };
    
      return (
        <Box>
          <Input type="file" variant="flushed" accept=".jpg, .png, .pdf" onChange={handleFileChange} />
        </Box>
      );
    }
