"use client";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { useSession } from "next-auth/react";

interface ModalProps {
  show: boolean;
  done: boolean;
}

export default function Waiting(props: ModalProps) {
  const { show, done } = props;
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      {show && (
        <div className="absolute w-full h-full bg-[#00000050] top-0 left-0 !m-0 z-0">
          <div className="sticky top-0 w-full h-screen px-[50px] flex justify-center items-center">
            <div className="relative max-w-[250px] w-full flex flex-col box-border bg-white rounded-[10px] overflow-hidden">
              <div className="flex flex-col justify-center items-center grow space-y-[15px] box-border px-[60px] py-[30px]">
                <ClipLoader color={"#2778C7"} loading={!done} size={50} />
                {done && "업로드 완료"}
              </div>
              <div className="flex justify-center border-solid border-t-[1px] border-[#DFDFDF]">
                <div
                  className="flex justify-center py-[20px] text-[#2778C7] border-solid  border-[#DFDFDF] cursor-pointer"
                  onClick={() => {
                    if (!done) return;
                    router.push(`/${session?.user.id}`);
                  }}
                >
                  {done ? "확인" : "업로드 중..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
