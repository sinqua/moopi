"use client";
import { useState } from "react";
import Avatar from "./Avatar";
import ProfileCard from "./ProfileCard";
import { Modal } from "./modal";

interface UserProps {
  IframeUrl: string;
  profileImage: any;
  nickname: any;
  profileDescription: any;
  tags: any;
  profile: any;
  id: any;
  description: any;
  priceInfo: any;
  slot: any;
}

export default function User(props: UserProps) {
  const {
    IframeUrl,
    profileImage,
    nickname,
    profileDescription,
    tags,
    profile,
    id,
    slot,
  } = props;

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center font-sans">
        <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
          <Avatar IframeUrl={IframeUrl} />
          <ProfileCard
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
