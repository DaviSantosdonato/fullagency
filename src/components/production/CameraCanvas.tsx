"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { MathUtils, Mesh, MeshStandardMaterial, type Group } from "three";

interface CameraCanvasProps {
  readonly interactive: boolean;
  readonly motionEnabled: boolean;
  readonly scrollProgressRef: { readonly current: number };
  readonly onReady: () => void;
}

const CameraModel = ({
  interactive,
  motionEnabled,
  scrollProgressRef,
  onReady,
}: CameraCanvasProps) => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/media/models/sony-alpha-camera.glb");
  const camera = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      const sourceMaterial = object.material;
      if (!(sourceMaterial instanceof MeshStandardMaterial)) return;

      const material = sourceMaterial.clone();
      material.metalness = 0.24;
      material.roughness = 0.62;
      object.material = material;
    });

    return clone;
  }, [scene]);

  useEffect(() => onReady(), [onReady]);

  useFrame(({ clock, pointer }, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const frontFacing = 0;
    const scrollOrbit = motionEnabled
      ? (scrollProgressRef.current - 0.5) * 0.26
      : 0;
    const pointerYaw = interactive ? pointer.x * 0.12 : 0;
    const pointerPitch = interactive ? -pointer.y * 0.075 : 0;
    const idle = motionEnabled ? Math.sin(clock.elapsedTime * 0.65) : 0;

    group.rotation.x = MathUtils.damp(
      group.rotation.x,
      -0.035 + pointerPitch + idle * 0.012,
      5,
      delta,
    );
    group.rotation.y = MathUtils.damp(
      group.rotation.y,
      frontFacing + scrollOrbit + pointerYaw,
      4,
      delta,
    );
    group.rotation.z = MathUtils.damp(
      group.rotation.z,
      -0.025 + idle * 0.008,
      4,
      delta,
    );
    group.position.y = MathUtils.damp(
      group.position.y,
      motionEnabled ? idle * 0.018 : 0,
      3,
      delta,
    );
  });

  return (
    <group ref={groupRef} rotation={[-0.035, 0, -0.025]}>
      <Center>
        <primitive object={camera} scale={0.25} dispose={null} />
      </Center>
    </group>
  );
};

export const CameraCanvas = (props: CameraCanvasProps) => (
  <Canvas
    camera={{ position: [0, 0.02, 3.15], fov: 31, near: 0.1, far: 20 }}
    dpr={[1, 1.5]}
    frameloop={props.motionEnabled || props.interactive ? "always" : "demand"}
    gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
  >
    <ambientLight intensity={0.72} />
    <directionalLight
      position={[3.5, 4, 4]}
      intensity={2.8}
      color="#f4f1ea"
    />
    <directionalLight
      position={[-3, 1, 3]}
      intensity={1.2}
      color="#c24dff"
    />
    <pointLight
      position={[-2.4, 1, 1.5]}
      intensity={6.5}
      distance={5}
      color="#a400ff"
    />
    <spotLight
      position={[-1.5, 3, 3]}
      angle={0.55}
      penumbra={0.8}
      intensity={1.8}
      color="#c24dff"
    />

    <Suspense fallback={null}>
      <CameraModel {...props} />
    </Suspense>
  </Canvas>
);

useGLTF.preload("/media/models/sony-alpha-camera.glb");
