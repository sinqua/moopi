import { useEffect, useRef, useState } from "react";

export default function useInputDescription(props: any) {
    const { session, userInfo, inputDescriptionRef } = props;
    const [textareaCount, setTextareaCount] = useState(0);

    useEffect(() => {
        inputDescriptionRef.current.value = userInfo ? userInfo.description : "";
        setTextareaCount(inputDescriptionRef.current.value.length);

    }, [userInfo]);

    return { textareaCount, setTextareaCount };
}