import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HeaderBeforeLogin from "@/components/basic-layout/HeaderBeforeLogin";
import HeaderAfterLogin from "@/components/basic-layout/HeaderAfterLogin";
import { Suspense } from "react";

export default async function Layout(props: any) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      <Suspense>
      {session ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      </Suspense>
      <Suspense>
      {props.children}
      </Suspense>
    </div>
  );
}
