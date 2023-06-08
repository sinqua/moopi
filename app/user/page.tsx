'use client';
import { useState, useRef, useEffect } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import heartImg from "@/app/assets/images/heart.svg";
import hoverHeartImg from "@/app/assets/images/hoverheart.svg";
import activeHeartImg from "@/app/assets/images/activeheart.svg";
import emptyImg from "@/app/assets/images/empty.png";

import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreateImageUrl } from "@/lib/storage";

// const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs`
const IframeUrl = `http://0.0.0.0:3000/threejs`

export default function UserPage() {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<any>(null);
    const [profileImg, setProfileImg] = useState<any>(null);
    const [nickname, setNickname] = useState("");
    const [tags, setTags] = useState<any>([]);

    const [page, setPage] = useState("설명");
    const [like, setLike] = useState(false);
    const [hover, setHover] = useState(false);
    const [modelActive, setModelActive] = useState(true);

    const normalBtn = "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
    const selectedBtn = "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";



    // Prevent the default right-click behavior
    const handleContextMenu = (event: any) => {
        event.preventDefault(); 
    };

    const {data: session, status } = useSession();
    const searchParams = useSearchParams()
    const userId = searchParams.get('id');


    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true,
    }); // Now we pass the reference to the useDraggable hook:


    const getUserProfileImage = async () => {
        await fetch('/api/user/image', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": session?.user.id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.body.profile.image) {
                CreateImageUrl(data.body.profile.image).then((url) => {
                    setProfileImg(url!.signedUrl);
                });
            }
            else {
                setProfileImg(data.body.auth.image);
            }

        });
    } 

    const getUserNickname = async () => {
        await fetch('/api/user/nickname', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": session?.user.id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setNickname(data.body.user.nickname);
        });
    }


    const getUserProfile = async () => {
        await fetch('/api/user/profile', {
            method: 'POST',
            body: JSON.stringify({
                "user_id": session?.user.id,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setUserInfo(data.body.user);
            setTags(data.body.user.tags.map((tag: any) => { return tag.tag; }));
        });
    }


    useEffect(() => {
        getUserProfileImage();
        getUserNickname();
        getUserProfile();
    }, [])

    return (
        <>
            <div className="w-full flex flex-col items-center font-sans grow" onContextMenu={handleContextMenu}>
                <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
                    <div className="md:w-[814px] md:h-[526px] h-[470px] md:rounded-[10px] rounded-none bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)] z-[1]">
                        {!modelActive ?
                            <div className="w-full h-full md:rounded-[10px] rounded-none bg-[url('./assets/images/mainModel.png')] bg-center bg-no-repeat bg-cover cursor-pointer" onClick={() => setModelActive(true)}/> : 
                            <iframe src={modelActive ? IframeUrl : ""} className="relative w-full h-full top-0 left-0 md:rounded-[10px] rounded-none" allowFullScreen/>
                        }
                    </div>
                    <div className="relative md:w-[482px] h-auto sm:p-[30px] sm:pb-[20px] p-[20px] pb-[20px] flex flex-col md:rounded-[10px] rounded-none shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
                        <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
                        <Image src={profileImg ? profileImg : emptyImg} width={100} height={100} className="h-[100px] w-[100px] rounded-full border-none" alt="" />
                            <div className="flex flex-col justify-center space-y-[25px] grow">
                                <p className="font-semibold text-[18px]">{nickname ?? ""}</p>
                                <div className="flex flex-row text-[14px] flex-wrap md:justify-between md:space-x-0 sm:space-x-[50px] space-x-[30px]">
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>포트폴리오</p><p className="font-semibold">123</p></div>
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>커미션</p><p className="font-semibold">123</p></div>
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>팔로우</p><p className="font-semibold">123</p></div>
                                </div>
                            </div>
                            <Image className="sm:h-[30px] h-[24px] sm:w-[30px] w-[24px] absolute border-none top-0 right-0 cursor-pointer" src={like ? activeHeartImg : hover ? hoverHeartImg : heartImg} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={() => setLike(!like)} alt=""/>
                        </div>
                        <div className="text-[14px] grow whitespace-pre-line leading-[25px] md:mb-0 mb-[40px]">
                            {
                                userInfo && userInfo.description
                            }
                        </div>
                        <div className="text-[14px] space-y-[20px]">
                            <div className="flex flex-row space-x-[10px] overflow-x-scroll scrollbar-hide text-[14px]" {...events} ref={ref}>
                                {tags.map((tag: any, index: any) => {
                                    return (
                                        <div className="inline-flex h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full whitespace-nowrap" key={tag}>{tag}</div>
                                    );
                                })}
                            </div>
                            {session?.user.id === userId ?
                                <div className="flex w-full h-[47px] space-x-[16px]">
                                    <div className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] cursor-pointer" onClick={() => router.push('/profile')}>프로필 수정</div>
                                    <div className="inline-flex w-full justify-center items-center rounded-[10px] border-solid border-[1px] border-[#333333] bg-[#333333] text-white cursor-pointer" onClick={() => router.push('/upload')}>게시하기</div>
                                </div>
                                :
                                <div className="relative h-[93px]">
                                    <div className="flex justify-center items-center h-[47px] bg-[#333333] rounded-[10px] text-[14px] text-white cursor-pointer">문의하기</div>
                                    <div className="absolute flex justify-center w-full bottom-[-10px]">
                                        <div className="inline-flex justify-center items-end w-[330px] h-[71px] pb-[20px] bg-slot bg-no-repeat bg-cover text-[14px] text-center align-text-bottom">
                                            <span>현재 2개의 슬롯이 남아있어요</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="md:mt-0 mt-[40px] mb-[50px] flex justify-center w-full md:w-[1312px] md:px-0 sm:px-[30px] px-[20px] font-semibold sm:text-[20px] text-[14px]">
                    <div className="w-full h-full flex justify-center border-solid border-[1px] border-[#E7E7E7]">
                        <div className={page === "설명" ? selectedBtn : normalBtn} onClick={() => setPage("설명")}>설명</div>
                        <div className={page === "포트폴리오" ? selectedBtn : normalBtn} onClick={() => setPage("포트폴리오")}>포트폴리오</div>
                        <div className={page === "가격정보" ? selectedBtn : normalBtn} onClick={() => setPage("가격정보")}>가격정보</div>
                        <div className={page === "리뷰" ? selectedBtn : normalBtn} onClick={() => setPage("리뷰")}>리뷰</div>
                    </div>
                </div>
            </div>
        </>
    );
}
