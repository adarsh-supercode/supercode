import React from 'react';
import { useGLTF } from '@react-three/drei';
import { usePathname } from 'next/navigation'; // Import usePathname for route checking

export function FooterLogoBlue(props) {
  const { nodes, materials } = useGLTF('/assets/homepageBannerLogo.glb');
  const pathname = usePathname(); // Get the current route

  // Check if the current route is the homepage
  const isHomepage = pathname === '/';

  return (
    <group
      {...props}
      dispose={null}
      scale={isHomepage ? [0.006, 0.006, 0.006] : [0.0056 ,0.0056 ,0.0056 ]}
      position={isHomepage ? [0, -0.015, 0] : [0, -0.0001, 0]} // Conditional position
    >
      {/* <pointLight position={[-1, -1, 5]} intensity={1} /> */}

      <group position={[-0.2, -0.5, 0.45]}>
        <group position={[0.166, 0, -1.567]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 1, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box002.geometry}
            material={materials['fallback Material']}
            scale={0.001}
          >
           <meshStandardMaterial
              attach="material"
              metalness={1} 
              roughness={0.2}
            />

          </mesh>
        </group>
        <group position={[1.219, 0, 0.225]} rotation={[-Math.PI / 2, 0, -2.094]} scale={[1, 1, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box003.geometry}
            material={materials['fallback Material']}
            scale={0.001}
          >
             <meshStandardMaterial
              attach="material"
              metalness={1} 
              roughness={0.2}
            />
          </mesh>
        </group>
        <group position={[-0.865, 0, 0.233]} rotation={[-Math.PI / 2, 0, 2.096]} scale={[1, 1, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box003_1.geometry}
            material={materials['fallback Material']}
            scale={0.001}
          >
               <meshStandardMaterial
              attach="material"
              metalness={1} 
              roughness={0.2}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/homepageBannerLogo.glb');
