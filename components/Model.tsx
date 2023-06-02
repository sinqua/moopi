"use client";

import * as THREE from "three";
import { FC, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "../utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";

export interface ModelProps {
    animationUrl?: string;
    modelUrl: string;
    setProgress: (done: boolean) => void
}

const Model: FC<ModelProps> = ({
    animationUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/Thankful.fbx`,
    modelUrl ,
    setProgress
}) => {

    const [vrm, setVrm] = useState<VRM>(null!);

    const animationMixer = useMemo<THREE.AnimationMixer>(() => {
        if (!vrm) return null!;

        const mixer = new THREE.AnimationMixer(vrm.scene);
    
        LoadMixamoAnimation(animationUrl, vrm).then((clip) => {
          mixer.clipAction(clip).play();
        });
    
        return mixer;
    }, [animationUrl, vrm]);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.crossOrigin = "anonymous";

        loader.register((parser) => {
            return new VRMLoaderPlugin(parser);
        });

        loader.load(modelUrl, (gltf) => {
            setProgress(true);

            const vrm = gltf.userData.vrm;
            setVrm(vrm);
        },
        (progress) => {},
        (error) => console.log("Error loading model", error));
    }, [modelUrl]);

    useFrame((state, delta) => {
        animationMixer?.update(delta);
        vrm?.update(delta);
    });

    const Box = () => {
        const boxRef = useRef<any>();
      
        useFrame(() => {
          boxRef.current.rotation.x += 0.01;
          boxRef.current.rotation.y += 0.01;
        });
      
        return (
          <mesh ref={boxRef} rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
            <boxBufferGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={"red"} />
          </mesh>
        );
    };

    return (
        <>
            {vrm &&
                (<primitive 
                object={vrm.scene}
                rotation={[0, 135, 0]}
                children-0-castShadow
            /> )
            }
        </>
    )
}

export default Model;