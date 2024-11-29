import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

const Arrow = () => {
  const arrowRef = useRef();
  const { camera } = useThree();
  const gltf = useLoader(GLTFLoader, "/models/arrow.glb");

  // Define start and end positions for the street in your city model
  const streetStartZ = -400; // Start of the street
  const streetEndZ = 50;     // End of the street

  useFrame(() => {
    if (arrowRef.current) {
      const arrowSpeed = 0.04; // Speed of the arrow

      // Move the arrow forward along the Z-axis
      if (arrowRef.current.position.z > streetEndZ) {
        // Reset the arrow back to the start position
        arrowRef.current.position.z = streetStartZ;
      } else {
        // Keep moving the arrow forward
        arrowRef.current.position.z += arrowSpeed;
      }

      // Adjust camera to follow the arrow closely
      const { x, y, z } = arrowRef.current.position;
      camera.position.lerp({ x, y: y + 4, z: z - 5 }, 0.1); // Keep the arrow closer to the camera
      camera.lookAt(x, y, z); // Ensure the camera looks at the arrow
    }
  });

  // Position the arrow closer to the camera at the start
  return <primitive object={gltf.scene} ref={arrowRef} position={[0, 0, streetStartZ + 10]} rotation={[0, Math.PI, 0]} />;
};

export default Arrow;
