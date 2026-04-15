import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import styles from './AnalogWatch3D.module.css'

interface AnalogWatch3DProps {
  minuteAngle: number
  secondAngle: number
}

const WatchScene = ({ minuteAngle, secondAngle }: AnalogWatch3DProps) => {
  const hourAngle = minuteAngle / 12

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#9ca3af'),
        metalness: 0.92,
        roughness: 0.32,
      }),
    [],
  )

  const dialMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#101828'),
        metalness: 0.15,
        roughness: 0.75,
      }),
    [],
  )

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#9fb9ff'),
        metalness: 0,
        roughness: 0.04,
        transmission: 0.95,
        thickness: 0.25,
        transparent: true,
        opacity: 0.3,
      }),
    [],
  )

  const handMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#dbe7ff'),
        metalness: 0.55,
        roughness: 0.25,
      }),
    [],
  )

  const secondMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3b82f6'),
        emissive: new THREE.Color('#1d4ed8'),
        emissiveIntensity: 0.45,
        metalness: 0.35,
        roughness: 0.25,
      }),
    [],
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight castShadow intensity={1} position={[2.5, 4, 3]} />
      <directionalLight intensity={0.45} position={[-3, 2, -2]} />

      <group rotation={[-0.28, 0, 0]}>
        <mesh material={bezelMaterial} receiveShadow castShadow>
          <cylinderGeometry args={[1.22, 1.22, 0.16, 96]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} material={dialMaterial} receiveShadow>
          <cylinderGeometry args={[1.08, 1.08, 0.08, 96]} />
        </mesh>

        <mesh rotation={[0, -THREE.MathUtils.degToRad(hourAngle), 0]} position={[0, 0.085, 0]}>
          <boxGeometry args={[0.08, 0.03, 0.56]} />
          <primitive object={handMaterial} attach="material" />
        </mesh>
        <mesh rotation={[0, -THREE.MathUtils.degToRad(minuteAngle), 0]} position={[0, 0.095, 0]}>
          <boxGeometry args={[0.05, 0.025, 0.8]} />
          <primitive object={handMaterial} attach="material" />
        </mesh>
        <mesh rotation={[0, -THREE.MathUtils.degToRad(secondAngle), 0]} position={[0, 0.105, 0]}>
          <boxGeometry args={[0.02, 0.02, 0.94]} />
          <primitive object={secondMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 0.11, 0]} material={secondMaterial}>
          <sphereGeometry args={[0.045, 24, 24]} />
        </mesh>
        <mesh material={glassMaterial} position={[0, 0.145, 0]}>
          <cylinderGeometry args={[1.1, 1.1, 0.03, 96]} />
        </mesh>
      </group>

      <ContactShadows opacity={0.55} blur={2.4} scale={4} far={2.4} resolution={256} />
    </>
  )
}

export const AnalogWatch3D = ({ minuteAngle, secondAngle }: AnalogWatch3DProps) => {
  return (
    <div className={styles.wrap}>
      <Canvas camera={{ position: [0, 1.8, 2.4], fov: 42 }} shadows dpr={[1, 2]}>
        <WatchScene minuteAngle={minuteAngle} secondAngle={secondAngle} />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={1.7} minPolarAngle={1.2} />
      </Canvas>
    </div>
  )
}
