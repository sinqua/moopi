"use client";

import * as THREE from "three";
import { useEffect, useImperativeHandle, useMemo, useState } from "react";
import { VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "../utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame } from "@react-three/fiber";

const Model = () => {
    const animationUrl = "http://localhost:3000/HipHopDancing.fbx";
    const url = "http://localhost:3000/s2xyoon.vrm";
    const [vrm, setVrm] = useState<VRM>(null!);

    const animationMixer = useMemo<THREE.AnimationMixer>(() => {
        if (!vrm) return null!;

        const mixer = new THREE.AnimationMixer(vrm.scene);
    
        LoadMixamoAnimation(animationUrl, vrm).then((clip) => {
          mixer.clipAction(clip).play();
        //   console.log("AnimationClip", mixer.clipAction(clip));
        });
    
        return mixer;
    }, [animationUrl, vrm]);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.crossOrigin = "anonymous";

        loader.register((parser) => {
            return new VRMLoaderPlugin(parser);
        });

        loader.load(url, (gltf) => {
            const vrm = gltf.userData.vrm;

            setVrm(vrm);
            VRMUtils.deepDispose(vrm.scene);

            vrm.scene.traverse((obj: THREE.Object3D) => {
                obj.frustumCulled = false;
            });

            VRMUtils.rotateVRM0(vrm);
            // console.log(vrm);
        },
        // (progress) => console.log("Loading model...", 100.0 * (progress.loaded / progress.total), "%"),
        // (error) => console.log("Error loading model", error)
        );
    }, [url]);

    // useImperativeHandle(ref, () => ({ vrm, animationMixer }), [vrm, animationMixer]);

    useFrame((state, delta) => {
        animationMixer?.update(delta);
        vrm?.update(delta);
    });

    return (
        <>
            {vrm && (
                <primitive 
                object={vrm.scene}
                rotation={[0, 135, 0]}
                children-0-castShadow
            />
            )}
        </>
    )
}

export default Model;