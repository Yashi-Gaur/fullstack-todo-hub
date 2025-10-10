import React, {Suspense} from "react";
import { Box } from "@mui/material";
import { Canvas } from '@react-three/fiber';
import HoverRotatingModel from './hoverModel.jsx';

function AnimatedSection() {
    return (
        <Box
            sx={{
                flex: 1,
                backgroundColor: '#73a4b6ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 23,
                p: 0,
                borderRadius: 6,
            }}
        >
            <Canvas
            shadows
            camera={{ position: [-1.8, 9, 40], fov: 40 }}
            gl={{ antialias: true }}
            >
                <fog attach="fog" args={['#d3470f76', 15, 80]} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <HoverRotatingModel
                    path="/assets/scene.gltf"
                    position={[0, -0.2, 1.3]}
                    scale={0.12}
                    />
                </Suspense>

                <mesh
                    receiveShadow
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -1.5, 0]}
                >
                    <planeGeometry args={[100, 100]} />
                    <shadowMaterial transparent opacity={0.6} />
                </mesh>
            </Canvas>
        </Box>
    );

}

export default AnimatedSection;