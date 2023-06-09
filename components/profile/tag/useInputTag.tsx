import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export default function useInputTag(props: any) {
    const { session, userInfo, inputTagRef, tags, setTags } = props;

    // const addTag = () => {
    //     if(inputTagRef.current.value) {
    //         if(tags.length < 5) {
    //             if(!tags.includes(inputTagRef.current.value)) {
    //                 setTags([...tags, inputTagRef.current.value]);
    //                 inputTagRef.current.value = "";
    //             }
    //             else {
    //                 alert("같은 태그는 등록할 수 없습니다.");
    //             }
    //         }
    //         else {
    //             alert("태그는 5개까지 등록할 수 있습니다.");
    //         }
    //     }
    // }

    // const removeTag = (removeIndex: number) => {
    //     setTags(tags.filter((item: any, index : any) => index !== removeIndex))
    // }

    // useEffect(() => {
    //     setTags(userInfo?.tags.map((tag: any) => { return {value: tag.tag, label: tag.tag}; }));
    // }, [userInfo]);

    return { };
}