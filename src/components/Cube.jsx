import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import { Float, useGLTF, useTexture } from '@react-three/drei';

const Cube = ({ ...props }) => {
    const { nodes } = useGLTF('models/cube.glb');

    const texture = useTexture('textures/cube.png');

    const cubeRef = useRef();
    const [hovered, setHovered] = useState(false);
    const tl = useRef();

    useGSAP(
        () => {
            tl.current = gsap.timeline({
                repeat: -1,
                repeatDelay: 0.5,
            });

            tl.current.to(cubeRef.current.rotation, {
                y: `+=${Math.PI * 2}`,
                x: `-=${Math.PI * 2}`,
                duration: 2.5,
                ease: "none",
            });

            return () => tl.current.kill();
        },
        {
            dependencies: [],
        }
    );
    useEffect(() => {
        hovered ? tl.current.pause() : tl.current.resume();
    }, [hovered]);
    return (
        <Float floatIntensity={2}>
            <group position={[7, -5, 0]} rotation={[2.6, 0.8, -1.8]} scale={0.74} dispose={null} {...props}>
                <mesh
                    ref={cubeRef}
                    castShadow
                    receiveShadow
                    geometry={nodes.Cube.geometry}
                    material={nodes.Cube.material}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <meshMatcapMaterial matcap={texture} toneMapped={false} />
                </mesh>
            </group>
        </Float>
    );
};

useGLTF.preload('models/cube.glb');

export default Cube;
