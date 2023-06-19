'use client'
import { useState } from "react";
import ProfileCard from "./profileCard/profileCard";
import Description from "./description/description";
import Navbar from "./navbar";

export interface EditProps {
    profileImage: string;
    profile: any;
    tags: any;
    detail: any;
}

export default function Edit(props: EditProps) {
    const { profileImage, profile, tags, detail } = props;

    const [page, setPage] = useState("프로필 카드");

    return (
        <div className="md:max-w-[1312px] w-full pt-[50px]">
            <Navbar page={page} setPage={setPage} />
            <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] text-[#333333] text-[14px]">
                {/* <div className="flex flex-col w-full max-w-[1312px] space-y-[60px]"></div> */}
                <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
                    {
                        page === "프로필 카드" &&
                        <ProfileCard profileImage={profileImage} profile={profile} tags={tags} />
                    }
                    {
                        page === "설명" &&
                        <Description profile={profile} detail={detail}/>
                    }
                </div>
            </div>
        </div>
    )
}