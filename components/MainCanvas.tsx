"use client";

import Image from "next/image";

import { lazy, useEffect, useRef, useState, FC } from "react";
import { Canvas, useLoader } from '@react-three/fiber'
import { Circle, CameraControls, useGLTF } from '@react-three/drei'
import { Color } from "three/src/math/Color.js";


import cancelImg from '@/app/assets/images/cancel.svg';
import rotateImg from '@/app/assets/images/rotate.svg';
import zoomImg from '@/app/assets/images/zoom.svg';
import moveImg from '@/app/assets/images/move.svg';

import refreshImg from '@/app/assets/images/refresh.svg';
import helpImg from '@/app/assets/images/help.svg';
import descriptionImg from '@/app/assets/images/description.svg';
import fullscreenImg from '@/app/assets/images/fullscreen.svg';
import originalscreenImg from '@/app/assets/images/originalscreen.svg';
import powerImg from '@/app/assets/images/power.svg';

const ModelComponent = lazy(() => import('./Model'));

interface MainCanvasProps {
    userId: string;
    filename: string;
}

const MainCanvas : FC<MainCanvasProps> = ({ userId, filename }) => {

    const [modelInfo, setModelInfo] = useState<ModelProps>();

    useEffect(() => {
        CreateModelUrl(userId, filename)
            .then((url) => {
                setModelInfo({ modelUrl: url!.signedUrl })
            })

    }, []);

    const isMobile = () => ('ontouchstart' in document.documentElement);

    // Prevent the default right-click behavior
    const handleContextMenu = (event: any) => {
        event.preventDefault(); 
    };

    const gradientShader = {
        uniforms: {
          color1: { value: new Color('#B2B2B2') }, // Start color
          color2: { value: new Color('#FAF9F6') }, // End color
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            void main() {
                vec2 center = vec2(0.5, 0.5);
                float dist = distance(vUv, center);
                float alpha = 1.23 - dist; // Calculate alpha value based on distance
                gl_FragColor = vec4(mix(color1, color2, dist), alpha);
              }
        `,
    };

    const cameraControlsRef = useRef<CameraControls>(null);

    const resetCamera = () => {
        cameraControlsRef.current?.reset(true);
    };

    const postMessage = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setFullScreen(false);
            }
        }
    }

    return (
        <div className="relative w-full h-full overflow-hidden" onContextMenu={handleContextMenu}>
            { helpViewer ?
                <div className="absolute flex justify-center items-center w-full h-full top-0 left-0 select-none bg-[#00000080] z-10">
                    <Image className="absolute top-[20px] right-[20px] w-[28px] h-[28px] cursor-pointer" src={cancelImg} alt="" onClick={() => setHelpViewer(false)}/>
                    <div className="flex mc_sm:flex-row flex-col mc_sm:space-x-[60px] space-x-0 mc_sm:space-y-0 space-y-[48px] text-white text-center">
                        <div className="flex flex-col items-center">
                            <Image className="mc_sm:w-[80px] w-[60px] mc_sm:h-[80px] h-[60px] mb-[20px] pointer-events-none" src={rotateImg} alt=""/>
                            <p className="text-[18px] font-semibold mb-[10px]">회전</p>
                            { isMobile() ?
                                <p className="text-[14px]">한 손가락으로 드래그</p> :
                                <p className="text-[14px]">마우스 좌클릭 후 드래그</p>
                            }
                        </div>
                        <div className="flex flex-col items-center">
                            <Image className="mc_sm:w-[80px] w-[60px] mc_sm:h-[80px] h-[60px] mb-[20px] pointer-events-none" src={zoomImg} alt=""/>
                            <p className="text-[18px] font-semibold mb-[10px]">확대</p>
                            { isMobile() ?
                                <p className="text-[14px]">두 손가락을 동시에<br/>바깥/안쪽으로 드래그</p> :
                                <p className="text-[14px]">마우스 스크롤</p>
                            }
                        </div>
                        <div className="flex flex-col items-center">
                            <Image className="mc_sm:w-[80px] w-[60px] mc_sm:h-[80px] h-[60px] mb-[20px] pointer-events-none" src={moveImg} alt=""/>
                            <p className="text-[18px] font-semibold mb-[10px]">이동</p>
                            { isMobile() ?
                                <p className="text-[14px]">두 손가락으로 드래그</p> :
                                <p className="text-[14px]">마우스 우클릭 후 드래그</p>
                            }
                        </div>
                    </div>
                </div> : <></>
            }
            <Canvas camera={{ position: [0.25, 0.5, 1]}} style={{backgroundColor: '#FAF9F6'}} shadows  >
                <group position-y={-0.8}>
                    <CameraControls
                        ref={cameraControlsRef}
                        maxDistance={5}
                    />

                    <directionalLight position={[3.3, 1.0, 4.4]} castShadow />

                    {modelInfo && <ModelComponent {...modelInfo!}/>}

                    <Circle args={[0.5]} rotation-x={-Math.PI / 2} receiveShadow renderOrder={2}>
                        <shaderMaterial attach="material" args={[gradientShader]} />
                    </Circle>
                </group>
            </Canvas>
            <div className="absolute flex flex-row bottom-0 right-0 space-x-[20px] px-[30px] py-[20px]">
                <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer" onClick={resetCamera}>
                    <Image className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" src={refreshImg} alt=""/>
                </div>
                <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer" onClick={(() => setHelpViewer(true))}>
                    <Image className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" src={helpImg} alt=""/>
                </div>
                <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer" onClick={resetCamera}>
                    <Image className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" src={descriptionImg} alt=""/>
                </div>
                <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer" onClick={postMessage}>
                    <Image className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" src={fullScreen ? originalscreenImg : fullscreenImg} alt=""/>
                </div>
                <div className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer" onClick={resetCamera}>
                    <Image className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]" src={powerImg} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default MainCanvas;