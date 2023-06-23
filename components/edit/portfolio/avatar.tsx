import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import emptyImg from "@/app/assets/images/empty.png";
import useDrag from "@/app/hooks/dragHook";

interface AvatarProps {
  portfolio: any;
}

export const Avatar = (props: AvatarProps) => {
  const { portfolio } = props;

  const { dragRef, dragEvents, mountedStatus, setMountedStatus } = useDrag();

  useEffect(() => {
    setMountedStatus(true);
  }, []);

  return (
    <div className="w-full p-[30px] flex flex-col rounded-[10px] shadow-[0px_3px_6px_rgba(0,0,0,0.16)]">
      <div className="flex sm:flex-row flex-col sm:space-x-[30px] sm:space-y-0 space-y-[30px] sm:items-start items-center">
        <Image
          className="w-[316px] h-[512px] rounded-[10px]"
          width="316"
          height="512"
          src={portfolio ? portfolio.thumbnailUrl : emptyImg}
          alt=""
        />
        <div className="inline-flex flex-col grow w-full md:h-[512px] h-auto overflow-hidden">
          <div className="w-full h-full md:space-y-[50px] space-y-[30px]">
            <div className="flex flex-col space-y-[15px] mb-[50px]">
              <p className="text-[20px] font-semibold">{portfolio.name}</p>
              <div className="flex flex-wrap">
                <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                  <p className="text-[#7B7B7B]">업로드</p>
                  <p className="font-semibold ">
                    {new Date(portfolio.created_at).getFullYear() +
                      "." +
                      (new Date(portfolio.created_at).getMonth() + 1) +
                      "." +
                      new Date(portfolio.created_at).getDate()}
                  </p>
                </div>
                <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                  <p className="text-[#7B7B7B]">상태</p>
                  <p className="font-semibold ">
                    {portfolio.visible ? "공개" : "비공개"}
                  </p>
                </div>
                <div className="flex space-x-[8px] md:mr-[200px] mr-[30px]">
                  <p className="text-[#7B7B7B]">애니메이션</p>
                  <p className="font-semibold ">{portfolio.animation.name}</p>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
              <div className="flex flex-col w-[300px] space-y-[15px]">
                <p className="text-[20px] font-semibold">아바타</p>
                <p className="whitespace-nowrap">{portfolio.vrm}</p>
              </div>
              <div className="flex flex-col w-[300px] space-y-[15px]">
                <p className="text-[20px] font-semibold">썸네일</p>
                <p className="whitespace-nowrap">{portfolio.thumbnail}</p>
              </div>
            </div>
            <div className="flex md:flex-row flex-col flex-wrap md:space-x-[50px] space-x-0 md:space-y-0 space-y-[30px]">
              <div className="flex flex-col w-[300px] space-y-[15px]">
                <p className="text-[20px] font-semibold">아바타 설명</p>
                <p className="whitespace-normal leading-[25px]">
                  {portfolio.description}
                </p>
              </div>
              <div className="flex flex-col flex-wrap md:w-[400px] w-full space-y-[15px]">
                <p className="text-[20px] font-semibold">태그</p>
                <div
                  className="md:w-[400px] w-full max-w-full flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]"
                  {...dragEvents}
                  ref={dragRef}
                >
                  {portfolio.tags.map((tag: any, index: any) => {
                    return (
                      <div
                        className="inline-flex h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap cursor-grabbing"
                        key={tag}
                      >
                        {tag}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex hidden justify-center space-x-[15px]">
            <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">
              삭제하기
            </div>
            <div
              className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
              onClick={() => console.log("good")}
            >
              수정하기
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center md:pt-0 pt-[50px] space-x-[15px]">
        <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">
          삭제하기
        </div>
        <div
          className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
          onClick={() => console.log("good")}
        >
          수정하기
        </div>
      </div>
    </div>
  );
};
