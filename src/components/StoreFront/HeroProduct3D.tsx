'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

interface ProductMeshProps {
  scrollProgress: number
}

const ProductMesh = ({ scrollProgress }: ProductMeshProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (!groupRef.current) return

    // Mouse parallax: subtle tilt toward cursor
    const targetX = pointer.y * 0.25
    const targetY = pointer.x * 0.35

    // Scroll: continuous rotation + gentle rise as user scrolls into next section
    const scrollRotation = scrollProgress * Math.PI * 0.6
    const scrollRise = scrollProgress * 0.4

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + scrollRotation,
      0.05,
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      scrollRise,
      0.08,
    )

    // Gentle idle bob so it never feels static
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.015
  })

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        setPointer({
          x: (e.point.x || 0) * 0.5,
          y: (e.point.y || 0) * 0.5,
        })
      }}
    >
      {/* Charging case body */}
      <RoundedBox args={[1.4, 1.8, 0.55]} radius={0.15} smoothness={8} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#F5F5F7"
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </RoundedBox>

      {/* Lid seam line */}
      <mesh position={[0, 0.05, 0.276]}>
        <boxGeometry args={[1.36, 0.008, 0.01]} />
        <meshStandardMaterial color="#D6D6DA" />
      </mesh>

      {/* LED indicator */}
      <mesh position={[0, -0.75, 0.276]}>
        <circleGeometry args={[0.035, 24]} />
        <meshStandardMaterial color="#8A8A8E" emissive="#4A9EFF" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

interface HeroProduct3DProps {
  scrollProgress?: number
}

export const HeroProduct3D = ({ scrollProgress = 0 }: HeroProduct3DProps) => {
  return (
    <div className="onyx-hero-canvas">
      <Canvas
        shadows
        camera={{ position: [0, 0.3, 4], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="city" />

        <ProductMesh scrollProgress={scrollProgress} />

        <ContactShadows position={[0, -1.1, 0]} opacity={0.35} scale={5} blur={2.5} far={2} />
      </Canvas>
    </div>
  )
}
