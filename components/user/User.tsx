"use client";
import { useState } from "react";
import ProfileCard from "./info/ProfileCard";
import { Modal } from "./Modal";
import AvatarCanvas from "./profile/AvatarCanvas";
import EmptyCanvas from "./profile/EmptyCanvas";

interface UserProps {
  profileImage: any;
  nickname: any;
  links: any;
  profileDescription: any;
  tags: any;
  profile: any;
  id: any;
  slot: any;
  modelUrl: any;
  animation: any;
  thumbnailUrl: any;
  session: any;
}

export default function User(props: UserProps) {
  const {
    profileImage,
    nickname,
    links,
    profileDescription,
    tags,
    profile,
    id,
    slot,
    modelUrl,
    animation,
    thumbnailUrl,
    session,
  } = props;

  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col items-center font-sans">
        <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
          <div className="flex justify-center md:w-[814px] md:h-[526px] h-[470px] md:rounded-[10px] rounded-none bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
            {animation ? (
              <AvatarCanvas
                modelUrl={modelUrl}
                animation={animation}
                thumbnailUrl={thumbnailUrl}
              />
            ) : (
              <EmptyCanvas />
            )}
          </div>
          <ProfileCard
            session={session}
            profileImage={profileImage}
            nickname={nickname}
            links={links}
            description={profileDescription}
            tags={tags}
            profile={profile}
            id={id}
            modal={modal}
            setModal={setModal}
          />
        </div>
      </div>
      {/* <Modal modal={modal} setModal={setModal} slot={slot} /> */}
    </>
  );
}
