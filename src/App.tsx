import reactLogo from './assets/react.svg'
import './App.css'
import * as THREE from "three";
import { useEffect } from 'react';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
	let canvas: HTMLCanvasElement;
	let model: THREE.Group;

	useEffect(() => {
		canvas = document.getElementById("canvas") as HTMLCanvasElement;
		const sizes = {
			width: innerWidth,
			height: innerHeight,
		};
		//scene
		const scene: THREE.Scene = new THREE.Scene();

		//camera
		const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
			75,
			sizes.width / sizes.height,
			0.1,
			1000
		);
		camera.position.set(-0.5, 0.1, 1);

		//renderer
		const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(window.devicePixelRatio);

		// const pointLight = new THREE.PointLight(0xFFFFFF, 1);
		// scene.add(pointLight);
		const light = new THREE.AmbientLight(0xFFFFFF, 18.0);
		scene.add(light);

		const gltfLoader = new GLTFLoader();
		gltfLoader.load("./models/model/scene.gltf", (gltf) => {
			model = gltf.scene;
			model.scale.set(1, 1, 1);
			model.rotation.y = Math.PI / -4;
			scene.add(model);
		});

		const tick = () => {
			renderer.render(scene, camera);
			requestAnimationFrame(tick);
		};
		tick();
	},[]);
	return (
		<>
			<canvas id="canvas"></canvas>
			<div className="mainContent">
				<h1>WEB DEVELOPER</h1>
				<p>Three.js</p>
			</div>
		</>
	)
}

export default App
