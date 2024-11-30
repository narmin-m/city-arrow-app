import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

const Arrow = () => {
  const arrowRef = useRef();
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, "/models/arrow.glb");

  const speed = 0.04; // Arrow speed
  const streetStartZ = -400; // Starting position
  const streetEndZ = 50; // End position

  // Closer initial camera position
  const initialCameraPosition = { x: 0, y: 4, z: streetStartZ - 10 }; // Very close behind
  const targetCameraPosition = { x: 0, y: 4, z: streetStartZ - 5 }; // Slightly closer behind the arrow

  let smoothTransitionProgress = 0; // Smooth transition progress tracker (0 to 1)

  useFrame((_, delta) => {
    if (arrowRef.current) {
      const arrow = arrowRef.current;

      // Move the arrow forward along the Z-axis
      arrow.position.z += speed;
      if (arrow.position.z > streetEndZ) arrow.position.z = streetStartZ;

      // Fix the arrow's rotation to always face forward
      arrow.rotation.set(0, Math.PI, 0);

      // Smoothly transition the camera from very close behind to directly behind
      if (smoothTransitionProgress < 1) {
        smoothTransitionProgress += delta * 0.3; // Adjust transition speed
        camera.position.lerpVectors(
          initialCameraPosition,
          { x: arrow.position.x, y: 4, z: arrow.position.z - 5 }, // Directly behind arrow
          smoothTransitionProgress
        );
      } else {
        // Follow the arrow from behind after transition
        camera.position.lerp(
          { x: arrow.position.x, y: 4, z: arrow.position.z - 5 }, // Follow arrow
          0.1
        );
      }

      // Ensure the camera looks at the arrow at all times
      camera.lookAt(arrow.position.x, arrow.position.y, arrow.position.z);
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={arrowRef}
      position={[0, 0, streetStartZ + 10]} // Start closer to the camera
      rotation={[0, Math.PI, 0]} // Ensure forward-facing at load
    />
  );
};

export default Arrow;
