"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import heartImg from "@/app/assets/images/heart.svg";
import hoverHeartImg from "@/app/assets/images/hoverheart.svg";
import activeHeartImg from "@/app/assets/images/activeheart.svg";
import useDrag from "@/hooks/useDrag";
import tossLogo from "@/app/assets/logos/toss.svg";
import kakaoLogo from "@/app/assets/logos/kakao.svg";
import Link from "next/link";

export interface ProfileCardProps {
  profileImage: string;
  nickname: string;
  links: any;
  description: string;
  tags: string[];
  profile: any;
  id: string;
  modal: any;
  setModal: any;
  session: any;
}

export default function ProfileCard(props: ProfileCardProps) {
  const {
    profileImage,
    nickname,
    links,
    description,
    tags,
    profile,
    id,
    modal,
    setModal,
    session,
  } = props;

  const [hover, setHover] = useState(false);
  const [like, setLike] = useState(false);

  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div className="relative md:w-[482px] md:h-[526px] h-auto sm:p-[30px] sm:pb-[20px] p-[20px] pb-[20px] flex flex-col md:rounded-[10px] rounded-none overflow-hidden shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
      <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
        {profile.image ? (
          <Image
            src={profile.image}
            width={100}
            height={100}
            className="h-[100px] w-[100px] rounded-full border-none"
            alt=""
          />
        ) : (
          <Image
            src={profileImage}
            width={100}
            height={100}
            className="h-[100px] w-[100px] rounded-full border-none"
            alt=""
          />
        )}
        <div className="flex flex-col justify-center space-y-[25px] grow">
          <p className="font-semibold text-[18px]">{nickname ?? ""}</p>
          <div className="flex flex-row text-[14px] flex-wrap md:justify-between md:space-x-0 sm:space-x-[50px] space-x-[30px]">
            <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]">
              <p>포트폴리오</p>
              <p className="font-semibold">3</p>
            </div>
            <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]">
              <p>커미션</p>
              <p className="font-semibold">1</p>
            </div>
            <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]">
              <p>팔로우</p>
              <p className="font-semibold">1</p>
            </div>
          </div>
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
            <Link
              href={`/${session?.user.id}/upload?is_profile=false`}
              className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] bg-[#333333] text-white cursor-pointer"
            >
              게시하기
            </Link>
          </div>
        ) : (
          <div className="flex relative h-[50px] space-x-[16px]">
            <Link
              href={links.toss ? links.toss : ""}
              rel="noopener noreferrer"
              target="_blank"
              className={`${
                links.toss ? "pointer-events-auto" : "pointer-events-none"
              } flex justify-center items-center w-[50%] h-[47px] pl-[6px] bg-[#DBEAFF] rounded-[10px] text-[14px] text-[#0064FF] cursor-pointer`}
            >
              <Image
                className="w-[20px] h-[20px] ml-[15px] absolute left-0"
                src={tossLogo}
                alt=""
              />
              송금하기
            </Link>
            <Link
              href={links.kakao ? links.kakao : ""}
              rel="noopener noreferrer"
              target="_blank"
              className={`${
                links.kakao ? "pointer-events-auto" : "pointer-events-none"
              } flex relative justify-center items-center w-[50%] h-[47px] pl-[6px] bg-[#FEE500] rounded-[10px] text-[14px] text-[#3C1E1E] cursor-pointer`}
            >
              <Image
                className="w-[20px] h-[20px] ml-[15px] absolute left-0"
                src={kakaoLogo}
                alt=""
              />
              오픈채팅
            </Link>
            {/* <div className="absolute flex justify-center w-full bottom-[-10px]">
              <div className="inline-flex justify-center items-end w-[330px] h-[71px] pb-[20px] bg-slot bg-no-repeat bg-cover text-[14px] text-center align-text-bottom">
                <span>현재 2개의 슬롯이 남아있어요</span>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
