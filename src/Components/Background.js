import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import space from './JPEG/space 3.jpg';
import donut from './JPEG/donut.jpg';
import starpng from './JPEG/starpng.png';


function Background() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    sceneRef.current.appendChild( renderer.domElement );
    camera.position.z = 30;

    // Torus shape
    const trousTexture = new THREE.TextureLoader().load(donut);
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry( 10, 3, 16, 100 ),
      new THREE.MeshStandardMaterial( { map: trousTexture } )
    );
    scene.add( torus );

    // Lighting
    const pointLight = new THREE.PointLight( 0xffffff );
    pointLight.position.set( 15, 10, 5 );
    const ambiateLight = new THREE.AmbientLight( 0xffffff );
    scene.add( pointLight, ambiateLight );

    const lightHelper = new THREE.PointLightHelper( pointLight );
    const gridHelper = new THREE.GridHelper( 200, 50 );
    scene.add( lightHelper, gridHelper );

    const controls = new OrbitControls( camera, renderer.domElement );

    // Stars
    function addStars() {
      const starTexture = new THREE.TextureLoader().load(starpng)
      const star = new THREE.Mesh(
        new THREE.SphereGeometry( 0.15, 15, 15 ),
        new THREE.MeshStandardMaterial( { map: starTexture })
      );

      const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));
      
      star.position.set(x, y, z);
      scene.add(star)
    }

    Array(250).fill().forEach(addStars);

    // Planets
    function addPlanets(){
      const geometry = new THREE.SphereGeometry( 0.5, 15, 15 );
      const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
      const planet = new THREE.Mesh( geometry, material );

      const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));

      planet.position.set(x, y, z);
      scene.add(planet)
    }

    Array(10).fill().forEach(addPlanets);

    // load a texture
    const spaceBG = new THREE.TextureLoader().load(space);
    scene.background = spaceBG;

    function animate() {
      requestAnimationFrame( animate );

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      torus.rotation.z += 0.01;
      
      renderer.render( scene, camera );
      
      controls.update();
    }
    animate();
  }, []);

  return <div ref={ sceneRef } />;
}

export default Background;
