'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import heartImg from "@/app/assets/images/heart.svg";
import hoverHeartImg from "@/app/assets/images/hoverheart.svg";
import activeHeartImg from "@/app/assets/images/activeheart.svg";
import useDrag from "@/app/hooks/dragHook";
import { ProfileImage } from "./profileImage";
import { Nickname } from "./nickname";
import { Description } from "./description";
import { Tag } from "./tag";
import { Avatar } from "./avatar";
import { Modal } from "./modal";

export interface ProfileCardProps {
  profileImage: string;
  profile: any;
//   nickname: string;
//   description: string;
  tags: any;
//   profile: any;
//   id: string;
}

const defaultImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAQAAAAnZu5uAAAAEUlEQVR42mP8/58BChhJYAIAOrAJ/K4Ry7oAAAAASUVORK5CYII=";

export default function ProfileCard(props: ProfileCardProps) {
//   const { profileImage, nickname, description, tags, profile, id } = props;
const { profileImage, profile, tags } = props;

  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

//   const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

//   useEffect(() => {
//     setMountedStatus(true);
//   }, []);

  const [modal, setModal] = useState(false);


  return (
    <>
      <div className="sm:space-y-[80px] space-y-[60px] ">
        <ProfileImage
            session={session}
            profileImage={profileImage}
        />
        <Nickname
            session={session}
        />
        <Description
            session={session}
            profile={profile}
        />
        <Tag
            session={session}
            tags={tags}
            // setTags={setTags}
        />
        <Avatar session={session} profile={profile} />
        <div className="flex justify-center pt-[40px] space-x-[15px]">
            <div
            className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
            onClick={() => setModal(true)}
            >
            저장하기
            </div>
        </div>
      </div>
      <Modal modal={modal} setModal={setModal}/>

    </>
  );
}
