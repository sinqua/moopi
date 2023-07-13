"use client";
import { useState } from "react";
import Avatar from "./Avatar";
import ProfileCard from "./ProfileCard";
import { Modal } from "./modal";

interface UserProps {
  profileImage: any;
  nickname: any;
  profileDescription: any;
  tags: any;
  profile: any;
  id: any;
  slot: any;
  avatarID: any;
  modelUrl: any;
  animationUrl: any;
  thumbnailUrl: any;
  session:any
}

export default function User(props: UserProps) {
  const {
    profileImage,
    nickname,
    profileDescription,
    tags,
    profile,
    id,
    slot,
    avatarID,
    modelUrl,
    animationUrl,
    thumbnailUrl,
    session
  } = props;
  
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center font-sans">
        <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
          <Avatar
            userID={id}
            avatarID={avatarID}
            modelUrl={modelUrl}
            animationUrl={animationUrl}
            thumbnailUrl={thumbnailUrl}
          />
          <ProfileCard
          session={session}
            profileImage={profileImage}
            nickname={nickname}
            description={profileDescription}
            tags={tags}
            profile={profile}
            id={id}
            modal={modal}
            setModal={setModal}
          />
        </div>
      </div>
      <Modal modal={modal} setModal={setModal} slot={slot} />
    </>
  );
}
