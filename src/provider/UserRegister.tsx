"use client";
import { UserRegisterContext } from "@/context/UserRegisterContext";
import { useState } from "react";

interface UserCompraProps {
  children: React.ReactNode;
}

export default function UserRegisterProvider({ children }: UserCompraProps) {
  const [ContrutoraCX, setContrutoraCX] = useState<number[]>([]);
  const [EmpreedimentoCX, setEmpreedimentoCX] = useState<number[]>([]);

  return (
    <UserRegisterContext.Provider
      value={{
        ContrutoraCX,
        setContrutoraCX,
        EmpreedimentoCX,
        setEmpreedimentoCX,
      }}
    >
      {children}
    </UserRegisterContext.Provider>
  );
}
