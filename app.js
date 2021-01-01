import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.querySelector('canvas');

const colors = [
  '#4080ff',
  '#ffe940',
  '#40ffff',
  '#fed1ff',
  '#ee00f2',
  '#f25100',
  '#d2d1ff',
  '#ffa929',
  '#cfff4a',
  '#fff200',
  '#8efabf',
  '#0026ff',
  '#ff4f6f'
];

let renderer, camera, scene;
let sphere;
let material;

function init() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setClearColor('white');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  // light
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(100, 100, 100);
  spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;
  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 30;
  scene.add(spotLight);

  // sphere
  // material
  material = new THREE.MeshPhongMaterial({
    color: new THREE.Color('rgb(35,35,213)'),
    specular: new THREE.Color('rgb(93,195,255)'),
    shininess: 1,
    wireframe: 1,
    transparent: true,
    opacity: 0.5
  });

  const geometry2 = new THREE.SphereGeometry(2, 10, 10, 0, Math.PI * 2, 0, Math.PI);
  sphere = new THREE.Mesh(geometry2, material);
  scene.add(sphere);
}

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;

  if (resizeRendererToDisplaySize()) {
    // 1. fix stretchy problem
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    // 2. fix low resolution problem
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  }

  renderer.render(scene, camera);
}

init();
animate();

function resizeRendererToDisplaySize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;

  return needResize;
}

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    const randomNumber = getNumber();
    console.log(randomNumber, Object.entries(getNumber));
    material.color = new THREE.Color(colors[randomNumber]);
  }
});

/* util functions */
function getNumber() {
  return (getNumber.number = Math.floor(Math.random() * 14)) === getNumber.lastNumber
    ? getNumber()
    : (getNumber.lastNumber = getNumber.number);
}
