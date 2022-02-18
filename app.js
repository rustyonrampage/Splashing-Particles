import * as THREE from "three";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
let OrbitControl = require("three-orbit-controls")(THREE);
import mask from "./images/particle_mask.jpg";
import t1 from "./images/t1.png";
import t2 from "./images/t2.png";
import gsap from "gsap";

import * as dat from "dat.gui"
// init

let time = 0;
let move = 0;

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.z = 1000;

const scene = new THREE.Scene();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const point = new THREE.Vector2();

const textures = [
  new THREE.TextureLoader().load(t1),
  new THREE.TextureLoader().load(t2),
];
const maskTexture = new THREE.TextureLoader().load(mask);

// const geometry = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10);
const geometry = new THREE.BufferGeometry();
// const material = new THREE.MeshNormalMaterial({
//     side: THREE.DoubleSide,
// });
const material = new THREE.ShaderMaterial({
  fragmentShader: fragment,
  vertexShader: vertex,
  uniforms: {
    progress: { type: "f", value: 0 },
    t1: { type: "t", value: textures[0] },
    t2: { type: "t", value: textures[1] },
    mask: { type: "t", value: maskTexture },
    mouse: { type: " v2", value: null },
    move: { type: "f", value: 0 },
    time: { type: "f", value: 0 },
    mousePressed: { type: "f", value: 0 },
    transition: {type: 'f', value: null}
  },

  side: THREE.DoubleSide,
  transparent: true, // PNG support
  depthTest: false,
  depthWrite: false,
});

let number = 512 * 512;
let positions = new THREE.BufferAttribute(new Float32Array(number * 3), 3);
let coordinates = new THREE.BufferAttribute(new Float32Array(number * 3), 3);
let speeds = new THREE.BufferAttribute(new Float32Array(number), 1);
let offset = new THREE.BufferAttribute(new Float32Array(number), 1);
let direction = new THREE.BufferAttribute(new Float32Array(number), 1);
let press = new THREE.BufferAttribute(new Float32Array(number), 1);

function rand(a, b) {
  return a + (b - a) * Math.random();
}
let index = 0;
for (let i = 0; i < 512; i++) {
  let posX = i - 256;
  for (let j = 0; j < 512; j++) {
    positions.setXYZ(index, posX * 2, (j - 256) * 2, 0);
    coordinates.setXYZ(index, i, j, 0);
    offset.setX(index, rand(-1000, 1000));
    speeds.setX(index, rand(0.4, 1));
    direction.setX(index, Math.random() > 0.5 ? 1 : -1);
    press.setX(index, rand(0.4, 1));
    index++;
  }
}
geometry.setAttribute("position", positions);
geometry.setAttribute("aCoordinates", coordinates);
geometry.setAttribute("aSpeed", speeds);
geometry.setAttribute("aOffset", offset);
geometry.setAttribute("aDirection", direction);
geometry.setAttribute("aPress", press);
const mesh = new THREE.Points(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

let test = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2000, 2000),
  new THREE.MeshBasicMaterial()
);
function mouseEffects() {
  window.addEventListener("mousedown", (e) => {
    gsap.to(material.uniforms.mousePressed, {
      duration: 1,
      value: 1,
      ease: "power4.out",
    });
  });
  window.addEventListener("mouseup", (e) => {
    gsap.to(material.uniforms.mousePressed, {
      duration: 1,
      value: 0,
      ease: "power4.out",
    });
  });
  window.addEventListener("mousewheel", (e) => {
    move += e.wheelDeltaY / 1000;
  });
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      // calculate objects intersecting with picking raycaser
      let intersects = raycaster.intersectObjects([test]);
      if (intersects[0]) {
        point.x = intersects[0]?.point.x;
        point.y = intersects[0]?.point.y;
      }
    },
    false
  );
}
mouseEffects();
renderer.setAnimationLoop(animation);
document.getElementById("container").appendChild(renderer.domElement);
// let controls = new OrbitControl(camera, renderer.domElement);

// animation

let gui 
let setting = {
  progress:0 

}
function settings(){

  gui = new dat.GUI()
  gui.add(setting, "progress", 0, 1, 0.01)
}
settings()
function animation() {
  time++;
  let next = Math.floor(move + 40) % 2; 
  let prev = (Math.floor(move) + 1 + 40 ) % 2;

  console.log('progress', setting.progress)

  material.uniforms.t1.value = textures[prev]
  material.uniforms.t2.value = textures[next]
  

  material.uniforms.time.value = time;
  material.uniforms.move.value = move;
  material.uniforms.mouse.value = point;
  material.uniforms.transition.value = setting.progress;
  // mesh.rotation.x = time / 2000;
  // mesh.rotation.y = time / 1000;
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;

  renderer.render(scene, camera);

}
