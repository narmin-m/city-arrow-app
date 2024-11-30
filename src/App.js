import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Arrow from "./components/Arrow";
import City from "./components/City";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      {/* Ensure Canvas only contains Three.js compatible objects */}
      <Canvas style={{ background: "#1e1e1e" }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={1} position={[5, 10, 5]} />
        <Suspense fallback={null}>
          <City />
          <Arrow />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
