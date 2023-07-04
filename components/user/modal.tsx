"use client";
import { supabase } from "@/lib/database";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

interface ModalProps {
  modal: any;
  setModal: any;
  slot: any;
}

export const Modal = (props: ModalProps) => {
  const { modal, setModal, slot } = props;

  const { data: session, status } = useSession();

  const [current, setCurrent] = useState(slot.current);
  const [maximum, setMaximum] = useState(slot.maximum);

  const onSaveSlot = async (current: number, maximum: number) => {
    const { data, error } = await supabase
      .from("slots")
      .update({ current: current, maximum: maximum })
      .eq("user_id", session?.user.id)
      .select();

    setModal(false);
  };

  return (
    modal && (
      <div className="absolute w-full h-full bg-[#00000050] top-0 left-0 !m-0 z-[999] text-[14px]">
        <div className="sticky top-0 w-full h-screen px-[50px] flex justify-center items-center">
          <div className="relative max-w-[360px] w-full flex flex-col box-border bg-white rounded-[10px] overflow-hidden">
            <div className="flex flex-col justify-center items-center grow space-y-[40px] box-border px-[40px] py-[30px]">
              <p className="text-[16px] font-semibold text-center">
                슬롯 정보를 변경합니다.
              </p>
              <div className="flex flex-col w-full space-y-[30px]">
                <div className="flex w-full justify-between">
                  <p>진행중인 작업</p>
                  <div className="flex w-[70px] justify-between items-center">
                    <div
                      className={
                        "flex justify-center items-center w-[18px] h-[18px] text-[24px] rounded-full bg-[#EFEFEF] select-none cursor-pointer " +
                        (current > 0 ? "text-[#707070]" : "text-[#CBCBCB]")
                      }
                      onClick={() => current > 0 && setCurrent(current - 1)}
                    >
                      -
                    </div>
                    <p>{current}</p>
                    <div
                      className={
                        "flex justify-center items-center w-[18px] h-[18px] text-[20px] rounded-full bg-[#EFEFEF] text-[#707070] select-none cursor-pointer " +
                        (current < maximum
                          ? "text-[#707070]"
                          : "text-[#CBCBCB]")
                      }
                      onClick={() =>
                        current < maximum && setCurrent(current + 1)
                      }
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <p>최대 슬롯 설정</p>
                  <div className="flex w-[70px] justify-between items-center">
                    <div
                      className={
                        "flex justify-center items-center w-[18px] h-[18px] text-[24px] rounded-full bg-[#EFEFEF] text-[#707070] select-none cursor-pointer " +
                        (maximum > current
                          ? "text-[#707070]"
                          : "text-[#CBCBCB]")
                      }
                      onClick={() =>
                        maximum > current && setMaximum(maximum - 1)
                      }
                    >
                      -
                    </div>
                    <p>{maximum}</p>
                    <div
                      className={
                        "flex justify-center items-center w-[18px] h-[18px] text-[20px] rounded-full bg-[#EFEFEF] text-[#707070] select-none cursor-pointer " +
                        (maximum < 10 ? "text-[#707070]" : "text-[#CBCBCB]")
                      }
                      onClick={() => maximum < 10 && setMaximum(maximum + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-solid border-t-[1px] border-[#DFDFDF]">
              <div
                className="flex justify-center basis-1/2 py-[20px] text-[#7B7B7B] cursor-pointer"
                onClick={() => setModal(false)}
              >
                취소
              </div>
              <div
                className="flex justify-center basis-1/2 py-[20px] text-[#2778C7] border-solid border-l-[1px] border-[#DFDFDF] cursor-pointer"
                onClick={() => onSaveSlot(current, maximum)}
              >
                저장
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
