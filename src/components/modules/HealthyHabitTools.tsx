import React, { useState, useEffect } from 'react';
import {
  Activity,
  Droplets,
  Wind,
  Moon,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Award,
  Trash2
} from 'lucide-react';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const HealthyHabitTools: React.FC = () => {
  // Water Tracker State
  const [waterGlasses, setWaterGlasses] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('aura_water_intake');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const waterTarget = 8; // standard 8 glasses

  const addGlass = () => {
    setWaterGlasses((prev) => {
      const updated = Math.min(16, prev + 1);
      try {
        localStorage.setItem('aura_water_intake', updated.toString());
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const removeGlass = () => {
    setWaterGlasses((prev) => {
      const updated = Math.max(0, prev - 1);
      try {
        localStorage.setItem('aura_water_intake', updated.toString());
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetWater = () => {
    setWaterGlasses(0);
    try {
      localStorage.removeItem('aura_water_intake');
    } catch {
      // ignore
    }
  };

  // Breathing Tool State
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingTechnique, setBreathingTechnique] = useState<'box' | 'relax'>('box');
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  useEffect(() => {
    if (!breathingActive) return;

    let timer: NodeJS.Timeout;
    if (breathingTechnique === 'box') {
      // Box Breathing: 4s Inhale, 4s Hold, 4s Exhale, 4s Pause
      timer = setInterval(() => {
        setBreathPhase((prev) => {
          if (prev === 'Inhale') return 'Hold';
          if (prev === 'Hold') return 'Exhale';
          if (prev === 'Exhale') return 'Pause';
          return 'Inhale';
        });
      }, 4000);
    } else {
      // 4-7-8 Breathing: 4s Inhale, 7s Hold, 8s Exhale
      const schedule = async () => {
        setBreathPhase('Inhale');
        await new Promise((r) => setTimeout(r, 4000));
        if (!breathingActive) return;
        setBreathPhase('Hold');
        await new Promise((r) => setTimeout(r, 7000));
        if (!breathingActive) return;
        setBreathPhase('Exhale');
        await new Promise((r) => setTimeout(r, 8000));
      };
      schedule();
      const interval = setInterval(schedule, 19000);
      return () => clearInterval(interval);
    }

    return () => clearInterval(timer);
  }, [breathingActive, breathingTechnique]);

  // Sleep Checklist State
  const [sleepChecks, setSleepChecks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_sleep_habits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const sleepHabits = [
    { id: 'screen', label: 'Screen off 45 minutes before sleep (blue light reduction)' },
    { id: 'caffeine', label: 'No caffeinated drinks within 6 hours of bedtime' },
    { id: 'temp', label: 'Bedroom temperature cool, dark, and well-ventilated' },
    { id: 'winddown', label: '15-minute relaxing activity (reading, journaling, gentle stretching)' }
  ];

  const toggleSleepCheck = (id: string) => {
    setSleepChecks((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('aura_sleep_habits', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
            <Activity className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Healthy Habit Tools</h1>
          <span className="text-slate-400 text-xs font-medium">· Interactive Daily Routines</span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">
          Client-side daily wellness trackers for hydration, parasympathetic breathwork, and evening sleep hygiene.
        </p>
      </div>

      <MedicalDisclaimer type="general" compact />

      {/* Grid: 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Water Tracker */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">Daily Hydration Log</h3>
              </div>
              <span className="text-xs font-bold text-sky-700">
                {waterGlasses} / {waterTarget} Glasses
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Log standard 250ml glasses of water drank today. Data stays strictly in your browser.
            </p>

            {/* Visual Glass Meter */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {Array.from({ length: waterTarget }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-12 items-center justify-center rounded-xl border text-xs font-bold transition-all ${
                    i < waterGlasses
                      ? 'bg-sky-500 text-white border-sky-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  💧 {i + 1}
                </div>
              ))}
            </div>

            {waterGlasses >= waterTarget && (
              <div className="rounded-xl bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-4">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>Daily hydration goal accomplished!</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={addGlass}
                className="rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-sky-700 shadow-2xs transition-colors cursor-pointer"
              >
                + Add Glass
              </button>
              <button
                onClick={removeGlass}
                disabled={waterGlasses === 0}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer"
              >
                - Remove
              </button>
            </div>
            <button
              onClick={resetWater}
              className="text-slate-400 hover:text-slate-600 p-2 cursor-pointer"
              title="Reset day count"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* 2. Mindful Breathing Tool */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Vagal Breathing Tool</h3>
              </div>
              <select
                value={breathingTechnique}
                onChange={(e: any) => setBreathingTechnique(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
              >
                <option value="box">Box (4-4-4-4)</option>
                <option value="relax">4-7-8 Relax</option>
              </select>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Activates the parasympathetic nervous system to slow resting heart rate and alleviate acute tension.
            </p>

            {/* Breathing Circle */}
            <div className="flex flex-col items-center justify-center py-4">
              <div
                className={`flex h-32 w-32 items-center justify-center rounded-full border-4 transition-all duration-1000 ${
                  breathingActive
                    ? breathPhase === 'Inhale'
                      ? 'scale-110 border-teal-500 bg-teal-50 text-teal-900 shadow-md'
                      : breathPhase === 'Hold'
                      ? 'scale-110 border-indigo-400 bg-indigo-50 text-indigo-900'
                      : 'scale-95 border-emerald-400 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="text-center">
                  <span className="text-sm font-bold block">
                    {breathingActive ? breathPhase : 'Ready'}
                  </span>
                  {breathingActive && (
                    <span className="text-[10px] opacity-70">Breathe slowly</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold text-white shadow-2xs transition-colors cursor-pointer ${
                breathingActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {breathingActive ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Start Exercise
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3. Sleep Hygiene Evening Checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Sleep Wind-Down</h3>
              </div>
              <span className="text-xs font-bold text-indigo-700">
                {sleepChecks.length} / {sleepHabits.length} Done
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Check off recommended evening routines to optimize circadian rhythm and deep restorative sleep.
            </p>

            <div className="space-y-2.5">
              {sleepHabits.map((habit) => {
                const isChecked = sleepChecks.includes(habit.id);
                return (
                  <button
                    key={habit.id}
                    onClick={() => toggleSleepCheck(habit.id)}
                    className={`w-full text-left rounded-xl p-2.5 text-xs transition-all flex items-start gap-2.5 border cursor-pointer ${
                      isChecked
                        ? 'bg-indigo-50/70 border-indigo-200 text-indigo-950 font-medium'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${
                        isChecked
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                    <span className="leading-snug">{habit.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => {
                setSleepChecks([]);
                try {
                  localStorage.removeItem('aura_sleep_habits');
                } catch {
                  // ignore
                }
              }}
              className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Reset Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
