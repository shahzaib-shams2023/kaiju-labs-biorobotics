import React, { useState } from 'react';
import { VisionMode } from './DroneCanvas';
import { cyberAudio } from '../utils/audio';
import { Activity, Radio, Eye, Flame, ShieldAlert, Cpu, Crosshair, Volume2, VolumeX } from 'lucide-react';

interface TelemetryHUDProps {
  visionMode: VisionMode;
  onVisionModeChange: (mode: VisionMode) => void;
  targetCoords: { az: number; el: number; dist: number };
  onOpenDeploy: () => void;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  visionMode,
  onVisionModeChange,
  targetCoords,
  onOpenDeploy,
}) => {
  const [audioActive, setAudioActive] = useState<boolean>(false);

  const handleAudioToggle = () => {
    const active = cyberAudio.toggleAudio();
    setAudioActive(active);
  };

  const handleModeChange = (mode: VisionMode) => {
    cyberAudio.playTacticalBeep(mode === 'lidar' ? 1400 : mode === 'thermal' ? 600 : 900);
    onVisionModeChange(mode);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Tactical Callout */}
        <div className="pointer-events-auto flex items-center space-x-3 cyber-panel px-4 py-2 rounded-xl border-cyber-border">
          <div className="w-2.5 h-2.5 rounded-full bg-cyber-neon animate-ping" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <span className="font-display font-black text-sm tracking-widest text-slate-100">
                KAIJU LABS
              </span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyber-neon/10 text-cyber-neon border border-cyber-neon/30">
                K-09 APEX
              </span>
            </div>
            <span className="font-mono text-[9px] text-slate-400 tracking-wider">
              AUTONOMOUS BIO-ROBOTICS
            </span>
          </div>
        </div>

        {/* Center: Real-Time Vector Targeting Readout */}
        <div className="hidden lg:flex pointer-events-auto items-center space-x-6 cyber-panel px-6 py-2 rounded-xl text-xs font-mono text-slate-300">
          <div className="flex items-center space-x-2">
            <Crosshair className="w-3.5 h-3.5 text-cyber-neon" />
            <span className="text-slate-400">AZIMUTH:</span>
            <span className="text-cyber-neon font-bold">{targetCoords.az}°</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">ELEVATION:</span>
            <span className="text-cyber-cyan font-bold">{targetCoords.el}°</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">RANGE:</span>
            <span className="text-slate-100 font-bold">{targetCoords.dist} m</span>
          </div>
        </div>

        {/* Right: Vision Modes & Audio Toggle */}
        <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-3">
          {/* Vision Mode Buttons */}
          <div className="cyber-panel p-1 rounded-xl flex items-center space-x-1">
            <button
              onClick={() => handleModeChange('tactical')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider flex items-center space-x-1.5 transition-all ${
                visionMode === 'tactical'
                  ? 'bg-slate-700 text-slate-100 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Standard PBR Surface Shader"
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">PBR</span>
            </button>

            <button
              onClick={() => handleModeChange('lidar')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider flex items-center space-x-1.5 transition-all ${
                visionMode === 'lidar'
                  ? 'bg-cyber-neon/20 text-cyber-neon border border-cyber-neon/50 font-bold shadow-neon-glow'
                  : 'text-slate-400 hover:text-cyber-neon'
              }`}
              title="Holographic Lidar Wireframe"
            >
              <Activity className="w-3 h-3" />
              <span className="hidden sm:inline">LIDAR</span>
            </button>

            <button
              onClick={() => handleModeChange('thermal')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider flex items-center space-x-1.5 transition-all ${
                visionMode === 'thermal'
                  ? 'bg-cyber-crimson/20 text-cyber-crimson border border-cyber-crimson/50 font-bold'
                  : 'text-slate-400 hover:text-cyber-crimson'
              }`}
              title="Infrared Thermal Matrix"
            >
              <Flame className="w-3 h-3" />
              <span className="hidden sm:inline">THERMAL</span>
            </button>
          </div>

          {/* Audio Synthesizer */}
          <button
            onClick={handleAudioToggle}
            className={`p-2 rounded-xl cyber-panel transition-all ${
              audioActive
                ? 'border-cyber-cyan text-cyber-cyan shadow-cyan-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle cybernetic reactor hum & telemetry sweep"
            aria-label="Toggle Cyber Audio"
          >
            {audioActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mission Deploy CTA */}
          <button
            onClick={onOpenDeploy}
            className="px-4 py-2 rounded-xl bg-cyber-neon text-cyber-bg font-display font-black text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-neon-glow"
          >
            DEPLOY
          </button>
        </div>
      </div>
    </header>
  );
};
