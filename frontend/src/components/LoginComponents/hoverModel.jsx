import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState, useRef } from 'react';

function HoverRotatingModel({ path, position, scale }) {
    const ref = useRef();
    const { scene } = useGLTF(path);
    const { mouse } = useThree();
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        scene.traverse((child) => {
        if (child.isMesh && child.material?.color) {
            child.material.color.set('#0c7ef0');
            child.castShadow = true;
            child.receiveShadow = true;
        }
        });
    }, [scene]);

    useFrame(() => {
        if (ref.current) {
        if (isHovered) {
            ref.current.rotation.y +=
            (mouse.x * Math.PI - ref.current.rotation.y) * 0.05;
            ref.current.rotation.x +=
            (mouse.y * Math.PI - ref.current.rotation.x) * 0.05;
        } else {
            ref.current.rotation.y += 0.005;
        }
        }
    });

    return (
        <group position={position}>
        <primitive
            object={scene}
            ref={ref}
            scale={scale}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        />
        </group>
    );
}

export default HoverRotatingModel;