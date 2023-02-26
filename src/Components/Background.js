import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import space from './JPEG/space.jpg'


function Background() {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    sceneRef.current.appendChild( renderer.domElement );
    camera.position.z = 30;

    const pointLight = new THREE.PointLight( 0xffffff );
    pointLight.position.set( 5, 5, 5 );
    const ambiateLight = new THREE.AmbientLight( 0xffffff );
    scene.add( pointLight, ambiateLight );

    const controls = new OrbitControls( camera, renderer.domElement );

    function addStars() {
      const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
      const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
      const star = new THREE.Mesh( geometry, material );

      const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread(100));
      
      star.position.set(x, y, z);
      scene.add(star)
    }

    Array(200).fill().forEach(addStars);

    // load a texture
    const spaceBG = new THREE.TextureLoader().load(space);
    scene.background = spaceBG;

    function animate() {
      requestAnimationFrame( animate );
      
      renderer.render( scene, camera );
      
      controls.update();
    }
    animate();
  }, []);

  return <div ref={ sceneRef } />;
}

export default Background;
