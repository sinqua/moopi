import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import HeaderBeforeLogin from "@/components/basic-layout/HeaderBeforeLogin";
import HeaderAfterLogin from "@/components/basic-layout/HeaderAfterLogin";

export default async function Layout(props: any) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex flex-col items-center h-auto min-h-full">
      {session ? <HeaderAfterLogin /> : <HeaderBeforeLogin />}
      <div className="relative flex flex-col items-center w-full grow sm:mt-0 mt-[20px]">
        {props.children}
      </div>
    </div>
  );
}
