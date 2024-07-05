'use client';
import { Flex, Select, Text } from "@chakra-ui/react";

interface SelectProps {
  SetValue: any;
  onValue: any;
}

export const SelectComponent = ({ SetValue, onValue }: SelectProps) => {
  return (
    <Flex w={"full"} py={"0.5rem"} >
      <Select onChange={(e) => onValue(Number(e.target.value))}>
        {SetValue &&
          SetValue.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
      </Select>
    </Flex>
  );
};
