"use client";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

interface DropConstrutoraProps {}

export default function DropConstrutora() {
    const {data: session} = useSession();
    const user = session?.user;
    const hierarquia  = user?.hierarquia;
    const [Data, setData] = useState<any>([]);
  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        const req = await fetch("/api/construtora/getall");
        const res = await req.json();
        setData(res);
      })();
    } else {
        const construtora = user?.construtora
        console.log("🚀 ~ useEffect ~ construtora:", construtora)
      setData(construtora);
    }
  }, []);
  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button variant="link" colorScheme="gray" pt={3}>
            Alterar Construtora
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Alterar Construtora</PopoverHeader>
          <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
            <Select size={"sm"} borderRadius={"10px"} placeholder="Selecione">
              {Data.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.fantasia}
                </option>
              ))}
            </Select>
            <IconButton
              icon={<FaPlus />}
              aria-label={"substituir"}
              colorScheme={"teal"}
              size={"sm"}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
