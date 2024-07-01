import { Box, Center, CircularProgress, Flex, Heading } from '@chakra-ui/react';

export default function Loading() {
  

  return (
    <Flex w={'100%'} h={'100vh'} bg={'#00713D'} flexDir="column" justifyContent={'center'} alignItems={'center'}>
      <Box>
      <Center>
        <CircularProgress color="green.500" isIndeterminate size="250px" />
      </Center>

      <Center mt="30px">
        <Heading color="white" variant="H1">
          CARREGANDO ....
        </Heading>
      </Center>
      </Box>
    </Flex>
  );
}
