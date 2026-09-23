import React, { useState, useMemo } from 'react';
import {
  Baby,
  Calendar,
  Sparkles,
  Heart,
  AlertTriangle,
  Info,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const WomensHealth: React.FC = () => {
  // Client-side local menstrual cycle state
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => {
    try {
      return localStorage.getItem('aura_cycle_last_date') || '';
    } catch {
      return '';
    }
  });

  const [cycleLength, setCycleLength] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('aura_cycle_length');
      return saved ? parseInt(saved, 10) : 28;
    } catch {
      return 28;
    }
  });

  const [periodDuration, setPeriodDuration] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('aura_period_duration');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  const [saveToBrowser, setSaveToBrowser] = useState<boolean>(true);
  const [dataClearedNotice, setDataClearedNotice] = useState(false);

  // Save to local storage on change if enabled
  const handleDateChange = (val: string) => {
    setLastPeriodDate(val);
    if (saveToBrowser) {
      try {
        localStorage.setItem('aura_cycle_last_date', val);
      } catch {
        // ignore
      }
    }
  };

  const handleCycleLengthChange = (val: number) => {
    setCycleLength(val);
    if (saveToBrowser) {
      try {
        localStorage.setItem('aura_cycle_length', val.toString());
      } catch {
        // ignore
      }
    }
  };

  const handleDurationChange = (val: number) => {
    setPeriodDuration(val);
    if (saveToBrowser) {
      try {
        localStorage.setItem('aura_period_duration', val.toString());
      } catch {
        // ignore
      }
    }
  };

  const clearCycleData = () => {
    try {
      localStorage.removeItem('aura_cycle_last_date');
      localStorage.removeItem('aura_cycle_length');
      localStorage.removeItem('aura_period_duration');
    } catch {
      // ignore
    }
    setLastPeriodDate('');
    setCycleLength(28);
    setPeriodDuration(5);
    setDataClearedNotice(true);
    setTimeout(() => setDataClearedNotice(false), 3000);
  };

  // Calculations
  const cycleCalculations = useMemo(() => {
    if (!lastPeriodDate) return null;

    const startDate = new Date(lastPeriodDate + 'T00:00:00');
    if (isNaN(startDate.getTime())) return null;

    // Next period estimated
    const nextPeriod = new Date(startDate);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);

    // Estimated ovulation day (typically cycleLength - 14 days)
    const ovulationDay = Math.max(1, cycleLength - 14);
    const ovulationDate = new Date(startDate);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

    // Estimated fertile window (approx 5 days before ovulation + day of ovulation)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);
    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Current day in cycle
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffMs = today.getTime() - startDate.getTime();
    const currentDayOfCycle = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

    // Determine current phase
    let currentPhase = 'Follicular Phase';
    let phaseDescription = 'Estrogen rises as ovarian follicles mature. Energy levels typically begin increasing.';

    if (currentDayOfCycle >= 1 && currentDayOfCycle <= periodDuration) {
      currentPhase = 'Menstrual Phase';
      phaseDescription = 'Uterine lining shedding. Rest, iron-rich nutrition, and gentle hydration are beneficial.';
    } else if (currentDayOfCycle >= ovulationDay - 2 && currentDayOfCycle <= ovulationDay + 1) {
      currentPhase = 'Estimated Ovulation Window';
      phaseDescription = 'Luteinizing hormone surge triggers egg release. Body temperature may rise slightly.';
    } else if (currentDayOfCycle > ovulationDay + 1 && currentDayOfCycle <= cycleLength) {
      currentPhase = 'Luteal Phase';
      phaseDescription = 'Progesterone dominates to support potential implantation or prepare for the next cycle.';
    } else if (currentDayOfCycle > cycleLength) {
      currentPhase = 'Beyond Typical Cycle Length';
      phaseDescription = 'Cycle days have exceeded the statistical estimate. Variation of several days is completely normal.';
    }

    return {
      nextPeriodFormatted: nextPeriod.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      ovulationDateFormatted: ovulationDate.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      fertileWindowFormatted: `${fertileStart.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      })} – ${fertileEnd.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      })}`,
      currentDayOfCycle,
      currentPhase,
      phaseDescription
    };
  }, [lastPeriodDate, cycleLength, periodDuration]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-xs">
              <Baby className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Women’s Health & Cycle Education</h1>
            <span className="text-slate-400 text-xs font-medium">· 100% Client-Side Private</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Educational cycle estimations, prenatal guidelines, breast health awareness, and reproductive wellness.
          </p>
        </div>
      </div>

      {/* Mandatory Women's Health Disclaimer */}
      <MedicalDisclaimer type="womens_health" className="mb-6" />

      {/* Grid: Cycle Tool on Left, Educational Hub on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Client-Side Cycle Estimator */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Menstrual Cycle Estimator</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="h-3.5 w-3.5" /> 100% Client-Side
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Input your cycle dates to calculate general statistical phases. Data remains strictly on your device and is never transmitted.
            </p>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="font-bold text-slate-800 block text-xs mb-1">
                  Start Date of Last Period
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs sm:text-sm text-slate-900 focus:border-purple-500 focus:outline-hidden focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800 text-xs">
                      Average Cycle Length
                    </label>
                    <span className="text-xs font-bold text-purple-700">{cycleLength} days</span>
                  </div>
                  <input
                    type="range"
                    min={21}
                    max={40}
                    value={cycleLength}
                    onChange={(e) => handleCycleLengthChange(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>21 days</span>
                    <span>28 days (avg)</span>
                    <span>40 days</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-800 text-xs">
                      Period Bleeding Duration
                    </label>
                    <span className="text-xs font-bold text-purple-700">{periodDuration} days</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={9}
                    value={periodDuration}
                    onChange={(e) => handleDurationChange(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>2 days</span>
                    <span>5 days</span>
                    <span>9 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            {cycleCalculations ? (
              <div className="mt-6 rounded-xl bg-purple-50/70 p-4 border border-purple-200 space-y-4">
                <div className="flex items-start justify-between gap-2 border-b border-purple-200 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-purple-700 tracking-wider">
                      Current Estimate
                    </span>
                    <h4 className="text-lg font-bold text-purple-950">
                      Day {cycleCalculations.currentDayOfCycle > 0 ? cycleCalculations.currentDayOfCycle : '1'} of Cycle
                    </h4>
                    <p className="text-xs font-medium text-purple-800 mt-0.5">
                      {cycleCalculations.currentPhase}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white px-3 py-2 text-right shadow-2xs border border-purple-100">
                    <span className="text-[10px] text-slate-500 block">Est. Next Period</span>
                    <span className="text-xs font-bold text-slate-900">
                      {cycleCalculations.nextPeriodFormatted}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-purple-900 leading-relaxed">
                  {cycleCalculations.phaseDescription}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="rounded-lg bg-white p-2.5 border border-purple-100">
                    <span className="text-slate-500 text-[10px] block">Est. Ovulation Date</span>
                    <span className="font-bold text-purple-950">
                      {cycleCalculations.ovulationDateFormatted}
                    </span>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-purple-100">
                    <span className="text-slate-500 text-[10px] block">Fertile Window Range</span>
                    <span className="font-bold text-purple-950">
                      {cycleCalculations.fertileWindowFormatted}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 p-2.5 border border-amber-200 text-[11px] text-amber-900">
                  <span className="font-bold">⚠️ Contraception Warning:</span> This calculation is a statistical model based on standard population averages. Never use this tool for natural family planning or pregnancy prevention. Sperm can survive up to 5 days in the reproductive tract and ovulation dates vary significantly each cycle.
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center text-xs text-slate-500 border border-dashed border-slate-200">
                Select your last period date above to generate an educational cycle breakdown.
              </div>
            )}

            {/* Clear Tool Data */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              {dataClearedNotice ? (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Cycle data cleared
                </span>
              ) : (
                <button
                  type="button"
                  onClick={clearCycleData}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear cycle entries
                </button>
              )}
              <span className="text-[10px] text-slate-400">Zero data sent to servers</span>
            </div>
          </div>

          {/* Pregnancy Urgent Red Flags Box */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5">
            <h3 className="text-sm font-bold text-rose-950 flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
              Pregnancy Critical Warning Signs
            </h3>
            <p className="text-xs text-rose-900 leading-relaxed mb-3">
              If pregnant, seek immediate medical attention or contact your obstetrician/midwife if you experience any of the following:
            </p>
            <ul className="space-y-1.5 text-xs text-rose-900 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600">•</span>
                <span>Any vaginal bleeding or amniotic fluid leaking</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600">•</span>
                <span>Severe persistent headache, vision changes (spots/flashing), or sudden facial/hand swelling (Preeclampsia signs)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600">•</span>
                <span>Noticeable decrease in baby's regular movement patterns during the 3rd trimester</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600">•</span>
                <span>High fever, severe chills, or painful urination</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Educational Topics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Women’s Health Educational Library
            </h3>

            {/* Topic 1: Menstrual Health & Cramps */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Menstrual Cramp (Dysmenorrhea) Relief
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                Primary dysmenorrhea is driven by uterine prostaglandins triggering contractions. Evidence-supported self-care includes localized heat therapy (heating pad), gentle cardiovascular movement, adequate hydration, and magnesium-rich foods.
              </p>
              <div className="text-[11px] text-purple-800 font-semibold">
                Clinical note: Severe debilitating pain interfering with work or school warrants medical evaluation for endometriosis or fibroids.
              </div>
            </div>

            {/* Topic 2: Breast Self-Awareness */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Breast Health & Self-Awareness
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                Breast self-awareness involves understanding how your breasts normally look and feel across different cycle phases. Regular clinical mammography screening typically begins at age 40 (or earlier if family history warrants).
              </p>
              <div className="text-[11px] text-rose-800 font-semibold">
                Report promptly: Any new firm lump, skin dimpling (like orange peel), nipple retraction, or bloody discharge.
              </div>
            </div>

            {/* Topic 3: Perimenopause & Menopause */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Perimenopause & Menopausal Transition
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-2">
                Perimenopause is the natural transition leading up to menopause (defined as 12 consecutive months without a period, typically between ages 45–55). Fluctuating estrogen can cause hot flashes, night sweats, sleep changes, and mood shifts.
              </p>
              <div className="text-[11px] text-slate-700">
                Supportive strategies include layered dressing, resistance exercise for bone mineral preservation, calcium + vitamin D intake, and medical discussion of Hormone Replacement Therapy (HRT) where indicated.
              </div>
            </div>

            {/* Topic 4: Bone Health & Osteoporosis */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Lifelong Bone & Cardiovascular Health
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estrogen plays a protective role in both bone density and vascular flexibility. After menopause, bone turnover accelerates. Weight-bearing physical activities (walking, jogging, strength training) stimulate osteoblast bone formation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
