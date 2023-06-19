"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";

interface ModalProps {
  // session: any;
  modal: any;
  setModal: any;
}

export const Modal = (props: ModalProps) => {
  const { modal, setModal } = props;

  const savePofile = () => {
    // if (page === "프로필 카드") {
    //   onSaveProfileCard();
    // } else if (page === "설명") {
    //   onSaveDescription();
    // }
  };

  return (
    modal &&
    <div className="absolute w-full h-full bg-[#00000050] top-0 left-0 !m-0 z-0">
      <div className="sticky top-0 w-full h-screen px-[50px] flex justify-center items-center">
        <div className="relative max-w-[400px] w-full flex flex-col box-border bg-white rounded-[10px]">
          <div className="flex flex-col justify-center items-center grow space-y-[15px] box-border px-[60px] py-[30px]">
            <p className="text-[16px] font-semibold text-center">
              게시물을 저장하시겠습니까?
            </p>
            <p className="text-[#7B7B7B] text-center">
              게시물이 마이페이지에 게시됩니다.
            </p>
          </div>
          <div className="flex">
            <div
              className="flex justify-center basis-1/2 py-[20px] text-[#7B7B7B] cursor-pointer"
              onClick={() => setModal(false)}
            >
              취소
            </div>
            <div
              className="flex justify-center basis-1/2 py-[20px] text-[#2778C7] cursor-pointer"
              onClick={savePofile}
            >
              저장
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
