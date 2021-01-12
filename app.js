import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls';
import { initControls } from './controls.js';

// prettier-ignore
const colors = ['#4080ff','#ffe940','#40ffff', '#374cae', '#fed1ff','#ee00f2','#f25100','#374cae','#d2d1ff', '#ffa929','#cfff4a','#fff200','#8efabf','#0026ff','#ff4f6f'];

let renderer, scene, camera, controls, globe;
const width = window.innerWidth;
const height = window.innerHeight;

setup();
createGlobe();
createCloud();
animate();

function setup() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor('#374cae');
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
  camera.position.set(0, 10, 100);

  // Scene
  scene = new THREE.Scene();

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  // Lights
  const light1 = new THREE.AmbientLight(0x404040);
  const light2 = new THREE.DirectionalLight(0xffffff, 1);

  light2.position.set(1, 3, 2);

  scene.add(light1);
  scene.add(light2);
}

function createGlobe() {
  // create texture
  const textureLoader = new THREE.TextureLoader();
  // Add basic texture
  const texture = textureLoader.load('./images/earthMap-2.jpg');
  // Add some 'depth' to the texture
  const bumpMap = textureLoader.load('./images/earthBump.jpg');
  // Add shininess to the globe, allowing reflectivity off of the lights
  const specularMap = textureLoader.load('./images/earthSpec.jpg');

  const earthMaterialSetting = {
    map: texture,
    bumpMap: bumpMap,
    bumpScale: 2,
    specularMap: specularMap
  };

  // create mesh with sphere geometry and material with custom setting above
  const earthGeometry = new THREE.SphereGeometry(50, 50, 50);
  const earthMaterial = new THREE.MeshPhongMaterial(earthMaterialSetting);

  globe = new THREE.Mesh(earthGeometry, earthMaterial);
  globe.rotation.x = 0.5;
  globe.rotation.y = -1.5;

  scene.add(globe);
}

function createCloud() {
  const textureLoader = new THREE.TextureLoader();
  const cloudTexture = textureLoader.load('./images/earthCloud.jpg');
  const cloudMaterialSetting = {
    color: 0xffffff,
    map: cloudTexture,
    transparent: true,
    opacity: 0.15
  };

  const cloudGeometry = new THREE.SphereGeometry(50, 50, 50);
  const cloudMaterial = new THREE.MeshLambertMaterial(cloudMaterialSetting);
  const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);

  cloud.scale.set(1.01, 1.01, 1.01);
  scene.add(cloud);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  initControls(camera);
  renderer.render(scene, camera);
}

// Spacebar event
document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    const randomNumber = getNumber();

    renderer.setClearColor(colors[randomNumber]);
  }
});

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

// Helpers
function getNumber() {
  return (getNumber.number = Math.floor(Math.random() * 14)) === getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
}
