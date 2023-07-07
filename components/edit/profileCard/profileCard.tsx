"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import heartImg from "@/app/assets/images/heart.svg";
import hoverHeartImg from "@/app/assets/images/hoverheart.svg";
import activeHeartImg from "@/app/assets/images/activeheart.svg";
import useDrag from "@/app/hooks/dragHook";
import { ProfileImage } from "./profileImage";
import { Nickname } from "./nickname";
import { Description } from "./description";
import { Tag } from "./tag";
import Avatar from "./avatar";
import { Modal } from "../modal";
import { UploadProfileImage } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";
import { supabase, supabaseAuth } from "@/lib/database";

export interface ProfileCardProps {
  profileImage: string;
  profile: any;
  tags: any;
  mostUsedTags: any;
  avatar: any;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { profileImage, profile, tags, mostUsedTags, avatar } = props;

  const { data: session, status } = useSession();
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const [imgFile, setImgFile] = useState(null);

  const [duplication, setDuplication] = useState(false);
  const inputNicknameRef = useRef<any>(null);
  const inputDescriptionRef = useRef<any>(null);

  const [currentTags, setCurrentTags] = useState(tags);

  const onSaveProfileCard = async () => {
    if (!duplication) {
      if (imgFile) {
        var uuid = uuidv4();
        UploadProfileImage(session?.user.id, `${uuid}.png`, imgFile).then(
          async (data) => {
            const { data: profileImageData, error: profileImageError } =
              await supabase
                .from("profiles")
                .update({ image: data?.path })
                .eq("user_id", session?.user.id);
          }
        );
      }

      const { data: nicknameData, error: nicknameError } = await supabaseAuth
        .from("users")
        .update({ nickname: inputNicknameRef.current.value })
        .eq("id", session?.user.id);

      const { data: descriptionData, error: descriptionError } = await supabase
        .from("profiles")
        .update({ description: inputDescriptionRef.current.value })
        .eq("user_id", session?.user.id)
        .select();

      const { data: deleteTagsData, error: deleteTagsError } = await supabase
        .from("tags")
        .delete()
        .eq("profile_id", descriptionData![0].id);

      const { data: tagsData, error: tagsError } = await supabase
        .from("tags")
        .insert(
          currentTags
            .map((tag: any) => {
              return tag.value;
            })
            .map((tag: any) => {
              return { tag: tag, profile_id: descriptionData![0].id };
            })
        );

      router.push(`/${session?.user.id}`);
    } else {
      alert("이미 사용중인 닉네임입니다.");
    }
  };

  return (
    <>
      <div className="sm:space-y-[80px] space-y-[60px] ">
        <ProfileImage
          session={session}
          profileImage={profileImage}
          imgFile={imgFile}
          setImgFile={setImgFile}
        />
        <Nickname
          session={session}
          duplication={duplication}
          setDuplication={setDuplication}
          inputNicknameRef={inputNicknameRef}
        />
        <Description
          session={session}
          profile={profile}
          inputDescriptionRef={inputDescriptionRef}
        />
        <Tag
          session={session}
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
          mostUsedTags={mostUsedTags}
        />
        <Avatar session={session} profile={profile} avatar={avatar[0]} tags={tags}/>
        <div className="flex justify-center pt-[40px] space-x-[15px]">
          <div
            className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
            onClick={() => setModal(true)}
          >
            저장하기
          </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} onSaveData={onSaveProfileCard} />
    </>
  );
}
