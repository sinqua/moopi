"use client";
import { useRef, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { supabaseAuth } from "@/lib/database";
import { supabase } from "@/lib/database";
import { useSession } from "next-auth/react";

import Image from "next/image";
import moopiLogo from "@/app/assets/logos/moopi.svg";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = (searchParams.get("callbackUrl") ?? "/") as string;

  const { data: session, status, update } = useSession();

  const inputRef = useRef<any>(null);
  const [empty, setEmpty] = useState(true);
  const [duplication, setDuplication] = useState(false);

  const onChangeNickname = async (nickname: string) => {
    setEmpty(nickname.length === 0 ? true : false);

    const { data, error } = await supabaseAuth
      .from("users")
      .select()
      .eq("nickname", nickname);

    const result = data?.length === 0 ? false : true;
    setDuplication(result);
  };

  const onSubmit = async () => {
    if (status === "loading") return;
    if (duplication) {
      alert("이미 사용중인 닉네임입니다.");
      return;
    }

    await supabaseAuth
      .from("users")
      .update({ nickname: inputRef.current.value })
      .eq("id", session?.user.id)
      .select();

    await supabase
      .from("profiles")
      .insert([{ user_id: session?.user.id }])
      .select();

    await supabase
      .from("user_details")
      .insert([{ user_id: session?.user.id }])
      .select();

    await supabase
      .from("slots")
      .insert([{ user_id: session?.user.id }])
      .select();

    await supabase
      .from("links")
      .insert([{ user_id: session?.user.id }])
      .select();

    update();
    router.push(`/${session?.user.id}`);
  };

  return (
    <div className="flex flex-col items-center h-full pt-[80px] space-y-[30px] font-sans">
      <Image className="w-[90px] h-[33px]" src={moopiLogo} alt="" />
      <div className="max-w-[648px] w-full px-[80px] py-[60px] space-y-[50px] border-solid border-[1px] border-[#E7E7E7]">
        <p className="text-[25px] font-bold leading-[40px]">
          회원님을 표현할 수 있는
          <br />
          닉네임을 입력해주세요!
        </p>
        <p className="text-[14px] leading-[25px]">
          타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수
          있습니다.
          <br />
          닉네임 변경은 마이페이지{">"}프로필 편집에서 2달에 1회 진행할 수
          있습니다.
        </p>
        <div className="space-y-[6px]">
          <div className="flex items-center w-full h-[47px] px-[25px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]">
            <input
              type="text"
              className="grow h-full outline-none text-sm"
              ref={inputRef}
              placeholder="사용하실 닉네임을 입력해주세요."
              onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChangeNickname(event.target.value);
              }}
            ></input>
          </div>
          {empty ? (
            <></>
          ) : duplication ? (
            <p className="text-[14px] text-[#FF4848]">
              이미 사용중인 닉네임입니다.
            </p>
          ) : (
            <p className="text-[14px] text-[#5333FF]">
              사용 가능한 닉네임입니다.
            </p>
          )}
        </div>

        <div
          className="flex justify-center items-center w-full h-[47px] rounded-[10px] bg-[#333333] border-solid border-[1px] border-[#333333] text-[14px] text-white cursor-pointer"
          onClick={onSubmit}
        >
          계정 생성하기
        </div>
      </div>
    </div>
  );
}
