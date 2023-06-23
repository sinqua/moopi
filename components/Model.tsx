"use client";

import * as THREE from "three";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  VRM,
  VRMLoaderPlugin,
  VRMUtils,
  VRMHumanoidHelper,
} from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "../utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useThree } from "@react-three/fiber";
import { Circle, useHelper } from "@react-three/drei";
import { Color } from "three";

export interface ModelProps {
  animationUrl?: string;
  modelUrl: string;
  setProgress: (done: boolean) => void;
}

const Model: FC<ModelProps> = ({
  animationUrl = "PutYourHandsUp.fbx",
  modelUrl,
  setProgress,
}) => {
  const [animation, setAnimation] = useState(animationUrl);

  const [vrm, setVrm] = useState<VRM>(null!);
  const vrmRef = useRef<any>();
  const helper = useHelper(vrmRef, THREE.SkeletonHelper);
  // useEffect(() => {
  //   console.log("help", helper);
  // }, [helper]);

  const [activeAction, setActiveAction] = useState<any>(null);
  const [actions, setActions] = useState<any>({});

  const [walkingAnimation, setWalkingAnimation] = useState<any>(null);
  const [idleAnimation, setIdleAnimation] = useState<any>(null);

  const animationMixer = useMemo<THREE.AnimationMixer>(() => {
    if (!vrm) return null!;

    const mixer = new THREE.AnimationMixer(vrm.scene);

    LoadMixamoAnimation(animation, vrm).then((clip) => {
      clip.name = "Landing";
      setActions((prevActions: any) => ({...prevActions, "Landing": clip}));
    });

    LoadMixamoAnimation("Idle.fbx", vrm).then((clip) => {
      clip.name = "Idle";
      setActions((prevActions: any) => ({...prevActions, "Idle": clip}));
    });

    return mixer;
  }, [animation, vrm]);

  useEffect(() => {
    if(actions['Landing'] && actions['Idle']) {
      setTimeout(() => {
        var landingAction = animationMixer.clipAction(actions['Landing']);
        var idleAction = animationMixer.clipAction(actions['Idle']);

        landingAction.loop = THREE.LoopOnce;
        landingAction.clampWhenFinished = true;
        landingAction.play();

        vrmRef.current.parent.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = 1;
          }
        });

        animationMixer.addEventListener('finished', (e) => {
          if(e.action._clip.name === "Landing") {
            idleAction.stop();
            idleAction.crossFadeFrom( landingAction, 0.5, false).play();
          }
        });
      }, 500);
    }
  }, [actions])

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.crossOrigin = "anonymous";

    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.load(
      modelUrl,
      (gltf) => {
        setProgress(true);
        const vrm: VRM = gltf.userData.vrm;
        // console.log("VRM", vrm);
        // console.log("Humanoid", vrm.humanoid);

        VRMUtils.deepDispose(vrm.scene);
        VRMUtils.removeUnnecessaryJoints(vrm.scene);
        VRMUtils.removeUnnecessaryVertices(vrm.scene);

        let bones: THREE.Bone[] = [];
        vrm.scene.traverse((child: any) => {
          if (child instanceof THREE.Bone) {
            bones.push(child);
          }

          if (child instanceof THREE.Mesh) {
            child.material.transparent = true;
            child.material.opacity = 0;
          }
        });
        
        setVrm(vrm);
      },
      (progress) => {},
      (error) => console.log("Error loading model", error)
    );
  }, [modelUrl]);

  useFrame((state, delta) => {
    animationMixer?.update(delta);
    vrm?.update(delta);
  });

  return (
    <>
      {vrm && (
        <primitive
          ref={vrmRef}
          object={vrm.scene}
          position={[0, -0.67, 0]}
          rotation={[0, 135, 0]}
          // material={new THREE.MeshStandardMaterial({ color: new THREE.Color('white'), opacity: 1, transparent: true })}
          children-0-castShadow
        >
          <Circle
            args={[0.35]}
            rotation-x={-Math.PI / 2}
            receiveShadow
            renderOrder={2}
          >
            <shaderMaterial attach="material" args={[gradientShader]} />
          </Circle>
        </primitive>
      )}
    </>
  );
};

export default Model;

const gradientShader = {
  uniforms: {
    color1: { value: new Color("#A0A0A0") }, // Start color
    color2: { value: new Color("#FAF9F6") }, // End color
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
            float alpha = 1.34 - dist; // Calculate alpha value based on distance
            gl_FragColor = vec4(mix(color1, color2, dist), alpha);
          }
    `,
};

function traverseJson(jsonData: any, bonesArray: any[]): void {
  if (typeof jsonData === "object" && jsonData !== null) {
    if (Array.isArray(jsonData)) {
      for (const item of jsonData) {
        traverseJson(item, bonesArray); // Recursively traverse each item in the array
      }
    } else {
      for (const key in jsonData) {
        if (key === "name" && jsonData[key] === "bone") {
          bonesArray.push(jsonData); // Push the current node to the bones array
        }
        traverseJson(jsonData[key], bonesArray); // Recursively traverse the value
      }
    }
  }
}

const bones: any[] = [];

console.log(bones);
