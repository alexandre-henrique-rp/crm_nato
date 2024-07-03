"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const logado = localStorage.getItem("user");

    if (logado) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
