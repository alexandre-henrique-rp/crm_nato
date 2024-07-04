"use client";

import { ButtonGroup, Flex, IconButton } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";

export const BotoesFunction = () => {
  return (
    <Flex w={"100%"} justifyContent={"start"} alignItems={"center"} gap={"5px"}>
      <ButtonGroup variant="solid" size="sm" spacing={3}>
        <IconButton
          colorScheme="blue"
          icon={<BsBoxArrowUpRight />}
          aria-label="Up"
        />
        <IconButton
          colorScheme="green"
          icon={<AiFillEdit />}
          aria-label="Edit"
        />
        <IconButton
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
          aria-label="Delete"
        />
      </ButtonGroup>
    </Flex>
  );
};
