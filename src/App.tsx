import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { TelemetryHUD } from './components/TelemetryHUD';
import { Hero } from './components/Hero';
import { DiagnosticMatrix } from './components/DiagnosticMatrix';
import { MissionSimulator } from './components/MissionSimulator';
import { Footer } from './components/Footer';
import { VisionMode } from './components/DroneCanvas';

export function App() {
  const [visionMode, setVisionMode] = useState<VisionMode>('tactical');
  const [targetCoords, setTargetCoords] = useState({ az: 0, el: 0, dist: 4.8 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  const scrollToDiagnostics = () => {
    const el = document.getElementById('diagnostics-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMission = () => {
    const el = document.getElementById('mission-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 font-sans selection:bg-cyber-neon selection:text-cyber-bg">
      <TelemetryHUD
        visionMode={visionMode}
        onVisionModeChange={setVisionMode}
        targetCoords={targetCoords}
        onOpenDeploy={scrollToMission}
      />

      <main id="main-content">
        <Hero
          visionMode={visionMode}
          targetCoords={targetCoords}
          onTargetUpdate={setTargetCoords}
          onExploreDiagnostics={scrollToDiagnostics}
          onOpenDeploy={scrollToMission}
        />

        <DiagnosticMatrix />

        <MissionSimulator />
      </main>

      <Footer />
    </div>
  );
}

export default App;
