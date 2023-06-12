'use client';
import { useSession } from "next-auth/react";
import useProfileHook from "./hook";

import { Navbar } from "@/components/profile/navbar";
import { ProfileImage } from "@/components/profile/profileImage";
import { Nickname } from "@/components/profile/nickname";
import { Description } from "@/components/profile/description";
import { Tag } from "@/components/profile/tag";
// import Editor from "@/components/editor";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ReactSlider from "react-slider";

import { Slider } from "@material-tailwind/react";
import { Stepper, Step, Button } from "@material-tailwind/react";


const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

export default function ProfilePage() {
    const { userInfo, setUserInfo, userDetail, setUserDetail, page, setPage, imgFile, setImgFile, imgFiles, setImgFiles, tempPaths, setTempPaths, duplication, setDuplication, tags, setTags, inputNicknameRef, inputDescriptionRef, htmlStr, setHtmlStr, onSaveProfileCard, onSaveDescription } = useProfileHook();
    const {data: session, status, update} = useSession();

    // ref
    const viewContainerRef = useRef<HTMLDivElement>(null);

    // // useEffect
    // useEffect(() => {
    //     if(viewContainerRef.current) {
    //         viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>'
    //         viewContainerRef.current.innerHTML += htmlStr;
    //     }
    // }, [htmlStr])


    const [activeStep, setActiveStep] = useState<any>(0);
    const [isLastStep, setIsLastStep] = useState<any>(false);
    const [isFirstStep, setIsFirstStep] = useState<any>(false);
    const handleNext = () => !isLastStep && setActiveStep((cur: any) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur: any) => cur - 1);
   
    const [sliderValue, setSliderValue] = useState<any>(0);

    return (
        <div className="w-full flex flex-col items-center font-sans grow md:px-0 px-[30px] sm:pt-[50px] pt-[20px] sm:pb-[80px] pb-[50px] text-[#333333] text-[14px]">
            <div className="flex flex-col w-full max-w-[1312px] space-y-[60px]">
                <Navbar page={page} setPage={setPage} />
                <div className="flex flex-col w-full max-w-[1312px] sm:p-[50px] p-0 sm:space-y-[80px] space-y-[60px] rounded-[10px] sm:border-solid border-none border-[1px] border-[#CCCCCC]">
                    {
                        page === "프로필 카드" &&
                        <>
                            <ProfileImage session={session} imgFile={imgFile} setImgFile={setImgFile}/>
                            <Nickname session={session} inputNicknameRef={inputNicknameRef} duplication={duplication} setDuplication={setDuplication} />
                            <Description session={session} userInfo={userInfo} inputDescriptionRef={inputDescriptionRef} />
                            <Tag session={session} userInfo={userInfo} tags={tags} setTags={setTags} />
                            <div>
                                <p className="mb-[15px] text-[20px] font-semibold">슬롯</p>
                                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">한번에 작업하실 수 있는 작업량을 설정해요.</p>
                                {/* <ReactSlider
                                    className="w-full max-w-[500px] h-[50px] border-solid border-[1px] border-gray-500"
                                    thumbClassName="font-[14px] text-center bg-black text-white cursor-pointer border-solid border-[5px] border-gray-500"
                                    trackClassName="relative bg-[#dddddd] h-[50px]"
                                    renderThumb={(props, state) => <div {...props} key={state.index}>{state.valueNow}</div>}
                                /> */}
                                {/* <div className="w-[500px]">
                                    <Stepper
                                        activeStep={activeStep}
                                        isLastStep={(value: any) => setIsLastStep(value)}
                                        isFirstStep={(value: any) => setIsFirstStep(value)}
                                    >
                                        <Step onClick={() => setActiveStep(0)}>1</Step>
                                        <Step onClick={() => setActiveStep(1)}>2</Step>
                                        <Step onClick={() => setActiveStep(2)}>3</Step>
                                    </Stepper>                                
                                </div> */}
                                <div className="w-[400px]">
                                    {/* <Slider defaultValue={50} step={1} onChange={(e) => console.log(e.target.value)} min={0} max={5} /> */}
                                    {/* <input type="range" min={0} max={4} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range range-lg dark:bg-gray-700"/> */}
                                    <input type="range" min={0} max={4} value={sliderValue} onChange={(e) => setSliderValue(e.target.value)} className="w-full bg-transparent [&::-webkit-slider-runnable-track]:h-[5px] [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[24px] [&::-webkit-slider-thumb]:w-[24px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[#2778C7] [&::-webkit-slider-thumb]:cursor-pointer" />
                                </div>
                                {/* <div className="w-full py-4 px-8 bg-pink-50">
                                    <Stepper
                                        activeStep={activeStep}
                                        isLastStep={(value) => setIsLastStep(value)}
                                        isFirstStep={(value) => setIsFirstStep(value)}
                                    >
                                        <Step onClick={() => setActiveStep(0)}>1</Step>
                                        <Step onClick={() => setActiveStep(1)}>2</Step>
                                        <Step onClick={() => setActiveStep(2)}>3</Step>
                                    </Stepper>
                                    <div className="mt-16 flex justify-between">
                                        <Button onClick={handlePrev} disabled={isFirstStep}>
                                        Prev
                                        </Button>
                                        <Button onClick={handleNext} disabled={isLastStep}>
                                        Next
                                        </Button>
                                    </div>
                                </div> */}
                                
                            </div>
                            <div className="flex justify-center pt-[40px] space-x-[15px]">
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveProfileCard}>저장하기</div>
                            </div>
                        </>
                    }
                    {
                        page === "설명" &&
                        <>
                            <div>
                                <p className="mb-[15px] text-[20px] font-semibold">상품 설명</p>
                                <p className="mb-[30px] text-[#7B7B7B] leading-[25px]">크리에이터님이 제공하는 서비스에  대해 자유롭게 설명해주세요</p>
                                <div className="h-[500px]">
                                    <Editor session={session} userDetail={userDetail} htmlStr={htmlStr} setHtmlStr={setHtmlStr} imgFiles={imgFiles} setImgFiles={setImgFiles} tempPaths={tempPaths} setTempPaths={setTempPaths} />
                                </div>
                            </div>
                            <div className="flex justify-center pt-[40px] space-x-[15px]">
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-white border-solid border-[1px] border-[#333333] cursor-pointer">미리보기</div>
                                <div className="flex justify-center items-center w-[203px] h-[47px] rounded-[10px] bg-[#333333] text-white cursor-pointer" onClick={onSaveDescription}>저장하기</div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}