'use client';
import { useSession } from "next-auth/react";
import useProfileHook from "./hook";

import { Navbar } from "@/components/profile/navbar";
import { ProfileImage } from "@/components/profile/profileImage";
import { Nickname } from "@/components/profile/nickname";
import { Description } from "@/components/profile/description";
import { Tag } from "@/components/profile/tag";

export default function ProfilePage() {
    const { userInfo, setUserInfo, page, setPage, imgFile, setImgFile, duplication, setDuplication, tags, setTags, inputNicknameRef, inputDescriptionRef, inputTagRef, onSubmit } = useProfileHook();
    const {data: session, status, update} = useSession();

    return (
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
                            <Tag session={session} userInfo={userInfo} inputTagRef={inputTagRef} tags={tags} setTags={setTags} />
                            <div className="flex justify-center pt-[40px] space-x-[15px]">
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSubmit}>저장하기</div>
                            </div>
                        </>
                    }
                    {
                        page === "설명" &&
                        <>
                            <div>
                                <p className="mb-[15px] text-[20px] font-semibold">상품 설명</p>
                                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">크리에이터님이 제공하는 서비스에  대해 자유롭게 설명해주세요.</p>
                            </div>
                            <div className="flex justify-center pt-[40px] space-x-[15px]">
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSubmit}>저장하기</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}