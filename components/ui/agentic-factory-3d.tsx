"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type AgenticFactory3DProps = { height?: number | string; className?: string; embed?: boolean; onStation?: (id: string) => void; onReady?: () => void };
type SceneOptions = { embedded: boolean; onStation?: (id: string) => void; onReady?: () => void };

export default function AgenticFactory3D({ height = "100vh", className, embed = false, onStation, onReady }: AgenticFactory3DProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const handlers = useRef({ onStation, onReady });
  useEffect(() => { handlers.current = { onStation, onReady }; }, [onStation, onReady]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      try {
        dispose = initMachineScene(root, getComputedStyle(root).fontFamily, {
          embedded: embed, onStation: id => handlers.current.onStation?.(id), onReady: () => handlers.current.onReady?.()
        });
      } catch (error) {
        const loading = root.querySelector<HTMLElement>("[data-loading]");
        const errorNode = root.querySelector<HTMLElement>("[data-error]");
        if (loading) loading.style.display = "none";
        if (errorNode) { errorNode.style.display = "block"; errorNode.textContent = "WebGL could not initialize. Try a browser with hardware acceleration enabled."; }
        console.error("Site Fleet 3D scene initialization failed", error);
      }
    };
    if (document.fonts?.ready) void document.fonts.ready.then(start); else start();
    return () => { cancelled = true; dispose?.(); };
  }, [embed]);
  return <div ref={rootRef} className={["agentic-factory-3d", embed ? "embed" : "", className ?? ""].filter(Boolean).join(" ")} style={{ height }} data-testid="agentic-factory-3d">
    <div data-scene role="img" aria-label="Interactive 3D industrial operations platform"/>
    <div data-loading><i/><span>Assembling your machine</span></div>
    <div data-error role="alert" style={{ display: "none" }}/>
  </div>;
}

function initMachineScene(root: HTMLElement, fontFamily: string, options: SceneOptions): () => void {
  const sceneElement = root.querySelector<HTMLElement>("[data-scene]");
  if (!sceneElement) throw new Error("Scene mount element was not found");
  const cleanups: Array<() => void> = [];
  const width = () => Math.max(root.clientWidth, 1);
  const height = () => Math.max(root.clientHeight, 1);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080d18, 0.026);
  const camera = new THREE.PerspectiveCamera(34, width() / height(), 0.1, 180);
  camera.position.set(14, 12, 16);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width(), height());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute("aria-hidden", "true");
  renderer.domElement.tabIndex = 0;
  renderer.domElement.style.touchAction = "pan-y";
  sceneElement.appendChild(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  scene.environment = pmrem.fromScene(room, 0.04).texture;
  room.dispose(); pmrem.dispose();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .06; controls.minDistance = 12; controls.maxDistance = 28;
  controls.maxPolarAngle = Math.PI * .48; controls.target.set(0, 1.3, 0); controls.autoRotate = options.embedded; controls.autoRotateSpeed = .45; controls.update();
  scene.add(new THREE.HemisphereLight(0xdbeafe, 0x182235, 2.1));
  const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(8, 14, 10); keyLight.castShadow = true; keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.left = -12; keyLight.shadow.camera.right = 12; keyLight.shadow.camera.top = 12; keyLight.shadow.camera.bottom = -12; scene.add(keyLight);
  const cyanLight = new THREE.PointLight(0x39dce6, 24, 22, 2); cyanLight.position.set(-5, 4, 1); scene.add(cyanLight);
  const violetLight = new THREE.PointLight(0x8a7dff, 17, 20, 2); violetLight.position.set(5, 3, -4); scene.add(violetLight);

  const machine = new THREE.Group(); scene.add(machine);
  const metal = new THREE.MeshStandardMaterial({ color: 0x252e3c, metalness: .82, roughness: .28 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x101925, metalness: .7, roughness: .32 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x173a4c, metalness: .45, roughness: .18, transparent: true, opacity: .84, clearcoat: .8 });
  const cyan = new THREE.MeshStandardMaterial({ color: 0x54f0e7, emissive: 0x0c777b, emissiveIntensity: 1.8, metalness: .25, roughness: .22 });
  const white = new THREE.MeshStandardMaterial({ color: 0xe9f5ff, emissive: 0x213a51, emissiveIntensity: .45, metalness: .35, roughness: .24 });
  const base = new THREE.Mesh(new RoundedBoxGeometry(10, .55, 10, 5, .14), metal);
  base.receiveShadow = true; base.castShadow = true; machine.add(base);
  const inset = new THREE.Mesh(new RoundedBoxGeometry(8.9, .08, 8.9, 3, .04), darkMetal); inset.position.y = .3; machine.add(inset);

  const trackMaterial = new THREE.MeshStandardMaterial({ color: 0x48e8e5, emissive: 0x147b80, emissiveIntensity: 1.4, metalness: .4, roughness: .25 });
  const addTrack = (x: number, z: number, sx: number, sz: number) => { const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, .035, sz), trackMaterial); mesh.position.set(x, .36, z); machine.add(mesh); };
  addTrack(0, -4.15, 7.6, .045); addTrack(0, 4.15, 7.6, .045); addTrack(-4.15, 0, .045, 7.6); addTrack(4.15, 0, .045, 7.6);

  const specs = [
    { id: "planning", x: -2.55, z: -2.45, color: 0x4ee5e1, label: "PLAN" },
    { id: "dispatch", x: 2.55, z: -2.45, color: 0x9b91ff, label: "DISPATCH" },
    { id: "assets", x: -2.55, z: 2.45, color: 0x77aaff, label: "ASSETS" },
    { id: "insights", x: 2.55, z: 2.45, color: 0xf0b76a, label: "INSIGHTS" }
  ];
  const stations: THREE.Object3D[] = [];
  const makeLabel = (label: string, color: string) => {
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext("2d"); if (!ctx) return null;
    ctx.clearRect(0, 0, 512, 128); ctx.font = `600 46px ${fontFamily || "Arial"}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 18; ctx.fillText(label, 256, 64);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, .55), material); mesh.userData.disposeTexture = texture; return mesh;
  };
  for (const spec of specs) {
    const station = new THREE.Group(); station.position.set(spec.x, .42, spec.z); station.userData.stationId = spec.id;
    const pad = new THREE.Mesh(new RoundedBoxGeometry(2.25, .2, 2.15, 4, .1), darkMetal); pad.position.y = .1; pad.receiveShadow = true; station.add(pad);
    const pillar = new THREE.Mesh(new RoundedBoxGeometry(1.1, 1.5, .9, 4, .12), glass); pillar.position.y = .92; pillar.castShadow = true; pillar.receiveShadow = true; station.add(pillar);
    const topMaterial = new THREE.MeshStandardMaterial({ color: spec.color, emissive: spec.color, emissiveIntensity: .65, metalness: .35, roughness: .22 });
    const top = new THREE.Mesh(new RoundedBoxGeometry(1.3, .12, 1.08, 4, .05), topMaterial); top.position.y = 1.73; station.add(top);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.58, .025, 8, 48), new THREE.MeshBasicMaterial({ color: spec.color })); ring.rotation.x = Math.PI / 2; ring.position.y = 1.82; station.add(ring);
    const label = makeLabel(spec.label, `#${spec.color.toString(16).padStart(6, "0")}`);
    if (label) { label.position.set(0, 2.15, .52); station.add(label); }
    station.traverse(object => { if (object instanceof THREE.Mesh) { object.castShadow = true; object.userData.stationId = spec.id; } });
    machine.add(station); stations.push(station);
  }

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.76, 1), cyan); core.position.set(0, 1.45, 0); core.castShadow = true; machine.add(core);
  const coreRing = new THREE.Mesh(new THREE.TorusGeometry(1.05, .035, 10, 72), white); coreRing.position.copy(core.position); coreRing.rotation.x = Math.PI / 2.5; machine.add(coreRing);
  const connectorMaterial = new THREE.MeshStandardMaterial({ color: 0x3bd8de, emissive: 0x0a666b, emissiveIntensity: 1.5, metalness: .6, roughness: .25 });
  for (const spec of specs) {
    const start = new THREE.Vector3(0, .55, 0), end = new THREE.Vector3(spec.x * .7, .52, spec.z * .7);
    const direction = new THREE.Vector3().subVectors(end, start);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, direction.length(), 8), connectorMaterial);
    beam.position.copy(start).add(end).multiplyScalar(.5); beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize()); machine.add(beam);
  }

  // Soft floor shadow generated locally as a radial alpha-gradient canvas texture.
  const shadowCanvas = document.createElement("canvas"); shadowCanvas.width = 256; shadowCanvas.height = 256;
  const shadowContext = shadowCanvas.getContext("2d");
  if (shadowContext) {
    const gradient = shadowContext.createRadialGradient(128, 128, 8, 128, 128, 126);
    gradient.addColorStop(0, "rgba(0,0,0,0.42)"); gradient.addColorStop(.45, "rgba(0,0,0,0.2)"); gradient.addColorStop(1, "rgba(0,0,0,0)");
    shadowContext.fillStyle = gradient; shadowContext.fillRect(0, 0, 256, 256);
  }
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, opacity: .85 });
  const floorShadow = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), shadowMaterial); floorShadow.rotation.x = -Math.PI / 2; floorShadow.position.y = -.34; scene.add(floorShadow);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: 0x080d17, metalness: .15, roughness: .92 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -.38; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(42, 42, 0x244354, 0x142638); grid.position.y = -.365;
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach(material => { const mat = material as THREE.Material & { opacity?: number; transparent?: boolean }; mat.transparent = true; mat.opacity = .2; }); scene.add(grid);

  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  const handlePointer = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(stations, true).find(item => typeof item.object.userData.stationId === "string");
    if (hit) options.onStation?.(String(hit.object.userData.stationId));
  };
  renderer.domElement.addEventListener("pointerup", handlePointer);
  cleanups.push(() => renderer.domElement.removeEventListener("pointerup", handlePointer));

  let animationId = 0; const clock = new THREE.Clock();
  const animate = () => {
    animationId = window.requestAnimationFrame(animate); const elapsed = clock.getElapsedTime();
    core.rotation.y = elapsed * .32; core.rotation.x = Math.sin(elapsed * .4) * .12; coreRing.rotation.z = elapsed * .2;
    stations.forEach((station, index) => { const top = station.children[2]; top.position.y = 1.73 + Math.sin(elapsed * 1.6 + index) * .035; });
    controls.update(); renderer.render(scene, camera);
  };
  animate();
  const resizeObserver = new ResizeObserver(() => { camera.aspect = width() / height(); camera.updateProjectionMatrix(); renderer.setSize(width(), height()); });
  resizeObserver.observe(root); cleanups.push(() => resizeObserver.disconnect());
  const loading = root.querySelector<HTMLElement>("[data-loading]"); if (loading) loading.style.display = "none";
  options.onReady?.();

  return () => {
    window.cancelAnimationFrame(animationId); controls.dispose(); cleanups.forEach(cleanup => cleanup());
    scene.traverse(object => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => { const map = (material as THREE.Material & { map?: THREE.Texture }).map; map?.dispose(); material.dispose(); });
      }
    });
    scene.environment?.dispose(); shadowTexture.dispose(); renderer.dispose(); renderer.forceContextLoss();
    if (renderer.domElement.parentElement === sceneElement) sceneElement.removeChild(renderer.domElement);
  };
}
