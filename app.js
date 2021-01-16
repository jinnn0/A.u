import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls';
<<<<<<< HEAD
import { GLTFLoader } from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

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
=======

// prettier-ignore
const colors = ['#4080ff','#ffe940','#40ffff', '#374cae', '#fed1ff','#ee00f2','#f25100','#374cae','#d2d1ff', '#ffa929','#cfff4a','#fff200','#8efabf','#0026ff','#ff4f6f'];

// Sample coordinates
const coordinates = [
  [48.8567, 2.3508], // Paris
  [51.507222, -0.1275], // London
  [34.05, -118.25], // LA
  [41.836944, -87.684722], // Chicago
  [35.683333, 139.683333], // Tokyo
  [33.333333, 44.383333], // Bagdad
  [40.7127, -74.0059], // New York
  [55.75, 37.616667], // Moscow
  [35.9078, 127.7669], // South Korea
  [53.1424, 7.6921], // Ireland
  [52.366667, 4.9], // Amsterdam
  [59.3293, 18.0686], // Stockholm
  [55.6761, 12.5683] // Copenhagen
];

let renderer, scene, camera, controls;
let textures = {};
let radius = 1;
let globe;
let earth;
let cloud;
let pin;

const width = window.innerWidth;
const height = window.innerHeight;

setup();
addGlobe();
createPin();
coordinates.forEach((place) => addPin(place[0], place[1]));

const geometry = new THREE.BoxBufferGeometry(1, 0.2, 1, 32, 8, 32);
const material = new THREE.MeshPhongMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

animate();

// Setup
function setup() {
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor('#374cae');
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // Sence
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 2.5);

  // Controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;

  // Light
  const light1 = new THREE.AmbientLight(0x404040);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.9);
  light2.position.set(1, 3, 2);

  scene.add(light1);
  scene.add(light2);

  // Loading
  const manager = new THREE.LoadingManager();
  manager.onLoad = () => {
    setTimeout(() => (renderer.domElement.style.opacity = '1'));
  };

  // texture
  const textureLoader = new THREE.TextureLoader(manager);

  textures.earthMap = textureLoader.load('./images/earthMap.jpg');
  textures.earthBump = textureLoader.load('./images/earthBump.jpg');
  textures.earthSpec = textureLoader.load('./images/earthSpec.jpg');
  textures.cloudMap = textureLoader.load('./images/earthCloud.jpg');
}

// Add globe to the scene
function addGlobe() {
  globe = new THREE.Group();

  // Earth
  const earthTexture = {
    map: textures.earthMap,
    bumpMap: textures.earthBump,
    bumpScale: 0.05,
    specularMap: textures.earthSpec
  };

  const earthGeoMetry = new THREE.SphereGeometry(radius, 60, 60);
  const earthMaterial = new THREE.MeshPhongMaterial(earthTexture);
  earth = new THREE.Mesh(earthGeoMetry, earthMaterial);

  // Cloud
  const cloudTexture = {
    map: textures.cloudMap,
    transparent: true,
    opacity: 0.15
  };

  const cloudGeometry = new THREE.SphereGeometry(radius, 60, 60);
  const cloudMaterial = new THREE.MeshPhongMaterial(cloudTexture);
  cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);

  cloud.scale.set(1.01, 1.01, 1.01);
  cloud.rotation.x = 10;
  cloud.rotation.y = 10;
  cloud.rotation.z = 6;

  globe.rotation.x = 0.6;
  globe.rotation.y = -1.5;

  globe.add(earth);
  globe.add(cloud);

  scene.add(globe);
}

// Create pin object
function createPin() {
  pin = new THREE.Group();

  const coneRadius = 0.005;
  const coneHeight = 0.05;
  const sphereRadius = 0.02;

  const material = new THREE.MeshPhongMaterial({ color: 0xbab68f });

  const cone = new THREE.Mesh(new THREE.ConeBufferGeometry(coneRadius, coneHeight, 8, 1, true), material);
  const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(sphereRadius, 16, 8), material);

  cone.position.y = coneHeight * 0.5;
  cone.rotation.x = Math.PI;

  sphere.position.y = coneHeight * 0.95 + sphereRadius;

  pin.add(cone);
  pin.add(sphere);

  return pin;
}

// Add pin onto the globe
function addPin(lat, lon) {
  const pin = createPin();

  let latRad = lat * (Math.PI / 180);
  let lonRad = -lon * (Math.PI / 180);

  pin.position.set(
    Math.cos(latRad) * Math.cos(lonRad) * radius,
    Math.sin(latRad) * radius,
    Math.cos(latRad) * Math.sin(lonRad) * radius
  );

  pin.rotation.set(0.0, -lonRad, latRad - Math.PI * 0.5);

  globe.add(pin);
}

function animate() {
  requestAnimationFrame(animate);
>>>>>>> project4

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
