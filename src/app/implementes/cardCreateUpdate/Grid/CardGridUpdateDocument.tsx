import {
  Box,
  BoxProps,
  Flex,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import InputUpdateCnh from "../imputs/inputUpdateCnh";
import { ButtonsDownloadsCnh } from "../butons/butonsDowloadsCnh";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth_confg";

interface CardGridUpdateCnhProps extends BoxProps {
  Url: string;
  tag: string;
}

export default async function CardGridUpdateDocument({
  Url,
  tag,
  ...props
}: CardGridUpdateCnhProps) {
  const session = await getServerSession(auth);
  const user = session?.user;
  const Hierarquia = user?.hierarquia;
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md">
          {tag}
        </FormLabel>
        {Url && (
          <Flex>
            <Text pt={3}>
              {tag} ja esta adicionado
            </Text>
          </Flex>
        )}
        <InputUpdateCnh  Url={Url} tag={tag}/>
        {Hierarquia !== "USER" && <ButtonsDownloadsCnh url={Url} />}
      </Box>
    </>
  );
}
