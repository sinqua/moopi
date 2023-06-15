import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import emptyImg from "@/app/assets/images/empty.png";
import useDrag from "@/app/hooks/dragHook";

// import useInputDescription from "./useInputDescription";

interface AvatarProps {
	session: any;
    userInfo: any;
}

export const Avatar = (props: AvatarProps) => {
    const { session, userInfo } = props;
    // const { textareaCount, setTextareaCount } = useInputDescription(props);
    const [avatarTags, setAvatarTags] = useState<any>(["VRC", "blender", "트위치 방송", "이세계아이돌"]);

    const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

    useEffect(() => {
        setMountedStatus(true);
    }, []);

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold">대표 아바타</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">프로필 페이지에서 보여줄 아바타 파일을 업로드 합니다.<br/>50mb 이하의 vrm 파일을 사용해주세요.<br/>썸네일은 1000 x 1000 이상의 JPEG 또는 PNG 파일을 권장합니다.</p>
            <div className="w-full p-[30px] flex flex-col rounded-[10px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
                <div className="flex sm:flex-row flex-col sm:space-x-[30px] sm:space-y-0 space-y-[30px] sm:items-start items-center">
                    <Image className="w-[316px] h-[512px] rounded-[10px]" src={emptyImg} alt=""/>
                    <div className="inline-flex flex-col grow w-full overflow-hidden">
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
                                    <div className="md:w-[400px] w-full max-w-full flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]" {...dragEvents} ref={dragRef}>
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
                            <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={() => console.log("good")}>수정하기</div>
                        </div>
                    </div>
                </div>
                <div className="md:hidden flex justify-center md:pt-0 pt-[50px] space-x-[15px]">
                    <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">삭제하기</div>
                    <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={() => console.log("good")}>수정하기</div>
                </div>
            </div>
            
        </div>
    );
}
