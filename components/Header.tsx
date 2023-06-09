"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Image from "next/image";

import moopiLogo from '@/app/assets/logos/moopi.svg'
import searchImg from '@/app/assets/images/search.svg'
import messageImg from '@/app/assets/images/message.svg'
import alertImg from '@/app/assets/images/alert.svg'
import profileImg from '@/app/assets/images/profile.svg'
import { use, useEffect, useState } from "react";

export default function Header() {
    const [callbackUrl, setCallbackUrl] = useState<string>();
    const router = useRouter();

    const {data: session, status} = useSession();

    useEffect(() => {
        setCallbackUrl(window.location.pathname + window.location.search);
    }, []);


    return (
        <div className='relative md:max-w-[1312px] w-full sm:h-[69px] h-[106px] flex justify-between sm:items-center items-start md:px-0 sm:px-[30px] px-[20px] py-[15px] bg-white font-sans font-sm'>
            <Image src={moopiLogo} className="w-auto sm:h-[40px] h-[30px]" alt="" />
            <div className='h-[30px] flex flex-row items-center sm:space-x-[30px] space-x-[20px]'>
                <div className='sm:relative absolute grow sm:w-auto w-full flex justify-end sm:top-0 bottom-[0] sm:px-0 px-[20px] left-0 md:text-right sm:text-center'>
                    <div className='flex items-center md:w-[450px] sm:w-[335px] w-full h-[40px] px-[25px] rounded-full bg-white border-solid border-[1px] border-[#CCCCCC]'>
                        <input type='text' className='grow h-full outline-none text-sm' placeholder='검색어를 입력해주세요'></input>
                        <Image src={searchImg} className='w-[20px] h-[20px] cursor-pointer' alt="" />
                    </div>
                </div>
                {status === "unauthenticated" ?
                    <div className="flex justify-center items-center w-[82px] h-[40px] bg-white text-[14px] font-semibold rounded-[11px] border-solid border-[1px] border-[#333333] cursor-pointer" onClick={() => router.push(`/login?callbackUrl=${callbackUrl}`)}>
                        로그인
                    </div> :
                    <>
                        <Image src={messageImg} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer' alt="" />
                        <Image src={alertImg} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer' alt="" />
                        <Image src={profileImg} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px] cursor-pointer' alt="" />
                    </>
                }
            </div>
        </div>
    );
}
