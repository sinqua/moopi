import { useEffect, useRef, useState } from "react";
import useInputTag from "./useInputTag";
import Image from "next/image";

import cancelImg from "@/app/assets/images/cancel_gray.svg";
import useDrag from "@/app/hooks/dragHook";


import CreatableSelect from 'react-select/creatable';


interface TagProps {
	session: any;
    userInfo: any;
    tags: any;
    setTags: any;
}

export const Tag = (props: TagProps) => {
    const { session, userInfo, tags, setTags } = props;

    // const { removeTag } = useInputTag(props);

    const options = [
        { value: "VRM", label: "VRM" },
        { value: "이세계아이돌", label: "이세계아이돌" },
        { value: "Blender", label: "Blender" }
    ]

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold" onClick={() => console.log(tags.map((tag:any) => {return tag.value}))}>태그</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">한 눈에 알아보기 쉽도록 태그를 추가해보아요</p>
            <div className="mb-[20px]">
                <CreatableSelect isMulti options={options} value={tags} instanceId={""} onChange={(e: any) => {setTags(e)}} className='flex w-full items-center sm:w-[482px] h-[47px]' placeholder={"태그를 입력해주세요"} styles={{control: (baseStyles, state) => ({ ...baseStyles, height: '100%', width: '100%' })}}/>
            </div>
        </div>
    );
}