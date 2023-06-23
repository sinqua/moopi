"use client";

import * as THREE from "three";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { MToonMaterial, MToonMaterialLoaderPlugin, VRM, VRMLoaderPlugin, VRMUtils } from "@pixiv/three-vrm";

import { LoadMixamoAnimation } from "../utils/LoadMixamoAnimation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useThree } from "@react-three/fiber";
import { Circle } from "@react-three/drei";
import { Color } from "three";
import { GLTF } from "three-stdlib";

export interface ModelProps {
  animationUrl?: string;
  modelUrl?: string;
  setProgress: (done: boolean) => void;
}

const Model: FC<ModelProps> = ({
  animationUrl = "/PutYourHandsUp.fbx",
  modelUrl = "/Karin_spring.vrm",
  setProgress,
}) => {
  const [vrm, setVrm] = useState<VRM>(null!);
  const vrmRef = useRef<any>();
  const { gl } = useThree();

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

    loader.register((parser) => {
      return new MToonMaterialLoaderPlugin(parser);
    });

    loader.load(
      modelUrl,
      async (gltf) => {
        setProgress(true);

        const lessMorph = RemoveMorphs(gltf);

        const vrm: VRM = lessMorph.userData.vrm;

        setVrm(OptimizeModel(vrm));
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

function RemoveMorphs(gltf: GLTF) {
  const geomtery = gltf.userData.vrm.scene.children[1].children[0].geometry;

  gltf.userData.vrm.scene.children[1].children[0].geometry.morphAttributes.position.length = 0;
  gltf.userData.vrm.scene.children[1].children[0].geometry.morphAttributes.normal.length = 0;
  gltf.userData.vrm.scene.children[1].children[0].geometry.morphTargetsRelative = false;

  gltf.userData.vrm.scene.children[1].children[1].geometry.morphAttributes.position.length = 0;
  gltf.userData.vrm.scene.children[1].children[1].geometry.morphAttributes.normal.length = 0;
  gltf.userData.vrm.scene.children[1].children[1].geometry.morphTargetsRelative = false;

  gltf.userData.vrm.scene.children[1].children[0].updateMorphTargets();
  gltf.userData.vrm.scene.children[1].children[1].updateMorphTargets();

  return gltf;
}

function OptimizeModel(vrm: VRM) {
  VRMUtils.deepDispose(vrm.scene);
  VRMUtils.removeUnnecessaryJoints(vrm.scene);
  VRMUtils.removeUnnecessaryVertices(vrm.scene);

  const materials : MToonMaterial[] = vrm.materials! as MToonMaterial[]; 

  materials.forEach((material: MToonMaterial) => {
    material.transparent = false;
    material.toneMapped = false;
  });
  return vrm;
}
