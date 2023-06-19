// import Editor from "@/components/Editor";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface DescriptionProps {
	profile: any;
    detail: any;
}

export default function Description(props: DescriptionProps) {
    const { profile, detail } = props;

    const [userDetail, setUserDetail] = useState<any>(detail);
    const [htmlStr, setHtmlStr] = useState<any>(null);
    const [imgFiles, setImgFiles] = useState<any>([]);
    const [tempPaths, setTempPaths] = useState<any>([]);

    const [modal, setModal] = useState(false);

    console.log("userDetail", userDetail);

    return (
        <>
            <div>
                <p className="mb-[15px] text-[20px] font-semibold">
                    상품 설명
                </p>
                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">
                    크리에이터님이 제공하는 서비스에 대해 자유롭게 설명해주세요
                </p>
                <div className="h-[500px]">
                    <Editor
                    session={profile}
                    userDetail={userDetail}
                    htmlStr={htmlStr}
                    setHtmlStr={setHtmlStr}
                    imgFiles={imgFiles}
                    setImgFiles={setImgFiles}
                    tempPaths={tempPaths}
                    setTempPaths={setTempPaths}
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
        </>
    );
}
