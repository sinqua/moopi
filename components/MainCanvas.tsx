"use client";

import Image from "next/image";

import { lazy, useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from '@react-three/fiber'
import { Circle, CameraControls, useGLTF } from '@react-three/drei'
import { Color } from "three/src/math/Color.js";

import ResetBtn from '../app/assets/images/resetBtn.png';
import HelpBtn from '../app/assets/images/helpBtn.png';
import VRBtn from '../app/assets/images/vrBtn.png';
import FullScreenBtn from '../app/assets/images/fullscreenBtn.png';
import { ModelProps } from "./Model";

const ModelComponent = lazy(() => import('./Model'));

export default function MainCanvas() {

    const [modelInfo, setModelInfo] = useState<ModelProps>();

    useEffect(() => {
        setModelInfo({
            modelUrl: "http://localhost:3000/s2xyoon.vrm"
        })
    }, []);


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
            document.documentElement.requestFullscreen()
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
        }
    }

    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0.25, 0.5, 1]}} style={{backgroundColor: '#FAF9F6'}} shadows  >
                <group position-y={-0.8}>
                    <CameraControls
                        ref={cameraControlsRef}
                        maxDistance={5}
                    />

                    <directionalLight position={[3.3, 1.0, 4.4]} castShadow />

                    <ModelComponent {...modelInfo!}/>

                    <Circle args={[0.5]} rotation-x={-Math.PI / 2} receiveShadow renderOrder={2}>
                        <shaderMaterial attach="material" args={[gradientShader]} />
                    </Circle>
                </group>
            </Canvas>
            <div className="absolute flex flex-row bottom-0 right-0 space-x-[20px] p-[20px]">
                <Image className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] cursor-pointer" src={ResetBtn} onClick={resetCamera} alt=""/>
                <Image className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] cursor-pointer" src={HelpBtn} alt=""/>
                <Image className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] cursor-pointer" src={VRBtn} alt=""/>
                <Image className="sm:w-[25px] sm:h-[25px] w-[20px] h-[20px] cursor-pointer" src={FullScreenBtn} onClick={postMessage} alt=""/>
            </div>
        </div>
    );
}