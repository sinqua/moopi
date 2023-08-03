import { useRef, useState } from "react";

interface KakaoLinkProps {
  session: any;
  links: any;
  inputKakaoLinkRef: any;
}

export const KakaoLink = (props: KakaoLinkProps) => {
  const { session, links, inputKakaoLinkRef } = props;

  return (
    <div>
      <p className="mb-[15px] text-[20px] font-semibold">오픈카톡 링크</p>
      <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
        사용중인 오픈카톡 전체 링크를 입력해주세요.<br/>{"예시) https://open.kakao.com/o/s7l8njtf"}
      </p>
      <div className="flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
        <input
          type="text"
          className="grow h-full outline-none text-sm"
          placeholder="오픈카톡 링크를 입력해주세요."
          defaultValue={links ? links?.kakao : ""}
          ref={inputKakaoLinkRef}
        ></input>
      </div>
    </div>
  );
};
