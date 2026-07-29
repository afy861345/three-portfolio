import { Canvas } from '@react-three/fiber'
import React, { Suspense, useRef } from 'react'
import HackerRoom from '../components/HackerRoom'
import { Gltf, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import CanvasLoader from '../components/Loading'
import { Leva, useControls } from 'leva'
import { useMediaQuery } from 'react-responsive'
import { calculateSizes } from '../constants'
import { suspend } from 'suspend-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ReactLogo from '../components/ReactLogo'
import Cube from '../components/Cube'
import Rings from '../components/Rings'
import HeroCamera from '../components/HeroCamera'
import Button from '../components/Button'
const suziModel = import('@pmndrs/assets/models/suzi.glb')
const Hero = () => {
    const isSmall = useMediaQuery({ maxWidth: 440 });
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
    const sizes = calculateSizes(isSmall, isMobile, isTablet)
    const suziModel = import('@pmndrs/assets/models/suzi.glb')

    const AnimatedModel = () => {
        // إنشاء مرجع للوصول إلى المجسم ثلاثي الأبعاد
        const modelRef = useRef()

        // استخدام GSAP لتخريك المجسم أو تدويره عند التحميل
        useGSAP(() => {
            if (modelRef.current) {
                gsap.to(modelRef.current.position, {
                    y: modelRef.current.position.y + 0.5,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true
                    // ease: "power1.inOut"
                })
            }
        }, [])

        return (
            <group ref={modelRef}>
                <Gltf
                    src={suspend(suziModel).default}
                    scale={1}
                    position={sizes.targetPosition}
                />
            </group>
        )
    }
    return (
        <section className="min-h-screen w-full flex flex-col relative" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
                    Hi, I am Ali <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">Building Products & Brands</p>

            </div>
            <div className="w-full h-full absolute inset-0">

                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                        <HeroCamera isMobile={isMobile}>
                            <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />

                        </HeroCamera>
                        {/* <OrbitControls enableZoom enablePan enableRotate /> */}
                        <group>
                            <AnimatedModel />
                            <ReactLogo position={sizes.reactLogoPosition} />
                            <Cube position={sizes.cubePosition} />
                            <Rings position={sizes.ringPosition} />
                        </group>
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <a href="#about" className="w-fit">
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
                </a>
            </div>
        </section>
    )
}

export default Hero