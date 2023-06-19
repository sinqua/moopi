// "use client";
import { useSession } from "next-auth/react";
import useProfileHook from "./hook";
import Image from "next/image";

import { ProfileImage } from "@/components/edit/profileCard/profileImage";
import { Nickname } from "@/components/edit/profileCard/nickname";
import { Description } from "@/components/edit/profileCard/description";
import { Tag } from "@/components/edit/profileCard/tag";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { Avatar } from "@/components/edit/profileCard/avatar";
import { supabase, supabaseAuth } from "@/lib/database";
import { CreateImageUrl } from "@/lib/storage";
import ProfileCard from "@/components/edit//profileCard/profileCard";
import { Modal } from "@/components/edit/profileCard/modal";
import Edit from "@/components/edit/edit";

// const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

export default async function Page({ params }: { params: { user: string } }) {
  const profileImage = await getUserProfileImage(params.user);
  const profile = await getUserProfile(params.user);
  const detail = await getUserDetail(params.user);

  const tags = profile.tags.map((tag: any) => {
    return { value: tag.tag, label: tag.tag};
  });

  // const {
  //   userInfo,
  //   setUserInfo,
  //   userDetail,
  //   setUserDetail,
  //   page,
  //   setPage,
  //   imgFile,
  //   setImgFile,
  //   imgFiles,
  //   setImgFiles,
  //   tempPaths,
  //   setTempPaths,
  //   duplication,
  //   setDuplication,
  //   // tags,
  //   // setTags,
  //   inputNicknameRef,
  //   inputDescriptionRef,
  //   htmlStr,
  //   setHtmlStr,
  //   onSaveProfileCard,
  //   onSaveDescription,
  // } = useProfileHook();

  // const { data: session, status, update } = useSession();

  // const [modal, setModal] = useState(false);




  return (
    <>
      <Edit profileImage={profileImage.image} profile={profile} tags={tags} detail={detail} />

    
          {/* {page === "설명" && (
            <>
              <div>
                <p className="mb-[15px] text-[20px] font-semibold">
                  상품 설명
                </p>
                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
                  크리에이터님이 제공하는 서비스에 대해 자유롭게 설명해주세요
                </p>
                <div className="h-[500px]">
                  <Editor
                    session={session}
                    userDetail={userDetail}
                    htmlStr={htmlStr}
                    setHtmlStr={setHtmlStr}
                    imgFiles={imgFiles}
                    setImgFiles={setImgFiles}
                    tempPaths={tempPaths}
                    setTempPaths={setTempPaths}
                  />
                </div>
              </div>
              <div className="flex justify-center pt-[40px] space-x-[15px]">
                <div
                  className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
                  onClick={() => setModal(true)}
                >
                  저장하기
                </div>
              </div>
            </>
          )} */}
    </>
  );
}

const getUserProfile = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select(`id, description, image, tags (tag)`)
    .eq("user_id", id);

  return data![0];
};

const getUserProfileImage = async (id: string) => {
  const { data: profileData, error: error1 } = await supabase
    .from("profiles")
    .select(`image`)
    .eq("user_id", id);

  const { data: authData, error: error2 } = await supabaseAuth
    .from("users")
    .select(`image`)
    .eq("id", id);

  if (profileData![0].image) {
    const url = await CreateImageUrl(profileData![0].image);
    return { image: url!.signedUrl };
  }
  return authData![0];
};

const getUserDetail = async (id: string) => {
  const { data, error } = await supabase
    .from("user_details")
    .select()
    .eq("user_id", id);

  return data![0];
};