import { useRef, useState } from "react";
// import useInputNickname from "../profile/nickname/useInputNickname";

interface NicknameProps {
	session: any;
}

export const Nickname = (props: NicknameProps) => {
    const { session } = props;
    // const { empty, onChangeNickname } = useInputNickname(props);

    const inputNicknameRef = useRef<any>(null);
    const [ duplication, setDuplication ] = useState(false);

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

    return (
        <div>
            <p className="mb-[15px] text-[20px] font-semibold">닉네임</p>
            <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">타인에게 불쾌감을 주는 닉네임은 고객지원센터에서 임의로 변경할 수 있습니다.<br/>닉네임 변경은 2달에 1회 진행할 수 있습니다.</p>
            <div className='flex items-center sm:w-[482px] w-auto h-[47px] px-[20px] mb-[6px] rounded-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                <input type='text' className='grow h-full outline-none text-sm' placeholder='닉네임을 입력해주세요.' defaultValue={session ? session?.user.nickname : ""} ref={inputNicknameRef} onInput={(event: React.ChangeEvent<HTMLInputElement>) => {onChangeNickname(event.target.value)}}></input>
            </div>
            {empty ? <></> :
                duplication ?
                <p className="text-[14px] text-[#FF4848]">이미 사용중인 닉네임입니다.</p> :
                <p className="text-[14px] text-[#5333FF]">사용 가능한 닉네임입니다.</p>
            }
        </div>
    );
}
