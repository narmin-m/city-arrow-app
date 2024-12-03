import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const City = ({ onLoad }) => {
  const gltf = useLoader(
    GLTFLoader,
    "/models/city1.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  React.useEffect(() => {
    if (gltf) onLoad();
  }, [gltf, onLoad]);

  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
};

export default City;
