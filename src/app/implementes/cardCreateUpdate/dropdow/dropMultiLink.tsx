"use client";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface DropConstrutoraProps {
  value?: any;
}

export default function DropMultiLink({ value }: DropConstrutoraProps) {
  const [Data, setData] = useState<string>("");
  useEffect(() => {
    if (value) {
      const ValueMap = value.map((item: any) => item).join(", ");
      setData(ValueMap);
    }
  }, [value]);

  return (
    <>
      <Box>
        <Popover>
          <PopoverTrigger>
            <Button variant="link" colorScheme="gray" pt={3}>
              Links
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Lista de Links para Assinatura</PopoverHeader>
            <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
              <Textarea
                placeholder="Para adicionar mais de um link use , para separa-los ex: https://teste.com, https://teste.com.br"
                resize={"none"}
                name="links"
                value={Data}
                onChange={(e) => setData(e.target.value)}
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
}
