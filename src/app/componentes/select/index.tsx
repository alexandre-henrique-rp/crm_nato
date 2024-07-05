import { Flex, Select, Text } from "@chakra-ui/react";

interface DelectProps {
  SetValue: any;
  SetName: string;
}

export const SelectComponent = ({ SetValue, SetName }: DelectProps) => {
  return (
    <Flex alignItems={"center"} w={"full"} gap={"0.6rem"} py={"0.5rem"}>
      <Text textColor={"#00713D"} fontWeight={"bold"}>
        {SetName}:
      </Text>
      <Select>
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
