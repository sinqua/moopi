import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HeaderNoSession from "@/components/HeaderNoSession";
import HeaderYesSession from "@/components/HeaderYesSession";

export default async function Layout(props: any) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      {session ? <HeaderYesSession /> : <HeaderNoSession />}
      {props.children}
    </div>
  );
}
