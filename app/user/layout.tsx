
import Logo from '../assets/moopi.svg';
import SearchBtn from '../assets/images/searchBtn.png';
import Alarm from '../assets/images/alarm.png';
import Message from '../assets/images/message.png';
import Profile from '../assets/images/profile.png';

import Image from 'next/image';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center h-auto min-h-full'>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

function Footer() {
    return <div className="w-full md:h-[239px] sm:h-[276px] h-[281px] sm:py-[60px] py-[50px] px-[17px] text-[14px] bg-[#F9F9F9] border-t-[1px] border-s2xyoon-gray font-sans">
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
            <Image src={Logo} className='w-auto h-[20px]' alt='' />
            <div className='sm:flex hidden justify-center space-x-[5px]'>
                <div>CopyRight</div>
                <div>ⓒ</div>
                <div className='font-NanumSquareNeoHv'>MOOPI Corp.</div>
                <div>All Rights Reserved.</div>
            </div>
        </div>
    </div>;
}

function Header() {
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

