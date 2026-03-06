import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.2;
    
    // Create a fluid, organic movement
    vec3 color = vec3(0.0);
    
    for(float i = 1.0; i < 4.0; i++) {
      uv.x += 0.3 / i * sin(i * 3.0 * uv.y + time);
      uv.y += 0.3 / i * cos(i * 3.0 * uv.x + time);
    }
    
    color = vec3(
      0.1 + 0.1 * sin(uv.x + uv.y + time),
      0.1 + 0.1 * cos(uv.x - uv.y + time),
      0.2 + 0.1 * sin(uv.x * uv.y + time)
    );
    
    // Darken it significantly to act as a background
    color *= 0.4;
    
    // Add some subtle grain/noise
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    color += noise * 0.02;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2() }
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[2, 2, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function ShaderBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
    </div>
  );
}
