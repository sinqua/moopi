import { useEffect, useRef, useState } from "react";
import useInputTag from "./useInputTag";
import Image from "next/image";

import cancelImg from "@/app/assets/images/cancel_gray.svg";
import useDrag from "@/app/hooks/dragHook";

interface TagProps {
	session: any;
    userInfo: any;
    inputTagRef: any;
    tags: any;
    setTags: any;
}

export const Tag = (props: TagProps) => {
    const { session, userInfo, inputTagRef, tags, setTags } = props;
    const { dragRef, dragEvents } = useDrag();

    const { addTag, removeTag } = useInputTag(props);

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold">태그</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)</p>
            <div className="flex sm:space-x-[20px] space-x-0 mb-[20px]">
                <div className='flex items-center sm:w-[482px] sm:grow-0 grow h-[47px] px-[20px] sm:rounded-[10px] rounded-l-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                    <input type='text' ref={inputTagRef} className='grow h-full outline-none text-sm' placeholder='태그를 입력해주세요.'></input>
                </div>
                <div className="flex justify-center items-center w-[98px] h-[47px] sm:rounded-[10px] rounded-r-[10px] bg-[#333333] text-white cursor-pointer" onClick={addTag}>추가</div>
            </div>
            <div className="flex space-x-[10px] overflow-x-scroll scrollbar-hide" {...dragEvents} ref={dragRef}>
                {tags?.map((tag: any, index: any) => {
                    return (
                        <div className="inline-flex items-center h-[35px] px-[22px] py-[8px] space-x-[10px] bg-[#E9E9E9] rounded-full whitespace-nowrap" key={tag}>
                            <span>{tag}</span>
                            <Image
                                className="w-[10px] h-[10px] cursor-pointer"
                                src={cancelImg}
                                alt=""
                                onClick={() => removeTag(index)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
