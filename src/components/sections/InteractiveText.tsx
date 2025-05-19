import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useTheme } from '../../contexts/ThemeContext';

const InteractiveText: React.FC = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    sceneRef.current = new THREE.Scene();
    
    // Initialize camera
    cameraRef.current = new THREE.PerspectiveCamera(
      65,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      10000
    );
    cameraRef.current.position.set(0, 0, 100);

    // Initialize renderer
    rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    rendererRef.current.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(rendererRef.current.domElement);

    // Load font and create text
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const text = 'HOVER ME';
      const geometry = new TextGeometry(text, {
        font: font,
        size: 10,
        depth: 0,
        curveSegments: 4,
        bevelEnabled: false,
      });

      geometry.center();

      // Create particles from text geometry
      const positions = [];
      const colors = [];
      const sizes = [];
      
      const vertices = geometry.attributes.position.array;
      for (let i = 0; i < vertices.length; i += 3) {
        positions.push(vertices[i], vertices[i + 1], vertices[i + 2]);
        colors.push(1, 1, 1);
        sizes.push(1);
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
      });

      if (particlesRef.current) {
        sceneRef.current?.remove(particlesRef.current);
      }

      particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
      sceneRef.current?.add(particlesRef.current);
    });

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (particlesRef.current) {
        const time = Date.now() * 0.001;
        const positions = particlesRef.current.geometry.attributes.position.array;
        const colors = particlesRef.current.geometry.attributes.color.array;

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          // Add wave effect
          positions[i + 1] = y + Math.sin(time + x * 0.1) * 0.3;

          // Update colors based on position
          const hue = (time + x * 0.1) % 1;
          const color = new THREE.Color().setHSL(hue, 0.5, 0.5);
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        particlesRef.current.geometry.attributes.color.needsUpdate = true;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !particlesRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const distance = Math.sqrt(
          Math.pow(mouseX * 50 - positions[i], 2) +
          Math.pow(mouseY * 50 - positions[i + 1], 2)
        );

        if (distance < 10) {
          positions[i + 2] = (10 - distance) * 2;
        } else {
          positions[i + 2] *= 0.95;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(frameRef.current);
      if (rendererRef.current && rendererRef.current.domElement.parentNode) {
        rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`w-full h-[40vh] md:h-[50vh] relative ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className={`text-sm font-mono uppercase tracking-wider ${
          darkMode ? 'text-white/30' : 'text-black/30'
        }`}>
          Move your mouse over the text
        </p>
      </div>
    </div>
  );
};

export default InteractiveText; 