import { useRef, useState } from "react";

interface TossLinkProps {
  session: any;
  links: any;
  inputTossLinkRef: any;
}

export const TossLink = (props: TossLinkProps) => {
  const { session, links, inputTossLinkRef } = props;

  return (
    <div>
      <p className="mb-[15px] text-[20px] font-semibold">토스아이디 링크</p>
      <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
        사용중인 토스 익명송금 전체 링크를 입력해주세요.<br/>{"예시) https://toss.me/istick"}
      </p>
      <div className="flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
        <input
          type="text"
          className="grow h-full outline-none text-sm"
          placeholder="토스 링크를 입력해주세요."
          defaultValue={links ? links?.toss : ""}
          ref={inputTossLinkRef}
        ></input>
      </div>
    </div>
  );
};
