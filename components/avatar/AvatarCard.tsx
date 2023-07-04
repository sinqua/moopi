'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import heartImg from "@/app/assets/images/heart.svg";
import hoverHeartImg from "@/app/assets/images/hoverheart.svg";
import activeHeartImg from "@/app/assets/images/activeheart.svg";
import useDrag from "@/app/hooks/dragHook";

export interface AvatarCardProps {
  profileImage: string;
  nickname: string;
  description: string;
  tags: string[];
  profile: any;
  id: string;
  modal: any;
  setModal: any;
}

export default function AvatarCard(props: AvatarCardProps) {
  const { profileImage, nickname, description, tags, profile, id, modal, setModal } = props;

  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div className="relative md:w-[482px] md:h-[526px] h-auto sm:p-[30px] sm:pb-[20px] p-[20px] pb-[20px] flex flex-col md:rounded-[10px] rounded-none overflow-hidden shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
      <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
        <Image
          src={profileImage}
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full border-none"
          alt=""
          loading="eager"
          priority={true}
        />
        <div className="flex flex-col justify-center space-y-[25px] grow">
          <p className="font-semibold text-[18px]">{nickname ?? ""}</p>
          <p className="font-semibold text-[18px]">2023.01.01 14:21</p>
          <Image
            className="sm:h-[30px] h-[24px] sm:w-[30px] w-[24px] !m-0 absolute border-none top-0 right-0 cursor-pointer"
            width={24}
            src={like ? activeHeartImg : hover ? hoverHeartImg : heartImg}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={() => setLike(!like)}
            alt=""
          />
        </div>
      </div>
      <div className="text-[14px] grow whitespace-pre-line leading-[25px] md:mb-0 mb-[40px] overflow-hidden">
        {profile && description}
      </div>
      <div className="text-[14px] space-y-[20px]">
        <div
          className="flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
          {...dragEvents}
          ref={dragRef}
        >
          {tags.map((tag: any, index: any) => {
            return (
              <div
                className="inline-flex h-[31px] px-[18px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing items-center"
                key={tag}
              >
                {tag}
              </div>
            );
          })}
        </div>
        {session?.user.id === id ? (
          <div className="flex w-full h-[47px] space-x-[16px]">
            <div
              className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] cursor-pointer"
              onClick={() => setModal(!modal)}
            >
              슬롯 설정
            </div>
            <div
              className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] bg-[#333333] text-white cursor-pointer"
              onClick={() => router.push(`/${session?.user.id}/upload`)}
            >
              게시하기
            </div>
          </div>
        ) : (
          <div className="relative h-[93px]">
            <div className="flex justify-center items-center h-[47px] bg-[#333333] rounded-[10px] text-[14px] text-white cursor-pointer">
              문의하기
            </div>
            <div className="absolute flex justify-center w-full bottom-[-10px]">
              <div className="inline-flex justify-center items-end w-[330px] h-[71px] pb-[20px] bg-slot bg-no-repeat bg-cover text-[14px] text-center align-text-bottom">
                <span>현재 2개의 슬롯이 남아있어요</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
