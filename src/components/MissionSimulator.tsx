import React, { useState } from 'react';
import { Rocket, CheckCircle2, AlertTriangle, Play, RefreshCcw } from 'lucide-react';
import { cyberAudio } from '../utils/audio';

const MISSIONS = [
  {
    id: 'abyss',
    theater: 'CHALLENGER DEEP // 11,000M',
    codename: 'OPERATION HADAL EYE',
    target: 'Sub-sea hydrothermal vent cluster 09-Alpha',
    hazard: '1,100 atm hydrostatic pressure & volcanic sulfur toxicity',
    payload: 'Seismic Micro-Sensors & Autonomous Acoustic Nodes',
  },
  {
    id: 'lava-tube',
    theater: 'OLYMPUS MONS // SECTOR 4',
    codename: 'OPERATION PYROCLAST',
    target: 'Volcanic subsurface subterranean basalt cave system',
    hazard: 'Cryogenic night temperatures & extreme ionizing radiation',
    payload: 'Spectrometric Sub-Surface Drill & Lidar Cartographer',
  },
  {
    id: 'debris',
    theater: 'LOW EARTH ORBIT // 420KM',
    codename: 'OPERATION AEGIS VECTOR',
    target: 'Hyper-velocity derelict rocket upper stage interception',
    hazard: '7.8 km/s kinetic debris & atomic oxygen erosion',
    payload: 'Electromagnetic Harpoon & De-Orbit Thruster Pod',
  },
];

export const MissionSimulator: React.FC = () => {
  const [activeMission, setActiveMission] = useState<string>('abyss');
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'deployed'>('idle');
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const mission = MISSIONS.find((m) => m.id === activeMission)!;

  const runSimulation = () => {
    cyberAudio.playTacticalBeep(1200);
    setSimulationState('running');
    setSimLogs(['INITIALIZING APEX K-09 MISSION PROTOCOL...']);

    setTimeout(() => {
      setSimLogs((prev) => [...prev, 'CONNECTING TO ORBITAL TELEMETRY UPLINK... [STABLE]']);
      cyberAudio.playTacticalBeep(1400);
    }, 700);

    setTimeout(() => {
      setSimLogs((prev) => [...prev, `THEATER VERIFIED: ${mission.theater}`]);
      cyberAudio.playTacticalBeep(1500);
    }, 1400);

    setTimeout(() => {
      setSimLogs((prev) => [...prev, 'SYNTHETIC MYOMER PRESSURIZATION: 100% NOMINAL']);
      cyberAudio.playTacticalBeep(1800);
    }, 2100);

    setTimeout(() => {
      setSimLogs((prev) => [...prev, '>>> PAYLOAD DEPLOYED. AUTONOMOUS MISSION ENGAGED.']);
      cyberAudio.playRadarSweep();
      setSimulationState('deployed');
    }, 2800);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setSimLogs([]);
  };

  return (
    <section id="mission-section" className="py-24 px-4 sm:px-8 bg-cyber-surface/50 border-t border-b border-cyber-border">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyber-neon tracking-widest uppercase">
            <Rocket className="w-3.5 h-3.5" />
            <span>MISSION PROTOCOLS // AUTONOMOUS THEATER</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-100">
            Mission <span className="text-cyber-neon">Deployment</span> Simulator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono leading-relaxed">
            Configure target environmental theater and launch autonomous reconnaissance deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mission Selection Column */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block">
              SELECT DEPLOYMENT THEATER
            </span>
            {MISSIONS.map((m) => {
              const isSelected = activeMission === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    cyberAudio.playTacticalBeep(850);
                    setActiveMission(m.id);
                    resetSimulation();
                  }}
                  className={`w-full p-4 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'cyber-panel-neon border-cyber-neon text-slate-100'
                      : 'cyber-panel border-cyber-border text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-cyber-cyan">{m.codename}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      THEATER {m.id.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-slate-100">{m.theater}</h4>
                </button>
              );
            })}
          </div>

          {/* Interactive Simulation Terminal */}
          <div className="lg:col-span-7 cyber-panel p-6 sm:p-8 rounded-3xl border-cyber-border space-y-6">
            <div className="flex items-center justify-between border-b border-cyber-border pb-4">
              <div>
                <span className="font-mono text-[10px] text-slate-500 block uppercase">TARGET CODENAME</span>
                <span className="font-display font-black text-lg text-cyber-neon">{mission.codename}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">SIM STATUS</span>
                <span className={`font-mono text-xs font-bold ${
                  simulationState === 'deployed' ? 'text-cyber-neon' : simulationState === 'running' ? 'text-cyber-cyan animate-pulse' : 'text-slate-400'
                }`}>
                  {simulationState.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-cyber-bg border border-cyber-border/80">
                <span className="text-[10px] text-slate-500 block">PRIMARY TARGET</span>
                <span className="text-slate-200 mt-1 block">{mission.target}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyber-bg border border-cyber-border/80">
                <span className="text-[10px] text-cyber-crimson block">ENVIRONMENTAL HAZARD</span>
                <span className="text-slate-200 mt-1 block">{mission.hazard}</span>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div className="p-4 rounded-xl bg-cyber-bg border border-cyber-border font-mono text-xs text-cyber-neon h-36 overflow-y-auto space-y-1">
              {simLogs.length === 0 ? (
                <div className="text-slate-600 flex items-center h-full justify-center">
                  READY FOR EXECUTION. PRESS LAUNCH SIMULATION.
                </div>
              ) : (
                simLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {simulationState !== 'deployed' ? (
                <button
                  onClick={runSimulation}
                  disabled={simulationState === 'running'}
                  className="flex-1 py-3.5 rounded-xl bg-cyber-neon text-cyber-bg font-display font-black text-xs tracking-wider uppercase hover:shadow-neon-glow hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{simulationState === 'running' ? 'SIMULATING DEPLOYMENT...' : 'LAUNCH SIMULATION'}</span>
                </button>
              ) : (
                <button
                  onClick={resetSimulation}
                  className="flex-1 py-3.5 rounded-xl border border-cyber-neon/50 text-cyber-neon font-mono text-xs tracking-wider uppercase hover:bg-cyber-neon hover:text-cyber-bg transition-all flex items-center justify-center space-x-2"
                >
                  <RefreshCcw className="w-4 h-4" />
                  <span>RESET TERMINAL</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
