'use client';
import { useSession } from "next-auth/react";
import useProfileHook from "./hook";
import Image from "next/image";

import { Navbar } from "@/components/profile/navbar";
import { ProfileImage } from "@/components/profile/profileImage";
import { Nickname } from "@/components/profile/nickname";
import { Description } from "@/components/profile/description";
import { Tag } from "@/components/profile/tag";
// import Editor from "@/components/editor";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { Avatar } from "@/components/profile/avatar";


const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

export default function ProfilePage() {
    const { userInfo, setUserInfo, userDetail, setUserDetail, page, setPage, imgFile, setImgFile, imgFiles, setImgFiles, tempPaths, setTempPaths, duplication, setDuplication, tags, setTags, inputNicknameRef, inputDescriptionRef, htmlStr, setHtmlStr, onSaveProfileCard, onSaveDescription } = useProfileHook();
    const {data: session, status, update} = useSession();

    const [modal, setModal] = useState(false);

    const savePofile = () => {
        if(page === "프로필 카드") {
            onSaveProfileCard();
        }
        else if(page === "설명") {
            onSaveDescription();
        }
    }

    return (
        <>
            <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] text-[#333333] text-[14px]">
                <div className="flex flex-col w-full max-w-[1312px] space-y-[60px]">
                    <Navbar page={page} setPage={setPage} />

                    <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 sm:space-y-[80px] space-y-[60px] rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
                        {
                            page === "프로필 카드" &&
                            <>
                                <ProfileImage session={session} imgFile={imgFile} setImgFile={setImgFile}/>
                                <Nickname session={session} inputNicknameRef={inputNicknameRef} duplication={duplication} setDuplication={setDuplication} />
                                <Description session={session} userInfo={userInfo} inputDescriptionRef={inputDescriptionRef} />
                                <Tag session={session} userInfo={userInfo} tags={tags} setTags={setTags} />
                                <Avatar session={session} userInfo={userInfo} />
                                <div className="flex justify-center pt-[40px] space-x-[15px]">
                                    <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={() => setModal(true)}>저장하기</div>
                                </div>
                            </>
                        }
                        {
                            page === "설명" &&
                            <>
                                <div>
                                    <p className="mb-[15px] text-[20px] font-semibold">상품 설명</p>
                                    <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">크리에이터님이 제공하는 서비스에  대해 자유롭게 설명해주세요</p>
                                    <div className="h-[500px]">
                                        <Editor session={session} userDetail={userDetail} htmlStr={htmlStr} setHtmlStr={setHtmlStr} imgFiles={imgFiles} setImgFiles={setImgFiles} tempPaths={tempPaths} setTempPaths={setTempPaths} />
                                    </div>
                                </div>
                                <div className="flex justify-center pt-[40px] space-x-[15px]">
                                    <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                                    <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={() => setModal(true)}>저장하기</div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            {
                modal &&
                <div className="absolute w-full h-full bg-[#00000050] z-0">
                    <div className="sticky top-0 w-full h-screen px-[50px] flex justify-center items-center">
                        <div className="relative max-w-[400px] w-full flex flex-col box-border bg-white rounded-[10px]">
                            <div className="flex flex-col justify-center items-center grow space-y-[15px] box-border px-[60px] py-[30px]">
                                <p className="text-[16px] font-semibold text-center">게시물을 저장하시겠습니까?</p>
                                <p className="text-[#7B7B7B] text-center">게시물이 마이페이지에 게시됩니다.</p>
                            </div>
                            <div className="flex">
                                <div className="flex justify-center basis-1/2 py-[20px] text-[#7B7B7B] cursor-pointer" onClick={() => setModal(false)}>취소</div>
                                <div className="flex justify-center basis-1/2 py-[20px] text-[#2778C7] cursor-pointer" onClick={savePofile}>저장</div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            }
        </>
    )
}