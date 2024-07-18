"use client";

import { Box, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface FiltroDataProps {
  onData: Date | string | any;
  setBlank: any;
}
export const DateFilter = ({ onData, setBlank }: FiltroDataProps) => {
  const [Date, setDate] = useState<string>("");

  useEffect(() => {
    if (setBlank === true && Date) {
      setDate("");
    }
    onData(Date);
  }, [Date, onData, setBlank]);

  return (
    <Flex w={"full"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box h={"100%"} bg={"#F8F8F8"}>
        <Input
          textColor={"#00713D"}
          _hover={{ borderColor: "#00613C" }}
          borderColor={"#00713D"}
          placeholder="Data Inicial"
          size="md"
          type="date"
          value={Date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </Box>
    </Flex>
  );
};
