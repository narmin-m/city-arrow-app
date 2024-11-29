import React from "react";
import { Canvas } from "@react-three/fiber";
import Arrow from "./components/Arrow";
import City from "./components/City";

const CameraController = () => {
  return (
    <camera position={[0, 5, 15]} fov={35} />
  );
};

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <Canvas style={{ background: "#1e1e1e" }}> {/* Dark background */}
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1} position={[5, 10, 5]} />
        <CameraController />
        <City />
        <Arrow />
      </Canvas>
    </div>
  );
};



export default App;
