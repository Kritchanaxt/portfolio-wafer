"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useProgress, Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import globeData from "@/data/globe.json";

// --- Configuration ---
// Color Adaptation from Image: Deep Space Blue & Neon Purples
// Refined "Future World" Palette
const THEME = {
  land: {
    dark: "#7c3aed",    // Violet 600
    light: "#c4b5fd",   // Violet 300
  },
  ocean: {
    color: "#0f172a",   // Slate 900
  }
};

// UI Loader Component - Minimalist
function LoaderUI() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Sync with the 3s (3000ms) timer in CameraController
    const duration = 2500; // Reach 100% slightly before zoom
    const startTime = Date.now();

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let p = (elapsed / duration) * 100;
        
        if (p >= 100) {
            p = 100;
            clearInterval(interval);
        }
        setProgress(p);
    }, 20);

    return () => clearInterval(interval);
  }, []);

    return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div className="absolute bottom-0 left-0 w-full h-full flex flex-col items-center justify-end pb-12 sm:pb-24 z-50 px-4">
         {/* Cyberpunk Bracket/Frame */}
         {/* Responsive width: w-full max-w-[300px] sm:max-w-md */}
         <div className="relative p-4 sm:p-6 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-xl w-full max-w-[300px] sm:max-w-md overflow-hidden transition-all duration-300">
            {/* Animated Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent h-full w-full animate-scan"></div>

            {/* Top Corners */}
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400"></div>
            
            {/* Bottom Corners */}
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex justify-between items-end mb-2 sm:mb-3 relative z-10 w-full">
                <div className="flex flex-col">
                    <span className="text-purple-400 font-mono text-[8px] sm:text-[10px] tracking-[0.2em] mb-1">SYSTEM_STATUS</span>
                    <span className="text-white font-mono text-xs sm:text-sm tracking-wider font-bold truncate">
                        {progress < 100 ? "INITIALIZING_CORE..." : "ACCESS_GRANTED"}
                    </span>
                </div>
                <div className="text-white font-mono text-2xl sm:text-3xl font-black tracking-tighter tabular-nums text-shadow-glow flex-shrink-0 ml-2">
                   {progress.toFixed(0)}<span className="text-xs sm:text-sm text-purple-400 ml-1">%</span>
                </div>
            </div>

            {/* Glitchy Progress Bar */}
            <div className="w-full h-1 sm:h-1.5 bg-gray-900/80 rounded-full overflow-hidden relative z-10 border border-white/5">
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-violet-600 shadow-[0_0_20px_rgba(167,139,250,0.8)]"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            <div className="flex justify-between mt-2 sm:mt-3 opacity-70 relative z-10 w-full">
                 <div className="text-[8px] sm:text-[9px] text-violet-200 font-mono tracking-widest">SECURE_CONNECTION</div>
                 <div className="text-[8px] sm:text-[9px] text-violet-200 font-mono tracking-widest flex items-center">
                    V.2.0.5 <span className="animate-pulse ml-2 text-emerald-400 text-[10px]">●</span>
                 </div>
            </div>
         </div>
      </div>
    </Html>
  );
}

// Camera Controller for Zoom Effect
function CameraController({ onFinish }: { onFinish: () => void }) {
    const { camera } = useThree();
    const [startZoom, setStartZoom] = useState(false);
    
    useEffect(() => {
        // Wait for 3 seconds then start zooming
        const timer = setTimeout(() => {
            setStartZoom(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    useFrame((state, delta) => {
        if (startZoom) {
            // Smoothly move camera forward
            camera.position.z = THREE.MathUtils.lerp(camera.position.z, -2, delta * 3);
            
            // If passed the threshold, trigger finish
            if (camera.position.z < 0.5) {
                onFinish();
            }
        }
    });

    return null;
}

// Simple pseudo-noise function to generate "continents"


// Particle Sphere with Real Earth Data
function ParticleGlobe() {
    const pointsRef = useRef<THREE.Points>(null!);
    
    const particles = useMemo(() => {
        const positions: number[] = [];
        const colors: number[] = [];
        const radius = 1.8;
       
        const colorLand1 = new THREE.Color(THEME.land.dark); 
        const colorLand2 = new THREE.Color(THEME.land.light);
        const colorOcean = new THREE.Color(THEME.ocean.color);
        
        // 1. Parsing GeoJSON for Accurate Land Masses
        // @ts-ignore
        globeData.features.forEach((feature: any) => {
            const geometry = feature.geometry;
            const coordinates = geometry.coordinates;

            const processRing = (ring: any[]) => {
                for(let i = 0; i < ring.length; i++) {
                   const [lng, lat] = ring[i];
                   
                   // Add point (Spherical conversion)
                   // Phi: 0 (North) to PI (South). Theta: 0 to 2PI (around Y axis)
                   const phi = (90 - lat) * (Math.PI / 180);
                   const theta = (lng + 180) * (Math.PI / 180);
                   
                   const x = -(radius * Math.sin(phi) * Math.cos(theta));
                   const z = (radius * Math.sin(phi) * Math.sin(theta));
                   const y = (radius * Math.cos(phi));
                   
                   positions.push(x, y, z);
                   
                   // Color: Random gradient between the two purples
                   const c = Math.random() > 0.5 ? colorLand1 : colorLand2;
                   colors.push(c.r, c.g, c.b);

                   // Interpolate between points to fill gaps (High fidelity lines)
                   // Adds 4 points between every coordinate for smooth outlines
                   if (i < ring.length - 1) {
                       const [nextLng, nextLat] = ring[i+1];
                       const steps = 4; 
                       for(let j=1; j<steps; j++) {
                            const t = j/steps;
                            const iLat = lat + (nextLat - lat)*t;
                            const iLng = lng + (nextLng - lng)*t;
                            
                            const p = (90 - iLat) * (Math.PI / 180);
                            const th = (iLng + 180) * (Math.PI / 180);
                            
                            const ix = -(radius * Math.sin(p) * Math.cos(th));
                            const iz = (radius * Math.sin(p) * Math.sin(th));
                            const iy = (radius * Math.cos(p));
                            
                            positions.push(ix, iy, iz);
                             const c2 = Math.random() > 0.5 ? colorLand1 : colorLand2;
                             colors.push(c2.r, c2.g, c2.b);
                       }
                   }
                }
            };

            if (geometry.type === "Polygon") {
                coordinates.forEach(processRing);
            } else if (geometry.type === "MultiPolygon") {
                coordinates.forEach((poly: any[]) => poly.forEach(processRing));
            }
        });

        // 2. Add Ocean Particles (Sparse Background Sphere to define volume)
        // Less dense than land to emphasize the continents
        const oceanCount = 12000;
        for(let i=0; i<oceanCount; i++) {
             const theta = Math.random() * Math.PI * 2;
             const phi = Math.acos((Math.random() * 2) - 1);
             
             const x = radius * Math.sin(phi) * Math.cos(theta);
             const y = radius * Math.cos(phi); 
             const z = radius * Math.sin(phi) * Math.sin(theta);
             
             positions.push(x, y, z);
             // Dark Ocean
             colors.push(colorOcean.r, colorOcean.g, colorOcean.b);
        }

        return { 
            positions: new Float32Array(positions), 
            colors: new Float32Array(colors) 
        };
    }, []);


    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        pointsRef.current.rotation.y = time * 0.15;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particles.colors.length / 3}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015} /* Finer points for high resolution look */
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Custom Shooting Star Component
function ShootingStar() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [startPos] = useState(() => {
        const x = (Math.random() - 0.5) * 20;
        const y = (Math.random() - 0.5) * 20;
        const z = -(Math.random() * 10 + 5); 
        return new THREE.Vector3(x, y, z);
    });
    
    // Random direction
    const [speed] = useState(() => Math.random() * 0.5 + 0.5);
    const [offset] = useState(() => Math.random() * 100);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const t = (time * speed + offset) % 5; 
        
        if (t < 1) { 
             meshRef.current.visible = true;
             const progress = t; // 0 to 1
             meshRef.current.position.set(
                startPos.x + progress * 15, 
                startPos.y - progress * 15, 
                startPos.z + progress * 5
             );
             meshRef.current.scale.set(1 + progress * 2, 1, 1);
        } else {
             meshRef.current.visible = false;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[0.5, 0.05, 0.05]} />
            <meshBasicMaterial color="#Cyan" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </mesh>
    );
}

function RotatingRing({ radius, speed, color, axis, type = "solid" }: { radius: number, speed: number, color: string, axis: [number, number, number], type?: "solid" | "particles" | "dashed" }) {
    const ringRef = useRef<THREE.Mesh | THREE.Points>(null!);
    
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        ringRef.current.rotation.x = time * speed * axis[0] + Math.sin(time*0.2)*0.1;
        ringRef.current.rotation.y = time * speed * axis[1];
        ringRef.current.rotation.z = time * speed * axis[2];
    });

    if (type === "particles") {
         const particleCount = 100;
         const positions = useMemo(() => {
             const pos = new Float32Array(particleCount * 3);
             for(let i=0; i<particleCount; i++) {
                 const angle = (i / particleCount) * Math.PI * 2;
                 pos[i*3] = Math.cos(angle) * radius;
                 pos[i*3+1] = Math.sin(angle) * radius;
                 pos[i*3+2] = 0;
             }
             return pos;
         }, [radius]);
         
         return (
            <points ref={ringRef as any}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial color={color} size={0.04} transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>
         )
    }

    return (
        <mesh ref={ringRef as any}>
            <torusGeometry args={[radius, 0.015, 16, 100]} />
            <meshBasicMaterial 
                color={color} 
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );    
}

// Responsive Wrapper to scale scene on mobile
function ResponsiveGroup({ children }: { children: React.ReactNode }) {
    const { viewport } = useThree();
    const groupRef = useRef<THREE.Group>(null!);

    useFrame(() => {
         // Current Viewport width at z=0 (where objects are)
         // Max width of our scene (Rings) is approx 7 units (3.5 radius * 2)
         // We add some margin, say we need 8 units width.
         const desiredWidth = 8;
         
         if (groupRef.current) {
             let scale = 1;
             // If screen is narrower than desired width, scale down
             if (viewport.width < desiredWidth) {
                 scale = viewport.width / desiredWidth;
             }
             // Don't scale down too much on extremely small screens (keep distinct)
             scale = Math.max(0.6, scale);

             groupRef.current.scale.setScalar(scale);
         }
    })
    
    return <group ref={groupRef}>{children}</group>
}

const ThreeDLoader = ({ onLoadingComplete }: { onLoadingComplete?: () => void }) => {
  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-[#000319] overflow-hidden">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            {/* The Controller handles the zoom-in exit */}
            <CameraController onFinish={() => onLoadingComplete && onLoadingComplete()} />

            <ambientLight intensity={0.5} />
            {/* Holographic lighting */}
            <pointLight position={[0, 0, 0]} intensity={5} color="#c4b5fd" distance={10} />
            
            {/* Deep Galaxy Background */}
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={500} scale={15} size={1} speed={0.4} opacity={0.5} color="#4db5ff" />
            
            <ShootingStar />
            <ShootingStar />

            <ResponsiveGroup>
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                    {/* Center Hologram Object - No solid core */}
                    <ParticleGlobe />
                    
                    {/* Holographic Rings - Updated to Purple/Violet Theme */}
                    <RotatingRing radius={2.5} speed={0.2} color="#7c3aed" axis={[1, 0.2, 0]} type="solid" />
                    <RotatingRing radius={3.0} speed={-0.1} color="#c4b5fd" axis={[0.2, 1, 0.2]} type="particles" />
                    <RotatingRing radius={3.5} speed={0.15} color="#4c1d95" axis={[0, 0.2, 1]} type="solid" />
                </Float>
            </ResponsiveGroup>

            <LoaderUI />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDLoader;
