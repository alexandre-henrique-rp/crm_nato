import { Box, Flex } from "@chakra-ui/react";


interface CardRootProps {
  children: React.ReactNode;
}
export function CardRoot({ children }: CardRootProps) {
  return (
    <>
      <Flex
        w={"100%"}
        alignItems="center"
        flexDir="column"
        minH="100vh"
        p={4} 
      >
        <Box
          w={{ base: "95%", md: "65%" }}
          p={6} 
          bg="white"
          borderRadius={8}
          boxShadow="lg"
          mb={12}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
}
