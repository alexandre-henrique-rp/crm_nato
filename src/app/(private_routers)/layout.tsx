  'use client'

import { useSession } from "next-auth/react";
import Loading from "../loading";

export default function Layout({
  children,
}: {
  children: React.ReactNode,
}) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <><Loading /></>
  return (
    <>
      {user && children}
    </>
  )
}