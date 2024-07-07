"use client";

import { Box, Flex, Input } from "@chakra-ui/react";

interface FiltroDataProps {
  onData: Date | string | any;
}
export const DateFilter = ({ onData }: FiltroDataProps) => {
  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <Box w={"full"} h={"100%"} bg={"#F8F8F8"}>
        <Input
          textColor={"#00713D"}
          _hover={{ borderColor: "#00613C" }}
          borderColor={"#00713D"}
          placeholder="Data Inicial"
          size="md"
          type="date"
          onChange={(e) => {
            onData(e.target.value);
          }}
        />
      </Box>

    </Flex>
  );
};
