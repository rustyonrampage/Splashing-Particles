import * as THREE from "three";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
// init

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.PlaneBufferGeometry(1, 1);
// const material = new THREE.MeshNormalMaterial({
//     side: THREE.DoubleSide,
// });
const material = new THREE.ShaderMaterial({
  fragmentShader: fragment,
  vertexShader: vertex,
  uniforms: {
    progress: { type: "f", value: 0 },
  },
  side: THREE.DoubleSide
});

const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.getElementById("container").appendChild(renderer.domElement);

// animation

function animation(time) {
  mesh.rotation.x = time / 2000;
  mesh.rotation.y = time / 1000;

  renderer.render(scene, camera);
}
