  'use client'

import { useSession } from "next-auth/react";
import Loading from "../loading";
import { Box } from "@chakra-ui/react";

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <><Loading /></>
  return (
    <Box bg={"#f3f3f3"}>
      {user && children}
    </Box>
  )
}