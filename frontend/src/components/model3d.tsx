import { useEffect, useRef, useState } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { Button } from "react-bootstrap";

const BabylonViewer = ({ modelUrl }: { modelUrl: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<BABYLON.Scene | null>(null);
  const cameraRef = useRef<BABYLON.ArcRotateCamera | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new BABYLON.Engine(canvasRef.current, true);
    const scene = new BABYLON.Scene(engine);
    sceneRef.current = scene;

    const camera = new BABYLON.ArcRotateCamera(
      "camera1",
      Math.PI / 4,
      Math.PI / 3,
      15,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);
    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 30;
    camera.panningSensibility = 50;
    cameraRef.current = camera;

    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.Append("", modelUrl, scene, () => {
      console.log("Model załadowany!");

      scene.onBeforeRenderObservable.add(() => {
        if (autoRotate) {
          camera.alpha += 0.005;
        }
      });
    });

    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());

    return () => {
      engine.dispose();
      scene.dispose();
    };
  }, [modelUrl, autoRotate]);

  const rotateLeft = () => cameraRef.current && (cameraRef.current.alpha -= 0.1);
  const rotateRight = () => cameraRef.current && (cameraRef.current.alpha += 0.1);
  const rotateUp = () => cameraRef.current && (cameraRef.current.beta -= 0.1);
  const rotateDown = () => cameraRef.current && (cameraRef.current.beta += 0.1);
  const zoomIn = () => cameraRef.current && (cameraRef.current.radius -= 1);
  const zoomOut = () => cameraRef.current && (cameraRef.current.radius += 1);
  const toggleRotation = () => setAutoRotate((prev) => !prev);

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      />
      
      <div className="d-flex justify-content-center mt-3 flex-wrap">
        <Button variant="secondary" onClick={rotateLeft} className="m-1">⬅ Obróć</Button>
        <Button variant="secondary" onClick={rotateRight} className="m-1">➡ Obróć</Button>
        <Button variant="secondary" onClick={rotateUp} className="m-1">⬆ Góra</Button>
        <Button variant="secondary" onClick={rotateDown} className="m-1">⬇ Dół</Button>
        <Button variant="secondary" onClick={zoomIn} className="m-1">🔍+</Button>
        <Button variant="secondary" onClick={zoomOut} className="m-1">🔍-</Button>
        <Button variant={autoRotate ? "danger" : "success"} onClick={toggleRotation} className="m-1">
          {autoRotate ? "⏸ Zatrzymaj obrót" : "▶ Auto obrót"}
        </Button>
      </div>
    </div>
  );
};

export default BabylonViewer;
