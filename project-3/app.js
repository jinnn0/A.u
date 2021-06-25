import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// prettier-ignore
const colors = ['#4080ff','#ffe940','#40ffff','#fed1ff','#ee00f2','#f25100','#d2d1ff', '#ffa929','#cfff4a','#fff200','#8efabf','#0026ff','#ff4f6f'];

let renderer, scene, camera, controls, model;
const width = window.innerWidth;
const height = window.innerHeight;

init();
animate();
load3dModel();

function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor('white');
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.set(0, 10, 200);

  // Scene
  scene = new THREE.Scene();

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 50;
  controls.maxDistance = 250;

  // Lights
  const light1 = new THREE.AmbientLight(0x404040);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);

  light2.position.set(1, 3, 2);

  scene.add(light1);
  scene.add(light2);
}

function load3dModel() {
  const loader = new GLTFLoader();
  loader.load('model/scene.gltf', (gltf) => {
    model = gltf.scene;
    scene.add(model);

    model.scale.set(0.1, 0.1, 0.1);
    model.position.y = -35;
    model.rotation.x = 0.2;
    model.rotation.y = 0.5;
  });
}

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.01;
  }

  controls.update();
  renderer.render(scene, camera);
}

// Window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  controls.update();
}

// Spacebar event
document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    const randomNumber = getNumber();

    renderer.setClearColor(colors[randomNumber]);
  }
});

// Helpers
function getNumber() {
  return (getNumber.number = Math.floor(Math.random() * 14)) === getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
}
