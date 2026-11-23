import React from 'react';
import { DroneCanvas, VisionMode } from './DroneCanvas';
import { Shield, Zap, Compass, Terminal, Cpu, ChevronRight } from 'lucide-react';

interface HeroProps {
  visionMode: VisionMode;
  targetCoords: { az: number; el: number; dist: number };
  onTargetUpdate: (coords: { az: number; el: number; dist: number }) => void;
  onExploreDiagnostics: () => void;
  onOpenDeploy: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  visionMode,
  targetCoords,
  onTargetUpdate,
  onExploreDiagnostics,
  onOpenDeploy,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 tactical-grid tactical-scanlines overflow-hidden">
      {/* Decorative Radar Crossings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyber-border/40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-cyber-border/20 pointer-events-none border-dashed" />

      {/* Main Split Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1">
        {/* Left Editorial Telemetry Column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-cyber-surface border border-cyber-neon/40 text-cyber-neon font-mono text-[11px] tracking-widest w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-neon animate-pulse" />
            <span>BIO-MIMETIC SPECIMEN // K-09 APEX</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-100 leading-[0.98]">
            SYNTHETIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon via-cyber-cyan to-white">
              ECOLOGY.
            </span> <br />
            AUTONOMOUS.
          </h1>

          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
            Autonomous bio-robotic scouts engineered with titanium-myomer musculoskeletal arrays. Built to navigate extreme abyssal oceanic trenches and volcanic planetary fissures without human intervention.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenDeploy}
              className="px-6 py-3 rounded-xl bg-cyber-neon text-cyber-bg font-display font-black text-xs tracking-wider uppercase hover:shadow-neon-glow hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>INITIATE DEPLOYMENT</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDiagnostics}
              className="px-6 py-3 rounded-xl cyber-panel hover:border-cyber-cyan text-slate-200 font-mono text-xs tracking-wider uppercase transition-all"
            >
              RUN SUBSYSTEM AUDIT
            </button>
          </div>

          {/* Real-time Telemetry Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cyber-border font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">REACTOR OUTPUT</span>
              <span className="text-cyber-neon font-bold text-sm">1.42 MW</span>
              <span className="text-[9px] text-slate-400 block">HYDROGEN CELL</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">DEPTH RATING</span>
              <span className="text-cyber-cyan font-bold text-sm">11,200 M</span>
              <span className="text-[9px] text-slate-400 block">CHALLENGER DEEP</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block">SWARM MESH</span>
              <span className="text-slate-100 font-bold text-sm">32 NODES</span>
              <span className="text-[9px] text-emerald-400 block">ZERO LATENCY</span>
            </div>
          </div>
        </div>

        {/* Right 3D Drone Viewport */}
        <div className="lg:col-span-7 h-[450px] sm:h-[550px] lg:h-[650px] relative rounded-3xl overflow-hidden cyber-panel border-cyber-border/80">
          <DroneCanvas
            visionMode={visionMode}
            interactive={true}
            className="w-full h-full"
            onTargetUpdate={onTargetUpdate}
          />

          {/* Interactive Mode Callout on Canvas */}
          <div className="absolute top-4 left-4 cyber-panel px-3 py-1.5 rounded-lg text-[10px] font-mono flex items-center space-x-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-cyber-neon" />
            <span className="text-slate-300 uppercase">ACTIVE MODE: {visionMode}</span>
          </div>

          <div className="absolute bottom-4 right-4 cyber-panel px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 pointer-events-none">
            TARGETING RETICLE TRACKING CURSOR
          </div>
        </div>
      </div>

      {/* Hero Bottom Status Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between font-mono text-[11px] text-slate-500 border-t border-cyber-border/40">
        <div className="flex items-center space-x-2">
          <Terminal className="w-3.5 h-3.5 text-cyber-neon" />
          <span>SYS_STATUS: OPTIMAL • NEURAL FIRMWARE V4.8.1</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <span>CLASSIFICATION: RECON-OMEGA</span>
          <span className="text-cyber-cyan">SWARM PROTOCOL ENGAGED</span>
        </div>
      </div>
    </section>
  );
};
