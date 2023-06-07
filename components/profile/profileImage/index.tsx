import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import emptyImg from "@/app/assets/images/empty.png";
import useInputProfileImage from "./useInputProfileImage";

interface ProfileImageProps {
	session: any;
    imgFile: any;
    setImgFile: any;
}

export const ProfileImage = (props: ProfileImageProps) => {
    const { session, imgFile, setImgFile } = props;

    const imgRef = useRef<any>();

    const { profileImage, getUserProfileImage, loadImgFile } = useInputProfileImage({session, imgRef, setImgFile});


    useEffect(() => {
        if(session)
            getUserProfileImage();
    }, [session])

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold">프로필 사진</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.<br/>타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로 변경할 수 있습니다.</p>
            <div className="flex  items-center space-x-[40px]">
                <Image src={profileImage ? profileImage : emptyImg} width={160} height={160} className="sm:h-[160px] h-[100px] sm:w-[160px] w-[100px] bg-gray-200 rounded-full border-none" alt="" />
                <form>
                    <label className="flex justify-center items-center w-[144px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" htmlFor="profileImg">프로필 변경</label>
                    <input
                        className="hidden"
                        type="file"
                        accept="image/*"
                        id="profileImg"
                        onChange={loadImgFile}
                        ref={imgRef}
                    />
                </form>
            </div>
        </div>
    );
}
