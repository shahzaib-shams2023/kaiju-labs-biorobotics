import React from 'react';
import { Terminal, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-cyber-bg border-t border-cyber-border pt-16 pb-12 px-4 sm:px-8 font-mono text-xs text-slate-500">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-base text-slate-100 tracking-wider">
                KAIJU LABS
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30 text-[9px]">
                K-09
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed font-sans text-xs">
              Autonomous Bio-Robotics & Synthetic Ecology. Speculative deep-frontier exploration technology.
            </p>
            <div className="text-[10px] text-cyber-neon">
              CLASSIFICATION: PUBLIC SPECIMEN DOSSIER
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-wider text-xs">SPECIFICATIONS</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>Biomimetic Myomer Actuation</li>
              <li>Dual-Spectrum Lidar & Sonar</li>
              <li>1.42 MW Cryo-Hydrogen Core</li>
              <li>128 TOPS Neuromorphic Edge Core</li>
              <li>11,200 m Depth Tolerance</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-wider text-xs">TELEMETRY UPLINK</h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div>Uplink Node: Pacific Trench Array 4</div>
              <div>Frequency: 1420.405 MHz (Hydrogen Line)</div>
              <div>Status: Continuous Telemetry Stream</div>
              <div className="text-cyber-cyan pt-1">telemetry@kaiju-labs.internal</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-slate-200 uppercase tracking-wider text-xs">ASSET CREDITS</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              3D Apex Drone model based on Khronos Group "DamagedHelmet" (CC-BY 4.0 by thebluetests).
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-cyber-border hover:border-cyber-neon hover:text-cyber-neon transition-colors text-[11px]"
              >
                <span>ASCEND TO SURFACE</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-cyber-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px]">
          <div>
            © {new Date().getFullYear()} KAIJU LABS BIO-ROBOTICS COLLECTIVE. MIT OPEN RESEARCH.
          </div>
          <div className="flex items-center space-x-4 text-slate-500">
            <span>WEBGL GLTF SHADER PIPELINE</span>
            <span>WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
