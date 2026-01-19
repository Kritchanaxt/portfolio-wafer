"use client";

import { navItems } from "@/data";
import { useState, useEffect } from "react";

import Hero from "@/components/Hero";
import Grid from "@/components/Grid";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import ThreeDLoader from "@/components/ui/ThreeDLoader";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Sound Effect Function
  const playDoorSound = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filterNode = audioCtx.createBiquadFilter();

        // Connect nodes
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Settings for "Sci-fi Door Open" effect
        // 1. Initial burst (White noise-ish using high frequency saw)
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(100, audioCtx.currentTime); 
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.5);

        // 2. Filter sweep (Lowpass opening up)
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(100, audioCtx.currentTime);
        filterNode.frequency.exponentialRampToValueAtTime(3000, audioCtx.currentTime + 0.3);

        // 3. Gain envelope (Fade in quickly, sustain bit, fade out)
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);
    } catch (e) {
        console.error("Audio play failed", e);
    }
  };

  useEffect(() => {
    // We let the animated loader handle the timing and transition
    // It will call setIsLoading(false) when the zoom animation is done
  }, []);

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      {isLoading ? (
        <ThreeDLoader onLoadingComplete={() => {
            setIsLoading(false);
            playDoorSound();
        }} />
      ) : (
        <div className="max-w-7xl w-full">
          <FloatingNav navItems={navItems} />
          <Hero />
          <Grid />
          <RecentProjects />
          <Clients />
          <Experience />
          <Approach />
          <Footer />
        </div>
      )}
    </main>
  );
};

export default Home;
