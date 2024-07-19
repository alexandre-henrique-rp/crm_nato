"use client";

import { Box, Input } from "@chakra-ui/react";





export default function VerificadorFileComponent() {
    return (
        <Box>
            <Input type="file" variant="flushed" accept=".jpg, .png, .pdf"/>        </Box>
    );
}