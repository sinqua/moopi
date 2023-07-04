"use client";
import { useRef, useState } from "react";
import Image from "next/image";

import cancelBlackImg from "@/app/assets/images/cancel_black.svg";
import cameraFillImg from "@/app/assets/images/camera_fill.svg";
import playImg from "@/app/assets/images/play.svg";
import { useSession } from "next-auth/react";

interface CameraProps {
  cameraActive: any;
  setCameraActive: any;
  resetCamera: any;
  canvasRef: any;
  setThumbnailImage: any;
}

export default function Camera(props: CameraProps) {
  const { cameraActive, setCameraActive, resetCamera, canvasRef, setThumbnailImage } = props;
  
  const [modalActive, setModalActive] = useState(false);

  const [thumbnailUrl, setThumbnailUrl] = useState<any>(null);

  const { data: session, status, update } = useSession();

  function takeCaputre() {
    const canvas = canvasRef.current;

    // Check if the canvas element is available
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Create a new canvas for the cropped image
    const croppedCanvas = document.createElement("canvas");
    const croppedContext = croppedCanvas.getContext("2d");

    // Define the cropping dimensions
    const cropX = Math.floor(canvas.width / 2 - (canvas.height * 0.625) / 2); // Starting x-coordinate of the crop area
    const cropY = 0; // Starting y-coordinate of the crop area
    const cropWidth = Math.floor(canvas.height * 0.625); // Width of the crop area
    const cropHeight = canvas.height; // Height of the crop area

    // Set the dimensions of the cropped canvas
    croppedCanvas.width = cropWidth;
    croppedCanvas.height = cropHeight;

    const saveCanvas = document.createElement("canvas");
    const saveContext = saveCanvas.getContext("2d");
    saveCanvas.width = 800;
    saveCanvas.height = 1280;

    // Draw the cropped image onto the new canvas
    croppedContext!.drawImage(
      canvas,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    saveContext!.drawImage(
      croppedCanvas,
      0,
      0,
      croppedCanvas.width,
      croppedCanvas.height,
      0,
      0,
      saveCanvas.width,
      saveCanvas.height
    );

    // // Get the data URL of the cropped image
    // const croppedImageURL = croppedCanvas.toDataURL();

    setThumbnailUrl(saveCanvas.toDataURL());
  }

  function saveImage() {
    setThumbnailImage(thumbnailUrl)
    setModalActive(false);
    setCameraActive(false);
  }

  return (
    <>
      <div className="absolute flex justify-center top-0 w-full h-full pointer-events-none z-[999]">
        {cameraActive && (
          <div className="absolute flex justify-center w-full h-full top-0 right-0">
            <div className="h-full grow bg-[#00000050]"></div>
            <div className="relative flex flex-col justify-end items-center sm:w-auto w-full sm:h-full h-auto aspect-[10/16] grow-0 opacity-100">
              <div className="absolute w-full h-full top-0 right-0">
                <div className="flex justify-evenly w-full h-full">
                  <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
                  <div className="w-[1px] h-full bg-[#B2B2B2]"></div>
                </div>
              </div>
              <div className="absolute w-full h-full top-0 right-0">
                <div className="flex flex-col justify-evenly w-full h-full">
                  <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
                  <div className="w-full h-[1px] bg-[#B2B2B2]"></div>
                </div>
              </div>
              <div className="flex mb-[30px] space-x-[30px] pointer-events-auto z-0">
                <div
                  className="flex justify-center items-center w-[50px] h-[50px] bg-white rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                  onClick={() => {
                    setCameraActive(false);
                    resetCamera();
                  }}
                >
                  <Image
                    className="w-[26px] h-[26px]"
                    src={cancelBlackImg}
                    alt=""
                  />
                </div>
                <div
                  className="flex justify-center items-center w-[50px] h-[50px] bg-[#333333] rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
                  onClick={() => {
                    setModalActive(true);
                    takeCaputre();
                  }}
                >
                  <Image
                    className="w-[26px] h-[26px]"
                    src={cameraFillImg}
                    alt=""
                  />
                </div>
                <div className="flex justify-center items-center w-[50px] h-[50px] bg-white rounded-full shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer">
                  <Image
                    className="w-[20px] h-[20px] ml-[2px]"
                    src={playImg}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="h-full grow bg-[#00000050]"></div>
            {modalActive && (
              <div className="absolute flex justify-center items-center w-full h-full pointer-events-auto bg-[#00000050]">
                <div className="flex flex-col sm:w-[400px] w-[274px] h-auto bg-white rounded-[10px]">
                  <div className="flex flex-col justify-center items-center grow space-y-[35px] box-border px-[20px] py-[30px]">
                    <div className="flex flex-col justify-center space-y-[15px]">
                      <p className="text-[16px] font-semibold text-center">
                        사진을 저장하시겠습니까?
                      </p>
                      <p className="text-[#7B7B7B] text-center">
                        게시물의 썸네일으로 게시됩니다.
                      </p>
                    </div>
                    <div className="relative w-full aspect-[10/16] bg-gray-200">
                      <Image
                        className="w-full h-full"
                        src={thumbnailUrl ? thumbnailUrl : playImg}
                        fill={true}
                        style={{ objectFit: "contain" }}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex border-solid border-t-[1px] border-[#DFDFDF]">
                    <div className="flex justify-center basis-1/2 py-[20px] text-[#2778C7] cursor-pointer" onClick={saveImage}>
                      저장
                    </div>
                    <div
                      className="flex justify-center basis-1/2 py-[20px] text-[#7B7B7B] border-solid border-l-[1px] border-[#DFDFDF] cursor-pointer"
                      onClick={() => setModalActive(false)}
                    >
                      취소
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
