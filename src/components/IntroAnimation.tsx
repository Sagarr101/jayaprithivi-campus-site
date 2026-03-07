"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { FontLoader, Font } from "three-stdlib";
import { TextGeometry } from "three-stdlib";

const PARTICLE_COUNT = 3000;
const COLORS = ["#00ffff", "#00bfff", "#1e90ff", "#48d1cc", "#00eaff"];

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
  angle?: number;
  radius?: number;
}

interface ParticleVortexProps {
  logoReveal: boolean;
  onLogoFormed?: () => void;
}

const ParticleVortex: React.FC<ParticleVortexProps> = ({ logoReveal, onLogoFormed }) => {
  const mesh = useRef<THREE.Group>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [logoParticles, setLogoParticles] = useState<Particle[]>([]);
  const [formingLogo, setFormingLogo] = useState(false);

  useEffect(() => {
    // Generate spiral vortex positions
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = i * 0.07;
      const radius = 6 - (i / PARTICLE_COUNT) * 5.5;
      const y = (Math.random() - 0.5) * 2;
      arr.push({
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        color: COLORS[i % COLORS.length],
        angle,
        radius,
      });
    }
    setParticles(arr);
  }, []);

  useEffect(() => {
    if (logoReveal) {
      setFormingLogo(true);
      // Generate logo text points
      const text = "Jaya Prithivi Campus";
      const fontLoader = new FontLoader();
      fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", (font: Font) => {
        const textGeo = new TextGeometry(text, {
          font,
          size: 1.2,
          height: 0.1,
        });
        const pos = textGeo.attributes.position;
        const positions: Particle[] = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const idx = i % pos.count;
          positions.push({
            x: pos.getX(idx) * 0.1,
            y: pos.getY(idx) * 0.1,
            z: pos.getZ(idx) * 0.1,
            color: COLORS[i % COLORS.length],
          });
        }
        setLogoParticles(positions);
        setTimeout(() => {
          onLogoFormed && onLogoFormed();
        }, 1800);
      });
    }
  }, [logoReveal, onLogoFormed]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.2;
    mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <group ref={mesh}>
      {formingLogo && logoParticles.length > 0
        ? logoParticles.map((p, i) => (
            <mesh key={i} position={[p.x, p.y, p.z]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial color={p.color} />
            </mesh>
          ))
        : particles.map((p, i) => (
            <mesh key={i} position={[p.x, p.y, p.z]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshBasicMaterial color={p.color} />
            </mesh>
          ))}
    </group>
  );
}

interface IntroAnimationProps {
  onFinish?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinish }) => {
  const [logoReveal, setLogoReveal] = useState(false);
  const [logoFormed, setLogoFormed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => setLogoReveal(true), 3000);
    const timer2 = setTimeout(() => setLogoFormed(true), 4800);
    const timer3 = setTimeout(() => {
      setShowAnimation(false);
      onFinish && onFinish();
    }, 6000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {showAnimation && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[0, 0, 10]} intensity={2} color="#00bfff" />
            <ParticleVortex logoReveal={logoReveal} onLogoFormed={() => setLogoFormed(true)} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          {logoReveal && (
            <Html center>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-4xl md:text-6xl font-extrabold text-cyan-400 drop-shadow-lg mt-8"
                style={{ filter: "glow(0.5em)" }}
              >
                Jaya Prithivi Campus
              </motion.div>
            </Html>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
  export default IntroAnimation;

