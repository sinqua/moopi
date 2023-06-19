import { useEffect, useRef, useState } from "react";

interface DescriptionProps {
	session: any;
    profile: any;
}

export const Description = (props: DescriptionProps) => {
    const { session, profile } = props;

    const inputDescriptionRef = useRef<any>(null);
    const [textareaCount, setTextareaCount] = useState(0);

    useEffect(() => {
        inputDescriptionRef.current.value = profile ? profile.description : "";
        setTextareaCount(inputDescriptionRef.current.value.length);
    }, [profile]);

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold">자기소개</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">매력적인 문구로 회원님을 소개해주세요.</p>
            <div className="relative sm:w-min w-full">
                <textarea ref={inputDescriptionRef} className="sm:w-[482px] w-full h-[260px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC]" placeholder="자기소개를 입력해주세요." onChange={() => setTextareaCount(inputDescriptionRef.current.value.length)} />
                <span className="absolute bottom-[20px] sm:right-[30px] right-[20px] text-[#7B7B7B]">{textareaCount} / 200</span>
            </div>
        </div>
    );
}
