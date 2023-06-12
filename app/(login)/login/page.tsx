'use client'
import { useSearchParams } from 'next/navigation';

import { signIn, signOut, useSession } from 'next-auth/react'

import Image from "next/image";

import moopiLogo from "@/app/assets/logos/moopi.svg";
import googleLogo from "@/app/assets/logos/google.svg";
import twitterLogo from "@/app/assets/logos/twitter.svg";
import discordLogo from "@/app/assets/logos/discord.svg";
import kakaoLogo from "@/app/assets/logos/kakao.svg";
import naverLogo from "@/app/assets/logos/naver.svg";
import offingLogo from "@/app/assets/logos/offing text blue.svg";


export default function LoginPage() {
    const searchParams = useSearchParams()
    const callbackUrl = ("/login/verifying?callbackUrl=" + (searchParams.get('callbackUrl') ?? "/")) as string

    const {data: session, status} = useSession();
    console.log("session", session);

    return (
        <div className="flex flex-row sm:h-full h-[812px] font-sans">
            <div className="md:grow bg-login bg-no-repeat bg-cover"></div>
            <div className="md:grow-0 grow w-[470px] sm:py-[100px] pt-[60px] pb-[50px] flex flex-col items-center">
                <Image className="w-[106px] h-[30px]" src={moopiLogo} alt=""/>
                <div className="sm:h-[95px] h-[40px]" />
                <p className="font-semibold text-xl" onClick={() => signOut()}>moopi에 오신 것을 환영합니다</p>
                <div className="sm:h-[60px] h-[80px]" />
                <div className="space-y-[18px] text-sm text-white">
                    <div className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#FEE500] cursor-pointer" onClick={() => signIn('kakao', {callbackUrl})}>
                        <Image className="w-[22px] h-[22px] ml-[21px] absolute left-0" src={kakaoLogo} alt=""/>
                        <p className="text-black">Start with Kakao</p>
                    </div>
                    <div className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#00ACEE] cursor-pointer" onClick={() => signIn('twitter', {callbackUrl})}>
                        <Image className="w-[22px] h-[22px] ml-[21px] absolute left-0" src={twitterLogo} alt=""/>
                        <p>Start with Twitter</p>
                    </div>
                    <div className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-white border-[1px] border-s2xyoon-gray cursor-pointer" onClick={() => signIn('google', {callbackUrl})}>
                        <Image className="w-[23px] h-[23px] ml-[19px] absolute left-0" src={googleLogo} alt=""/>

                        <p className="text-black">Start with Google</p>
                    </div>
                    <div className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#5865F2] cursor-pointer" onClick={() => signIn('discord', {callbackUrl})}>
                        <Image className="w-[24px] h-[24px] ml-[20px] absolute left-0" src={discordLogo} alt=""/>
                        <p>Start with Discord</p>
                    </div>
                    <div className="w-[320px] h-[40px] rounded-[5px] relative flex flex-row justify-center items-center bg-[#03C75A] cursor-pointer" onClick={() => signIn('naver', {callbackUrl})}>
                        <Image className="w-[19px] h-[19px] ml-[22px] absolute left-0" src={naverLogo} alt=""/>

                        <p>Start with Naver</p>
                    </div>
                </div>
                <div className="sm:h-[57px] h-[60px]" />
                <div className="w-[300px] text-sm text-center leading-[30px]">
                    계속 진행하면 moopi <span className="underline underline-offset-2 cursor-pointer">서비스 약관</span>에 동의하고
                    <span className="underline underline-offset-2 cursor-pointer">개인정보 보호정책</span>을 읽었음을 인정하는 것으로
                    간주됩니다.
                </div>
                <div className="sm:h-[279px] h-[83px]" />
                <div className="flex flex-col items-center space-x-[8px] text-base">
                    <p className="font-semibold">From</p>
                    <Image className="w-[106px] h-[30px] m-[10px]" src={offingLogo} alt=""/>
                </div>
            </div>
        </div>
    );
}
