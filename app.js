import * as THREE from './node_modules/three/build/three.module.js';

const canvas = document.querySelector('canvas');

let renderer, camera, scene;
let sphere;

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
  function Mat() {
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color('rgb(35,35,213)'),
      emissive: new THREE.Color('rgb(64,128,255)'),
      specular: new THREE.Color('rgb(93,195,255)'),
      shininess: 1,
      shading: THREE.FlatShading,
      wireframe: 1,
      transparent: 1,
      opacity: 0.15
    });
    return material;
  }

  const geometry2 = new THREE.SphereGeometry(2, 40, 40, 0, Math.PI * 2, 0, Math.PI);
  sphere = new THREE.Mesh(geometry2, Mat());
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
