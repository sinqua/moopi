"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { ProfileImage } from "./profileImage";
import { Nickname } from "./nickname";
import { Description } from "./description";
import { Tag } from "./tag";
import Avatar from "./avatar";
import { Modal } from "../modal";
import { v4 as uuidv4 } from "uuid";
import { supabase, supabaseAuth } from "@/lib/database";
import Waiting from "../Waiting";
import { KakaoLink } from "./kakaoLink";
import { TossLink } from "./tossLink";

export interface ProfileCardProps {
  profileImage: string;
  links: any;
  profile: any;
  tags: any;
  mostUsedTags: any;
  avatar: any;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { profileImage, links, profile, tags, mostUsedTags, avatar } = props;

  const { data: session, status } = useSession();
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [done, setDone] = useState<boolean>(false);
  const [waitModal, setWaitModal] = useState<boolean>(false);

  const [imgFile, setImgFile] = useState(null);

  const [duplication, setDuplication] = useState(false);
  const inputNicknameRef = useRef<any>(null);
  const inputKakaoLinkRef = useRef<any>(null);
  const inputTossLinkRef = useRef<any>(null);
  const inputDescriptionRef = useRef<any>(null);

  const [currentTags, setCurrentTags] = useState(tags);

  const onSaveProfileCard = async () => {
    setModal(false);
    setWaitModal(true);

    if (duplication) {
      alert("이미 사용중인 닉네임입니다.");
      return;
    }

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

    const { data: linkData, error: linkError } = await supabase
      .from("links")
      .update({ kakao: inputKakaoLinkRef.current.value ? inputKakaoLinkRef.current.value : null, toss: inputTossLinkRef.current.value ? inputTossLinkRef.current.value : null})
      .eq("user_id", session?.user.id);

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

    setDone(true);
    setWaitModal(false);
    router.push(`/${session?.user.id}`);
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
        <KakaoLink
          session={session}
          links={links}
          inputKakaoLinkRef={inputKakaoLinkRef}
        />
        <TossLink
          session={session}
          links={links}
          inputTossLinkRef={inputTossLinkRef}
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
        <Avatar
          session={session}
          profile={profile}
          avatar={avatar}
          tags={tags}
        />
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
      <Waiting show={waitModal} done={done} />
    </>
  );
}


// Upload file using standard upload
export async function UploadProfileImage(
  userId: any,
  filename: any,
  file: any
) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("profile-image")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}