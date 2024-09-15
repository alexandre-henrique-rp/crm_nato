"use client";
import {
  Box,
  Button,
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

interface DropFinanceiroProps {
  value: number;
}
export default function DropFinanceiro({
  value}: DropFinanceiroProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const hierarquia = user?.hierarquia;
  const [Data, setData] = useState<any>([]);
  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        const req = await fetch("/api/financeira/getall");
        const res = await req.json();
        setData(res);
      })();
    } else {
      const data = user?.Financeira;
      setData(data);
    }
  }, []);

  return (
    <>
      {Data.length > 1 && (
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="link" colorScheme="gray" pt={3}>
                Alterar Financeira
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Alterar Financeira</PopoverHeader>
              <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
                <Select
                  size={"sm"}
                  borderRadius={"10px"}
                  placeholder="Selecione"
                  name="financeiro"
                  value={Number(value)}
                >
                  {Data.map((item: any) => (
                    <option key={item.id} value={Number(item.id)}>
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
      )}
    </>
  );
}
