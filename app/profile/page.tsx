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

import emptyImg from "@/app/assets/images/empty.png";
import { useDraggable } from "react-use-draggable-scroll";


const Editor = dynamic(() => import('@/components/editor'), { ssr: false });



export default function ProfilePage() {
    const { userInfo, setUserInfo, userDetail, setUserDetail, page, setPage, imgFile, setImgFile, imgFiles, setImgFiles, tempPaths, setTempPaths, duplication, setDuplication, tags, setTags, inputNicknameRef, inputDescriptionRef, htmlStr, setHtmlStr, onSaveProfileCard, onSaveDescription } = useProfileHook();
    const {data: session, status, update} = useSession();

    const [avatarTags, setAvatarTags] = useState<any>(["VRC", "blender", "트위치 방송", "이세계아이돌"]);

    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, { applyRubberBandEffect: true }); // Now we pass the reference to the useDraggable hook:

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
                            <Tag session={session} userInfo={userInfo} tags={tags} setTags={setTags} />
                            <div>
                                <p className="mb-[15px] text-[20px] font-semibold">대표 아바타</p>
                                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">프로필 페이지에서 보여줄 아바타 파일을 업로드 합니다.<br/>50mb 이하의 vrm 파일을 사용해주세요.<br/>썸네일은 1000 x 1000 이상의 JPEG 또는 PNG 파일을 권장합니다.</p>
                                <div className="w-full p-[30px] flex flex-col rounded-[10px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
                                    <div className="flex sm:flex-row flex-col space-x-[30px]">
                                        <Image className="w-[316px] h-[512px] rounded-[10px]" src={emptyImg} alt=""/>
                                        <div className="inline-flex flex-col grow overflow-hidden">
                                            <div className="w-full h-full md:space-y-[50px] space-y-[30px]">
                                                <div className="flex flex-col space-y-[15px] mb-[50px]">
                                                    <p className="text-[20px] font-semibold">Avatar Name</p>
                                                    <div className="flex flex-wrap">
                                                        <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                                                            <p className="text-[#7B7B7B]">업로드</p>
                                                            <p className="font-semibold ">2023.01.01</p>
                                                        </div>
                                                        <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                                                            <p className="text-[#7B7B7B]">상태</p>
                                                            <p className="font-semibold ">공개</p>
                                                        </div>
                                                        <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                                                            <p className="text-[#7B7B7B]">애니메이션</p>
                                                            <p className="font-semibold ">HiphopDance</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
                                                    <div className="flex flex-col w-[300px] space-y-[15px]">
                                                        <p className="text-[20px] font-semibold">아바타</p>
                                                        <p className="whitespace-nowrap">Anon.vrm</p>
                                                    </div>
                                                    <div className="flex flex-col w-[300px] space-y-[15px]">
                                                        <p className="text-[20px] font-semibold">썸네일</p>
                                                        <p className="whitespace-nowrap">AnonCropTop.jpg</p>
                                                    </div>
                                                </div>
                                                <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
                                                    <div className="flex flex-col w-[300px] space-y-[15px]">
                                                        <p className="text-[20px] font-semibold">아바타 설명</p>
                                                        <p className="whitespace-nowrap leading-[25px]">아무도<br/>나의<br/>아논짱을<br/>가질 수 없으셈 후욱</p>
                                                    </div>
                                                    <div className="flex flex-col flex-wrap md:w-[400px] w-full space-y-[15px]">
                                                        <p className="text-[20px] font-semibold">태그</p>
                                                        <div className="md:w-[400px] w-full max-w-full flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]" {...events} ref={ref}>
                                                        {avatarTags.map((tag: any, index: any) => {
                                                            return (
                                                                <div
                                                                className="inline-flex h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing"
                                                                key={tag}
                                                                >
                                                                {tag}
                                                                </div>
                                                            );
                                                        })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="md:flex hidden justify-center space-x-[15px]">
                                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">삭제하기</div>
                                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveProfileCard}>수정하기</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:hidden flex justify-center md:pt-0 pt-[50px] space-x-[15px]">
                                        <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">삭제하기</div>
                                        <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveProfileCard}>수정하기</div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="flex justify-center pt-[40px] space-x-[15px]">
                                {/* <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div> */}
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveProfileCard}>저장하기</div>
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
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveDescription}>저장하기</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}