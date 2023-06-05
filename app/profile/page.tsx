'use client';
import { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { UploadModel } from "@/lib/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image";

import cancelImg from "@/app/assets/images/cancel_gray.svg";
import faceImg from "@/app/assets/images/face.png";


export default function ProfilePage() {
    const router = useRouter();
    const [page, setPage] = useState("프로필 카드");

    const inputNicknameRef = useRef<any>(null);

    const textareaRef = useRef<any>(null);
    const [textareaCount, setTextareaCount] = useState(0);

    const inputTagRef = useRef<any>(null);

    const [tags, setTags] = useState<any>([]);

    const [ empty, setEmpty ] = useState(true);
    const [ duplication, setDuplication ] = useState(false);

    const [imgFile, setImgFile] = useState<any>(null);
    const [imgUrl, setImgUrl] = useState<any>(null);
    const imgRef = useRef<any>();

    const {data: session, status, update} = useSession();

    const loadImgFile = () => {
        const file = imgRef.current.files[0];
        setImgFile(imgRef.current.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgUrl(reader.result);
        };
    };

    // draggable
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
      }); // Now we pass the reference to the useDraggable hook:


    // 닉네임 중복 확인
    const onChangeNickname = async (nickname: string) => {
        setEmpty(nickname.length === 0 ? true : false);

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


    // 태그 관련
    const addTag = () => {
        if(inputTagRef.current.value) {
            if(tags.length < 5) {
                if(!tags.includes(inputTagRef.current.value)) {
                    setTags([...tags, inputTagRef.current.value]);
                    inputTagRef.current.value = "";
                }
                else {
                    alert("같은 태그는 등록할 수 없습니다.");
                }
            }
            else {
                alert("태그는 5개까지 등록할 수 있습니다.");
            }
        }
    }

    const removeTag = (removeIndex: number) => {
        setTags(tags.filter((item: any, index : any) => index !== removeIndex))
    }

    const onSubmit = async () => {
        if(status !== "loading") {
            if(!duplication) {
                UploadModel(session?.user.id, imgFile.name, imgFile).then(async (data) => {
                    await fetch('/api/profile/image', {
                        method: 'POST',
                        body: JSON.stringify({
                            "user_id": session?.user.id,
                            "image": data?.path
                        })
                    })
                    .then((res) => res.json())
                    .then((data) => {
    
                    });
                });


                await fetch('/api/profile/nickname', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": session?.user.id,
                        "nickname": inputNicknameRef.current.value
                    })
                })
                .then((res) => res.json())
                .then((data) => {

                });

                await fetch('/api/profile/description', {
                    method: 'POST',
                    body: JSON.stringify({
                        "user_id": session?.user.id,
                        "description": textareaRef.current.value
                    })
                })
                .then((res) => res.json())
                .then(async (profile) => {
                    await fetch('/api/profile/tag/delete', {
                        method: 'POST',
                        body: JSON.stringify({
                            "profile_id": profile.body.profile.id,
                        })
                    })
                    .then((res) => res.json())
                    .then(async (data) => {
                        await fetch('/api/profile/tag', {
                            method: 'POST',
                            body: JSON.stringify({
                                "profile_id": profile.body.profile.id,
                                "tags": tags
                            })
                        })
                        .then((res) => res.json())
                        .then((data) => {
                            router.push(`/user?id=${session?.user.id}`)
                        });
                    });
                });
            }
            else {
                alert("이미 사용중인 닉네임입니다.");
            }
        }
    }

    return (
        <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] text-[#333333] text-[14px]">
            <div className="flex flex-col w-full max-w-[1312px] space-y-[60px]">
                <div className="w-full flex flex-col items-start sm:space-y-[30px] space-y-[20px]">
                    <p className="sm:text-[30px] text-[20px] font-bold">프로필 수정</p>
                    <div className="relative flex w-full h-[30px] sm:space-x-[70px] space-x-[20px] sm:text-[18px] text-[14px] whitespace-nowrap overflow-x-scroll scrollbar-hide" {...events} ref={ref}>
                        <div className={page === "프로필 카드" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("프로필 카드")}>프로필 카드</div>
                        <div className={page === "설명" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("설명")}>설명</div>
                        <div className={page === "포트폴리오" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("포트폴리오")}>포트폴리오</div>
                        <div className={page === "가격정보" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("가격정보")}>가격정보</div>
                        <div className={page === "결제수단" ? "font-semibold underline underline-offset-8 decoration-2 cursor-pointer" : "cursor-pointer"} onClick={() => setPage("결제수단")}>결제수단</div>
                    </div>
                </div>

                <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 sm:space-y-[80px] space-y-[60px] rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
                    <div>
                        <p className="mb-[15px] text-[20px] font-semibold">프로필 사진</p>
                        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">최소 200 x 200 크기의 JPEG 또는 PNG 파일을 사용해주세요.<br/>타인에게 불쾌감을 주는 프로필 사진은 고객지원센터에서 임의로 변경할 수 있습니다.</p>
                        <div className="flex  items-center space-x-[40px]">
                            <Image src={imgUrl ? imgUrl : faceImg} width={160} height={160} className="sm:h-[160px] h-[100px] sm:w-[160px] w-[100px] bg-gray-200 rounded-full border-none" alt="" />
                            {/* <div className="flex justify-center items-center w-[144px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer">프로필 변경</div> */}
                            <form>
                                <label className="flex justify-center items-center w-[144px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" htmlFor="profileImg">프로필 변경</label>
                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    id="profileImg"
                                    onChange={loadImgFile}
                                    ref={imgRef}
                                />
                            </form>
                        </div>
                    </div>
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
                    <div>
                        <p className="mb-[15px] text-[20px] font-semibold">자기소개</p>
                        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">매력적인 문구로 회원님을 소개해주세요.</p>
                        <div className="relative sm:w-min w-full">
                            <textarea ref={textareaRef} className="sm:w-[482px] w-full h-[260px] sm:p-[30px] p-[20px] rounded-[10px] resize-none bg-white border-solid border-[1px] border-[#CCCCCC]" placeholder="자기소개를 입력해주세요." onChange={() => setTextareaCount(textareaRef.current.value.length)} />
                            <span className="absolute bottom-[20px] sm:right-[30px] right-[20px] text-[#7B7B7B]">{textareaCount} / 200</span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-[15px] text-[20px] font-semibold">태그</p>
                        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">한 눈에 알아보기 쉽도록 태그를 추가해보아요. (최대 5개)</p>
                        <div className="flex sm:space-x-[20px] space-x-0 mb-[20px]">
                            <div className='flex items-center sm:w-[482px] sm:grow-0 grow h-[47px] px-[20px] sm:rounded-[10px] rounded-l-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                                <input type='text' ref={inputTagRef} className='grow h-full outline-none text-sm' placeholder='태그를 입력해주세요.'></input>
                            </div>
                            <div className="flex justify-center items-center w-[98px] h-[47px] sm:rounded-[10px] rounded-r-[10px] bg-[#333333] text-white cursor-pointer" onClick={addTag}>추가</div>
                        </div>
                        <div className="flex space-x-[10px] overflow-x-scroll scrollbar-hide" {...events} ref={ref}>
                            {tags.map((tag: any, index: any) => {
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
                    <div>
                        <p className="mb-[15px] text-[20px] font-semibold">대표 아바타</p>
                        <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">프로필 페이지에서 보여줄 아바타 파일을 업로드 합니다.<br/>50mb 이하의 vrm 파일을 사용해주세요.<br/>썸네일은 1000 x 1000 이상의 JPEG 또는 PNG 파일을 권장합니다.</p>
                        <p className="mb-[20px] text-[18px] font-semibold">아바타</p>
                        <div className="flex sm:space-x-[20px] space-x-0 mb-[30px]">
                            <div className='flex items-center sm:w-[482px] sm:grow-0 grow h-[47px] px-[20px] sm:rounded-[10px] rounded-l-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                                <input type='text' className='grow h-full outline-none text-sm' placeholder='파일 이름'></input>
                            </div>
                            <div className="flex justify-center items-center sm:w-[158px] w-[128px] h-[47px] sm:rounded-[10px] rounded-r-[10px] bg-[#333333] text-white cursor-pointer">파일 불러오기</div>
                        </div>
                        <p className="mb-[20px] text-[18px] font-semibold">썸네일</p>
                        <div className="flex sm:space-x-[20px] space-x-0">
                            <div className='flex items-center sm:w-[482px] sm:grow-0 grow h-[47px] px-[20px] sm:rounded-[10px] rounded-l-[10px] bg-white border-solid border-[1px] border-[#CCCCCC]'>
                                <input type='text' className='grow h-full outline-none text-sm' placeholder='파일 이름'></input>
                            </div>
                            <div className="flex justify-center items-center sm:w-[158px] w-[128px] h-[47px] sm:rounded-[10px] rounded-r-[10px] bg-[#333333] text-white cursor-pointer">파일 불러오기</div>
                        </div>
                    </div>
                    <div className="flex justify-center pt-[40px] space-x-[15px]">
                        <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                        <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSubmit}>저장하기</div>

                    </div>
                </div>
            </div>
        </div>
    )
}