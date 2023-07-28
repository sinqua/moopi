"use client";
import { UploadBase64Image } from "@/lib/storage";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../modal";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/database";
import LoadingModal from "../LoadingModal";

const Editor = dynamic(() => import("../../Editor"), { ssr: false });

interface PriceInfoProps {
  detail: any;
}

export default function PriceInfo(props: PriceInfoProps) {
  const { detail } = props;
  const router = useRouter();

  const { data: session, status } = useSession();

  const [htmlStr, setHtmlStr] = useState<any>(null);

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSavePriceInfo = async () => {
    setModal(false);
    setLoading(true);

    for (let i = 0; i < htmlStr.ops.length; i++) {
      if (Object.keys(htmlStr.ops[i].insert).includes("image")) {
        if (htmlStr.ops[i].insert.image.includes("base64")) {
          var uuid = uuidv4();

          await UploadBase64Image(
            session?.user.id,
            `${uuid}.png`,
            htmlStr.ops[i].insert.image
          ).then(async (data) => {
            htmlStr.ops[i].insert.image = data?.path;
          });
        } else {
          htmlStr.ops[i].insert.image = htmlStr.ops[i].insert.image
            .split("/image/")[1]
            .split("?")[0];
        }
      }
    }

    const { data, error } = await supabase
      .from("user_details")
      .update({ price_info: JSON.stringify({ ...htmlStr.ops }) })
      .eq("user_id", session?.user.id)
      .select();

    router.push(`/${session?.user.id}`);
  };

  return (
    <>
      <div>
        <p className="mb-[15px] text-[20px] font-semibold">가격정보</p>
        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
          서비스에 대한 가격정보를 상세히 적어주세요.
        </p>
        <div className="h-[500px]">
          <Editor
            content={detail.price_info}
            htmlStr={htmlStr}
            setHtmlStr={setHtmlStr}
          />
        </div>
      </div>
      <div className="flex justify-center pt-[40px] space-x-[15px]">
        <div
          className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer"
          onClick={() => setModal(true)}
        >
          저장하기
        </div>
      </div>
      <Modal
        modal={modal}
        setModal={setModal}
        onSaveData={onSavePriceInfo}
      />
      <LoadingModal modal={loading} />
    </>
  );
}
