import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Rotepage() {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/login");
  }
  if (session) {
    redirect("/home");
  }
  return <>root</>;
}
