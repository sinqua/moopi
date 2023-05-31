"use client";
import Image from "next/image";

import Logo from '../app/assets/moopi.svg';
import SearchBtn from '../app/assets/images/searchBtn.png';
import Alarm from '../app/assets/images/alarm.png';
import Message from '../app/assets/images/message.png';
import Profile from '../app/assets/images/profile.png';

export default function Header() {
    return <div className='relative md:max-w-[1312px] w-full sm:h-[69px] h-[106px] flex justify-between sm:items-center items-start md:px-0 sm:px-[30px] px-[20px] py-[15px] bg-white font-sans font-sm'>

        <Image src={Logo} className="w-auto sm:h-[40px] h-[30px]" alt="" />
        <div className='sm:relative absolute grow sm:w-auto w-full flex md:justify-end justify-center sm:top-0 bottom-[0] left-0 sm:px-[20px] px-[20px] md:text-right sm:text-center'>
            <div className='flex items-center md:w-[450px] sm:w-[335px] w-full h-[40px] px-[25px] rounded-full bg-white border-solid border-[1px] border-[#CCCCCC]'>
                <input type='text' className='grow h-full outline-none text-sm' placeholder='검색어를 입력해주세요'></input>
                <Image src={SearchBtn} className='w-[20px] h-[20px] cursor-pointer' alt="" />
            </div>
        </div>

        <div className='h-[30px] flex flex-row items-center space-x-[20px]'>
            <Image src={Message} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]' alt="" />
            <Image src={Alarm} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]' alt="" />
            <Image src={Profile} className='inline-flex sm:w-[30px] sm:h-[30px] w-[20px] h-[20px]' alt="" />
        </div>
    </div>;
}
