"use client";

import { useGLTF } from "@react-three/drei";

const Model = (props: any) => {

    const model = useGLTF("http://localhost:5173/s2xyoon.vrm") as any;

    return (
        <>
            <primitive 
                object={model.scene}
                rotation={[0, 135, 0]}
                children-0-castShadow
            />
        </>
    )
}

export default Model;