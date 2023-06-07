import { useRef, useState } from "react";

export default function useInputNickname(props: any) {
    const { session, inputNicknameRef, duplication, setDuplication } = props;

    const [ empty, setEmpty ] = useState(true);

    // 닉네임 중복 확인
    const onChangeNickname = async (nickname: string) => {
        setEmpty(nickname.length === 0 ? true : false);

        if(nickname === session?.user.nickname) {
            setDuplication(false)
        }
        else {
            await fetch('/api/join/duplicate', {
                method: 'POST',
                body: JSON.stringify({
                    "nickname": nickname
                })
            })
            .then((res) => res.json())
            .then((data) => {
                setDuplication(data.body.result);
            });
        }
    }

    return { empty, duplication, onChangeNickname };
}