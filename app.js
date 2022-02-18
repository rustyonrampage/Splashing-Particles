import * as THREE from "three";

import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
let OrbitControl = require("three-orbit-controls")(THREE);

import gsap from "gsap";

// init

let time = 0;
let move = 0;

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const scene = new THREE.Scene();




const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: false } );
const cube = new THREE.Mesh( geometry, material );


scene.add(cube);

const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
camera.position.z = 5;

const ambient_light = new THREE.AmbientLight( 0xff1 ); // soft white light
// scene.add( ambient_light );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);



renderer.setAnimationLoop(animation);
document.getElementById("container").appendChild(renderer.domElement);
let controls = new OrbitControl(camera, renderer.domElement);

// animation


function animation() {
  time++;


  renderer.render(scene, camera);

}
