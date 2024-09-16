"use client";
import { Button, Flex } from "@chakra-ui/react";
import { DataContext } from "../imputs/inputUpdateCnh";
import { useContext, useEffect, useState } from "react";
import { DownloadDoc } from "@/app/componentes/DowloadDoc";

interface ButtonsDownloadsCnhProps {
  url?: string;
}

export function ButtonsDownloadsCnh({ url }: ButtonsDownloadsCnhProps) {
  const [UrlDownloads, setUrlDownloads] = useState<string>("");
  const [UrlBase64, setUrlBase64] = useState<string>("");

  // Use o `useContext` para acessar o valor do contexto
  const { Data } = useContext(DataContext);

  useEffect(() => {
    if (url) {
        const Verify = url.startsWith("data:");
        if (Verify) {
            setUrlBase64(url);
            return
        }else {
            setUrlDownloads(url);
        }
    }
    if (Data) setUrlDownloads(Data);
  }, [url, Data]);



  return (
    <>
      <Flex gap={3} pt={3}>
        {UrlDownloads && <Button size={"sm"} colorScheme="green"
          onClick={() => window.open(UrlDownloads, "_blank") }>
          Download file
        </Button>}
        {UrlBase64 && <DownloadDoc base64={UrlBase64}  />}
      </Flex>
    </>
  );
}
