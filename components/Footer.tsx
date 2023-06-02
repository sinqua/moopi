"use client";

import { useSession } from "next-auth/react";

import Image from "next/image";
import moopiLogo from '../app/assets/logos/moopi.svg';


export default function Footer() {
    return (
        <div className="w-full md:h-[239px] sm:h-[276px] h-[281px] sm:py-[60px] py-[50px] px-[17px] text-[14px] bg-[#F9F9F9] border-t-[1px] border-s2xyoon-gray font-sans">
            <div className="flex sm:justify-center sm:flex-row flex-col md:h-[17px] h-auto sm:space-x-[28px] sm:space-y-0 space-y-[15px] font-semibold sm:mb-[40px] mb-[50px] flex-wrap">
                <div className='whitespace-nowrap'>Terms of service</div>
                <div className='sm:block hidden'>|</div>
                <div className='whitespace-nowrap'>Privacy policy</div>
                <div className='sm:block hidden'>|</div>
                <div className='whitespace-nowrap'>Limitation of Liability and Disclaimer</div>
                <div className='sm:block hidden'>|</div>
                <div className='whitespace-nowrap'>Customer service center</div>
            </div>
            <div className="sm:flex hidden justify-center h-[17px] space-x-[10px] mb-[25px]">
                <div>MOOPI</div>
                <div>|</div>
                <div>contract@moopi.me</div>
                <div>|</div>
                <div>TEL. 010-1234-5678</div>
                <div>|</div>
                <div>registration No. 123-45-67890</div>
            </div>
            <div className="flex justify-center h-[20px] space-x-[20px]">
                <Image src={moopiLogo} className='w-auto h-[20px]' alt='' />
                <div className='sm:flex hidden justify-center space-x-[5px]'>
                    <div>CopyRight</div>
                    <div>ⓒ</div>
                    <div className='font-NanumSquareNeoHv'>MOOPI Corp.</div>
                    <div>All Rights Reserved.</div>
                </div>
            </div>
        </div>
    );
}