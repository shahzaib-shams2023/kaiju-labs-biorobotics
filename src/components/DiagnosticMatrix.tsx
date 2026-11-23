import React, { useState } from 'react';
import { Cpu, ShieldCheck, Activity, Wifi, CheckCircle, RefreshCw } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

interface Subsystem {
  id: string;
  name: string;
  status: string;
  metric: string;
  metricLabel: string;
  efficiency: number;
  description: string;
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: 'myomer',
    name: 'Artificial Muscle & Carbon Skeleton',
    status: 'ONLINE',
    metric: '98.4%',
    metricLabel: 'Biomimetic Actuation Efficiency',
    efficiency: 98.4,
    description: 'Electroactive polymer synthetic myomer bundles providing 12,000 Newtons of directional force at 0.002s response latency.',
  },
  {
    id: 'lidar',
    name: 'Quantum Lidar & Abyss Sonar Array',
    status: 'CALIBRATED',
    metric: '850 m',
    metricLabel: 'Turbid Water Range',
    efficiency: 94.2,
    description: 'Multi-frequency continuous wave optical radar mapping 3D terrain topography through zero-visibility silt and hydrothermal chimneys.',
  },
  {
    id: 'reactor',
    name: 'Cryo-Hydrogen Fuel Cell & Core',
    status: 'ACTIVE',
    metric: '1.42 MW',
    metricLabel: 'Max Continuous Power Output',
    efficiency: 99.1,
    description: 'Supercritical solid-state fuel cell with 180-day autonomous operational endurance without thermal degradation.',
  },
  {
    id: 'neural',
    name: 'Swarm Mesh Neural Compute Core',
    status: 'SYNCHRONIZED',
    metric: '128 TOPS',
    metricLabel: 'On-Board Edge Inference',
    efficiency: 97.6,
    description: 'Neuromorphic spike processor executing real-time obstacle avoidance and autonomous mission re-routing.',
  },
];

export const DiagnosticMatrix: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>('myomer');
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTestSystem = (id: string) => {
    cyberAudio.playTacticalBeep(1100);
    setTestingId(id);
    setTimeout(() => {
      setTestingId(null);
      cyberAudio.playTacticalBeep(1600);
    }, 1200);
  };

  const activeSubsystem = SUBSYSTEMS.find((s) => s.id === selectedSystem)!;

  return (
    <section id="diagnostics-section" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyber-neon tracking-widest uppercase mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>DIAGNOSTIC MATRIX // SPECIMEN HARDWARE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-100">
            Subsystem <span className="text-cyber-cyan">Telemetry</span> Audit
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
          Real-time health audits across the bio-mimetic propulsion, quantum perception arrays, and neuromorphic compute core.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Subsystems List */}
        <div className="lg:col-span-5 space-y-3">
          {SUBSYSTEMS.map((sub) => {
            const isSelected = selectedSystem === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  cyberAudio.playTacticalBeep(900);
                  setSelectedSystem(sub.id);
                }}
                className={`w-full p-4 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'cyber-panel-neon border-cyber-neon/60 text-slate-100'
                    : 'cyber-panel border-cyber-border text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-slate-100">{sub.name}</span>
                  <span className="font-mono text-[10px] text-cyber-neon px-2 py-0.5 rounded bg-cyber-neon/10 border border-cyber-neon/30">
                    {sub.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{sub.metricLabel}</span>
                  <span className="text-cyber-cyan font-bold">{sub.metric}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Telemetry Card */}
        <div className="lg:col-span-7 cyber-panel p-6 sm:p-8 rounded-3xl border-cyber-border flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-border pb-4">
              <span className="font-mono text-xs text-cyber-cyan uppercase">SUBSYSTEM DIAGNOSTIC INSPECTOR</span>
              <span className="font-mono text-xs text-slate-400">ID: {activeSubsystem.id.toUpperCase()}</span>
            </div>

            <h3 className="font-display text-2xl font-black text-slate-100">
              {activeSubsystem.name}
            </h3>

            <p className="font-mono text-xs text-slate-300 leading-relaxed">
              {activeSubsystem.description}
            </p>

            {/* Performance Bar */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">OPERATIONAL EFFICIENCY</span>
                <span className="text-cyber-neon font-bold">{activeSubsystem.efficiency}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-neon transition-all duration-500"
                  style={{ width: `${activeSubsystem.efficiency}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-center justify-between pt-6 border-t border-cyber-border">
            <div className="font-mono text-xs text-slate-400">
              <span>LAST HARDWARE PING: </span>
              <span className="text-slate-200">12 ms ago</span>
            </div>

            <button
              onClick={() => handleTestSystem(activeSubsystem.id)}
              disabled={testingId !== null}
              className="px-5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-cyan/50 hover:border-cyber-cyan text-cyber-cyan font-mono text-xs tracking-wider uppercase transition-all flex items-center space-x-2"
            >
              {testingId === activeSubsystem.id ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyber-neon" />
                  <span>AUDITING FREQUENCY...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-cyber-neon" />
                  <span>RUN PULSE AUDIT</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
