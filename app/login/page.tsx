import Image from "next/image";
import Link from "next/link";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import offingLogo from "@/app/assets/logos/offing.svg";
import KakaoLogin from "@/components/login/KakaoLogin";
import TwitterLogin from "@/components/login/TwitterLogin";
import GoogleLogin from "@/components/login/GoogleLogin";
import DiscordLogin from "@/components/login/DiscordLogin";
import NaverLogin from "@/components/login/NaverLogin";
import loginBg from "@/public/LoginBackground.png";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if(session) redirect(`${session.user.id}`);

  return (
    <div className="flex flex-row sm:h-full h-[812px] font-sans">
      <div className="md:block hidden grow-0 w-[514px]">
        <Image
          className="w-full h-full"
          src={loginBg}
          alt=""
          loading="eager"
          priority
        />
      </div>
      <div className="grow sm:py-[100px] pt-[60px] pb-[50px] flex flex-col items-center">
        <Link href="/" className="w-[106px] h-[30px]">
          <Image
            className="w-[106px] h-[30px]"
            src={moopiLogo}
            alt=""
            loading="eager"
          />
        </Link>
        <div className="sm:h-[95px] h-[40px]" />
        <p className="font-semibold text-xl">moopi에 오신 것을 환영합니다</p>
        <div className="sm:h-[60px] h-[80px]" />
        <div className="space-y-[18px] text-sm text-white">
          <KakaoLogin />
          <TwitterLogin />
          <GoogleLogin />
          <DiscordLogin />
          <NaverLogin />
        </div>
        <div className="sm:h-[57px] h-[60px]" />
        <div className="w-[300px] text-sm text-center leading-[30px]">
          계속 진행하면 moopi{" "}
          <span className="underline underline-offset-2 cursor-pointer">
            서비스 약관
          </span>
          에 동의하고
          <span className="underline underline-offset-2 cursor-pointer">
            개인정보 보호정책
          </span>
          을 읽었음을 인정하는 것으로 간주됩니다.
        </div>
        <div className="sm:h-[279px] h-[83px]" />
        <div className="flex flex-col items-center space-x-[8px] text-base">
          <p className="font-semibold">From</p>
          <Image
            className="w-[106px] h-[30px] m-[10px]"
            src={offingLogo}
            alt=""
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
