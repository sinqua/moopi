'use client';
import { useState } from "react";

import Heart from "@/app/assets/images/heart.png";
import HoverHeart from "@/app/assets/images/hoverHeart.png";
import ActiveHeart from "@/app/assets/images/activeHeart.png";
import Image from "next/image";

const IframeUrl = "http://localhost:3000/threejs"

export default function UserPage() {
    const [page, setPage] = useState("설명");

    const [like, setLike] = useState(false);
    const [hover, setHover] = useState(false);

    const [modelActive, setModelActive] = useState(true);

    const normalBtn = "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow hover:bg-s2xyoon-gray cursor-pointer";
    const selectedBtn = "flex justify-center items-center sm:basis-1/4 sm:h-[66px] h-[45px] grow text-white bg-[#333333] cursor-pointer";


    const handleContextMenu = (event: any) => {
        event.preventDefault(); // Prevent the default right-click behavior
    };

    return (
        <>
            <div className="w-full flex flex-col items-center font-sans grow" onContextMenu={handleContextMenu}>
                <div className="flex md:flex-row flex-col justify-center w-full max-w-[1920px] sm:pt-[50px] pt-[20px] md:pb-[60px] md:space-x-[16px] md:space-y-0 sm:space-y-[40px] space-y-[30px]">
                    {/* <div className="md:w-[814px] md:h-[526px] h-[640px] rounded-[10px] bg-[url('./assets/images/mainModel.png')] bg-center bg-no-repeat bg-cover shadow-[0px_3px_10px_rgba(0,0,0,0.16)]"> */}
                    <div className="md:w-[814px] md:h-[526px] h-[640px] rounded-[10px] bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)] z-[1]">
                        {/* <MainCanvas /> */}
                        {!modelActive ?
                            <div className="w-full h-full rounded-[10px] bg-[url('./assets/images/mainModel.png')] bg-center bg-no-repeat bg-cover cursor-pointer" onClick={() => setModelActive(true)}/> : 
                            <iframe src={modelActive ? IframeUrl : ""} className="relative w-full h-full top-0 left-0" allowFullScreen/>
                        }
                    </div>
                    <div className="relative md:w-[482px] h-auto sm:pt-[30px] sm:pb-[20px] p-[20px] flex flex-col rounded-[10px] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
                        <div className="flex flex-row md:space-x-[20px] sm:space-x-[30px] space-x-[20px] mb-[30px] relative">
                            <div className="h-[100px] w-[100px] bg-gray-200 rounded-full"></div>
                            <div className="flex flex-col justify-center space-y-[25px] grow">
                                <p className="font-semibold text-[18px]">shinQua</p>
                                <div className="flex flex-row text-[14px] flex-wrap md:justify-between md:space-x-0 sm:space-x-[50px] space-x-[30px]">
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>포트폴리오</p><p className="font-semibold">123</p></div>
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>커미션</p><p className="font-semibold">123</p></div>
                                    <div className="flex sm:flex-row flex-col items-center sm:space-x-[10px]"><p>팔로우</p><p className="font-semibold">123</p></div>
                                </div>
                            </div>
                            <Image className="sm:h-[30px] h-[24px] sm:w-[30px] w-[24px] absolute border-none top-0 right-0 cursor-pointer" src={like ? ActiveHeart : hover ? HoverHeart : Heart} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)} onClick={() => setLike(!like)} alt=""/>
                        </div>
                        <div className="md:h-[158px] h-auto text-[14px] mb-[40px] leading-[25px]">
                            <p>강원도의 자랑, 영월의 아들, 한반도면 골목대장 신규화입니다.</p>
                            <p>🚩 Unity, Blender, VRC  Expert</p>
                            <p>🚩 TFT Platinum, League of Legend Iron 계정 보유중</p>
                            <p>🚩 짐볼 판매중</p>
                            <p>🚩 맞짱 신청은 정중하게 DM으로 부탁드립니다🙏🙏🙏🙏</p>
                        </div>
                        <div className="flex flex-row space-x-[10px] justify-end mb-[20px] text-[14px]">
                            <div className="h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full">VRC</div>
                            <div className="h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full">blender</div>
                            <div className="h-[35px] px-[22px] py-[8px] bg-[#E9E9E9] rounded-full">이세계아이돌</div>
                        </div>
                        <div className="relative h-[93px]">
                            <div className="flex justify-center items-center h-[47px] bg-[#333333] rounded-[10px] text-[14px] text-white cursor-pointer">문의하기</div>
                            <div className="absolute flex justify-center w-full bottom-[-10px]">
                                <div className="inline-flex justify-center items-end sm:w-[368px] w-[296px] h-[71px] pb-[20px] sm:bg-[url('./assets/images/slotLg.png')] bg-[url('./assets/images/slotSm.png')] text-[14px] text-center align-text-bottom">
                                    <span>현재 2개의 슬롯이 남아있어요</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {/* <div className="h-[100px] w-screen border-y-[1px] border-s2xyoon-gray"></div> */}
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
