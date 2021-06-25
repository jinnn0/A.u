import * as THREE from 'https://cdn.skypack.dev/three@0.129.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

let renderer, camera, controls, scene;
let boxes = [];
let width = window.innerWidth;
let height = window.innerHeight;

// prettier-ignore
const colors = ['#4080ff','#ffe940','#40ffff','#fed1ff','#ee00f2','#f25100','#d2d1ff', '#ffa929','#cfff4a','#fff200','#8efabf','#0026ff','#ff4f6f'];

init();
addObjects();
animate();

function init() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  document.body.appendChild(renderer.domElement);
  renderer.setClearColor(0xc3cfe3);
  renderer.setSize(width, height);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 2000);
  camera.position.set(80, 65, 150);

  // Scene
  scene = new THREE.Scene();

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 300;

  // How far you can orbit vertically, upper and lower limits.
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 2.5;

  // How far you can orbit horizontally, upper and lower limits.
  controls.minAzimuthAngle = -degreesToRadians(10);
  controls.maxAzimuthAngle = degreesToRadians(90);

  // Lights
  const light1 = new THREE.AmbientLight(0x404040);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);

  light2.position.set(1, 3, 1);

  scene.add(light1);
  scene.add(light2);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function addObjects() {
  const numberOfBox = 30;
  const distance = 10;

  for (let i = 0; i < numberOfBox; i++) {
    for (let j = 0; j < numberOfBox; j++) {
      const width = randomNumber(5, 15);
      const height = randomNumber(25, 80);
      const depth = randomNumber(5, 15);

      const geometry = new THREE.BoxGeometry(width, height, depth);
      const material = new THREE.MeshPhongMaterial({ color: new THREE.Color(0x2194ce) });

      const box = new THREE.Mesh(geometry, material);
      box.position.x = distance * i;
      box.position.z = distance * j;

      scene.add(box);
      boxes.push(box);
    }
  }
}

// Window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  width = window.innerWidth;
  height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  controls.update();
}

// Spacebar event
document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    const randomNumber = getNumber();

    boxes.forEach((box) => {
      box.material.color = new THREE.Color(colors[randomNumber]);
    });
  }
});

// Helpers
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function getNumber() {
  return (getNumber.number = Math.floor(Math.random() * 14)) === getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
}

function degreesToRadians(degrees) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}
