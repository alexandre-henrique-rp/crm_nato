"use client";

import { Box, Flex, Text } from "@chakra-ui/react";

interface TextProps {
  SetValue: string;
  SetName: string;
}

export default function TextHome({ SetValue, SetName }: TextProps) {
  return (
    <Flex>
      <Text textColor={"#00713D"} p={"10px"} fontWeight={"bold"}>
        {SetName}:
      </Text>
      <Text p={"10px"}>{SetValue}</Text>
    </Flex>
  );
}
