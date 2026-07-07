'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function SpinningCube() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.8
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#3D7FFF" />
    </mesh>
  )
}

export default function Test3DPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0B1D3A' }}>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <SpinningCube />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
