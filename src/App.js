import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Arrow from "./components/Arrow";
import City from "./components/City";

const App = () => {
  const [cityLoaded, setCityLoaded] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
      <Canvas style={{ background: "#1e1e1e" }}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} position={[5, 10, 5]} />
        {/* Display City Immediately */}
        <Suspense fallback={<City onLoad={() => {}} />}>
          <City onLoad={() => setCityLoaded(true)} />
          {cityLoaded && <Arrow startAnimation={true} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
