// /components/ThreeCanvas.js
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Shudhu browser-e cholbe, server-e noy
    if (typeof window === 'undefined') return;

    let scene, camera, renderer, particlesCyan, particlesViolet;
    let scrollY = 0;
    let mouseX = 0, mouseY = 0;

    // 3D scene toiri korar function
    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({
        canvas: mountRef.current,
        alpha: true, // Transparent background
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // CSS theke color-gulo newa hocche
      const computedStyle = getComputedStyle(document.documentElement);
      const cyanColor = new THREE.Color(computedStyle.getPropertyValue('--neon-cyan').trim());
      const violetColor = new THREE.Color(computedStyle.getPropertyValue('--plasma-violet').trim());

      // Du'to alada particle system toiri kora hocche
      particlesCyan = createParticleSystem(5000, cyanColor, 0.02);
      particlesViolet = createParticleSystem(3000, violetColor, 0.025);
      scene.add(particlesCyan);
      scene.add(particlesViolet);
    };
    
    // Ekta particle system toiri korar helper function
    const createParticleSystem = (count, color, size) => {
      const positions = new Float32Array(count * 3);
      for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 25; // Particle-gulor position set kora
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        color, size, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      });
      return new THREE.Points(geometry, material);
    };

    // Browser window resize hole canvas-ke adjust kora
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mouse move korle position track kora
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll korle position track kora
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    // Event listener-gulo add kora hocche
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const clock = new THREE.Clock();
    // Prottek frame-e animation chalate hobe
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (particlesCyan) {
        particlesCyan.rotation.y = elapsedTime * 0.03;
        particlesCyan.material.size = Math.sin(elapsedTime * 0.5) * 0.005 + 0.02;
      }
      if (particlesViolet) {
        particlesViolet.rotation.y = -elapsedTime * 0.02;
        particlesViolet.rotation.x = elapsedTime * 0.015;
        particlesViolet.material.size = Math.cos(elapsedTime * 0.7) * 0.005 + 0.025;
      }
      
      // Mouse o scroll position onujayi camera move kora
      camera.position.z = 10 - scrollY * 0.01;
      camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    init();
    animate();

    // Component unmount hole event listener remove kora hocche
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={mountRef} id="main-3d-canvas" />;
};

export default ThreeCanvas;
