'use client';
import { useEffect, useRef, useState } from "react";
import { redirect, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useSession } from 'next-auth/react'

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";


export default function JoinPage() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const callbackUrl = (searchParams.get('callbackUrl') ?? "/") as string

    const {data: session, status, update} = useSession();

    const inputRef = useRef<any>(null)
    const [ empty, setEmpty ] = useState(true);
    const [ duplication, setDuplication ] = useState(false);

    const onChangeNickname = (nickname: string) => {
        setEmpty(nickname.length === 0 ? true : false);

        fetch('/api/join/duplicate', {
            method: 'POST',
            body: JSON.stringify({
                "nickname": nickname
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setDuplication(data.body.result);
        });
    }

    const onSubmit = () => {
        if(status !== "loading") {
            if(!duplication) {
                fetch('/api/join', {
                    method: 'POST',
                    body: JSON.stringify({
                        "id": session?.user.id,
                        "nickname": inputRef.current.value
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    if(data.status === 200) {
                        update();
                        router.push(callbackUrl);
                    }
                });
            }
            else {
                alert("이미 사용중인 닉네임입니다.");
            }
        }
    }

    return (
        <div className="flex flex-col items-center h-full pt-[80px] space-y-[30px] font-sans">
            <Image className="w-[90px] h-[33px]" src={moopiLogo} alt=""/>
            <div className="max-w-[648px] w-full px-[80px] py-[60px] space-y-[50px] border-solid border-[1px] border-[#E7E7E7]">
                <p className="text-[25px] font-bold leading-[40px]">회원님을 표현할 수 있는<br/>닉네임을 입력해주세요!</p>
                <p className="text-[14px] leading-[25px]">타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수 있습니다.<br/>닉네임 변경은 마이페이지{">"}프로필 편집에서 2달에 1회 진행할 수 있습니다.</p>
                <div className="space-y-[6px]">
                    <div className='flex items-center w-full h-[47px] px-[25px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                        <input type='text' className='grow h-full outline-none text-sm' ref={inputRef} placeholder='사용하실 닉네임을 입력해주세요.' onInput={(event: React.ChangeEvent<HTMLInputElement>) => {onChangeNickname(event.target.value)}}></input>
                    </div>
                    {empty ? <></> :
                        duplication ?
                        <p className="text-[14px] text-[#FF4848]">이미 사용중인 닉네임입니다.</p> :
                        <p className="text-[14px] text-[#5333FF]">사용 가능한 닉네임입니다.</p>
                    }
                </div>

                <div className='flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#333333] border-solid border-[1px] border-[#333333] text-[14px] text-white cursor-pointer' onClick={onSubmit}>
                    계정 생성하기
                </div>
            </div>
        </div>
    );
}