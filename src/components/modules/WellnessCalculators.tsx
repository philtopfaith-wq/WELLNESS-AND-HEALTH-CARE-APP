import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Scale,
  Calendar,
  Droplets,
  Flame,
  Moon,
  Info,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const WellnessCalculators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'age' | 'hydration' | 'bmr' | 'sleep'>('bmi');

  // BMI State
  const [bmiUnit, setBmiUnit] = useState<'metric' | 'imperial'>('metric');
  const [metricHeight, setMetricHeight] = useState<string>('170'); // cm
  const [metricWeight, setMetricWeight] = useState<string>('68'); // kg
  const [imperialHeightFt, setImperialHeightFt] = useState<string>('5');
  const [imperialHeightIn, setImperialHeightIn] = useState<string>('7');
  const [imperialWeightLbs, setImperialWeightLbs] = useState<string>('150');

  // Age Calculator State
  const [birthDate, setBirthDate] = useState<string>('1995-05-15');

  // Hydration Estimator State
  const [hydrationWeightKg, setHydrationWeightKg] = useState<number>(70);
  const [activityMinutes, setActivityMinutes] = useState<number>(30);
  const [climate, setClimate] = useState<'temperate' | 'hot' | 'very-hot'>('temperate');

  // BMR / Calorie State
  const [bmrAge, setBmrAge] = useState<number>(30);
  const [bmrSex, setBmrSex] = useState<'male' | 'female'>('female');
  const [bmrHeight, setBmrHeight] = useState<number>(168);
  const [bmrWeight, setBmrWeight] = useState<number>(65);
  const [bmrActivity, setBmrActivity] = useState<number>(1.375); // Lightly active

  // Sleep Calculator State
  const [sleepWakeTime, setSleepWakeTime] = useState<string>('07:00');

  // 1. BMI Calculation
  const bmiResult = useMemo(() => {
    let weight = 0;
    let heightM = 0;

    if (bmiUnit === 'metric') {
      const h = parseFloat(metricHeight);
      const w = parseFloat(metricWeight);
      if (h > 50 && h < 250 && w > 20 && w < 350) {
        weight = w;
        heightM = h / 100;
      }
    } else {
      const ft = parseFloat(imperialHeightFt) || 0;
      const inch = parseFloat(imperialHeightIn) || 0;
      const totalInches = ft * 12 + inch;
      const lbs = parseFloat(imperialWeightLbs) || 0;
      if (totalInches > 20 && lbs > 40) {
        weight = lbs * 0.453592;
        heightM = totalInches * 0.0254;
      }
    }

    if (!weight || !heightM) return null;

    const bmi = weight / (heightM * heightM);
    let category = 'Normal weight';
    let color = 'text-emerald-700 bg-emerald-50 border-emerald-200';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-sky-700 bg-sky-50 border-sky-200';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight range';
      color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight range';
      color = 'text-amber-700 bg-amber-50 border-amber-200';
    } else {
      category = 'Obesity classification';
      color = 'text-rose-700 bg-rose-50 border-rose-200';
    }

    return {
      bmi: bmi.toFixed(1),
      category,
      color
    };
  }, [
    bmiUnit,
    metricHeight,
    metricWeight,
    imperialHeightFt,
    imperialHeightIn,
    imperialWeightLbs
  ]);

  // 2. Age Calculation
  const ageResult = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate + 'T00:00:00');
    const now = new Date();
    if (isNaN(birth.getTime()) || birth > now) return null;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDaysLived = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // Next Birthday calculation
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDaysLived,
      daysUntilBirthday
    };
  }, [birthDate]);

  // 3. Hydration Calculation
  const hydrationResult = useMemo(() => {
    // Baseline: 35ml per kg of body weight
    let baseMl = hydrationWeightKg * 35;

    // Add for physical activity: ~350ml per 30 mins
    baseMl += (activityMinutes / 30) * 350;

    // Add for climate
    if (climate === 'hot') baseMl += 500;
    if (climate === 'very-hot') baseMl += 900;

    const liters = (baseMl / 1000).toFixed(1);
    const standardGlasses = Math.round(baseMl / 250);

    return {
      liters,
      glasses: standardGlasses
    };
  }, [hydrationWeightKg, activityMinutes, climate]);

  // 4. BMR & Calorie Calculation (Mifflin-St Jeor)
  const bmrResult = useMemo(() => {
    let bmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge;
    if (bmrSex === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }
    const totalDailyEnergy = Math.round(bmr * bmrActivity);

    return {
      bmr: Math.round(bmr),
      tdee: totalDailyEnergy
    };
  }, [bmrWeight, bmrHeight, bmrAge, bmrSex, bmrActivity]);

  // 5. Sleep Cycle Calculator (90-min cycles counting back from wake time)
  const sleepCycles = useMemo(() => {
    if (!sleepWakeTime) return [];
    const [h, m] = sleepWakeTime.split(':').map(Number);
    const wakeDate = new Date();
    wakeDate.setHours(h, m, 0, 0);

    // It takes average 15 mins to fall asleep
    const cycles = [6, 5, 4, 3].map((numCycles) => {
      const sleepTime = new Date(wakeDate.getTime() - (numCycles * 90 + 15) * 60 * 1000);
      return {
        cycles: numCycles,
        hours: (numCycles * 1.5).toFixed(1),
        timeString: sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quality: numCycles >= 5 ? 'Optimal (Recommended)' : numCycles === 4 ? 'Moderate' : 'Short'
      };
    });
    return cycles;
  }, [sleepWakeTime]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
              <Calculator className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Wellness Calculators</h1>
            <span className="text-slate-400 text-xs font-medium">· Interactive Tools</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Client-side educational tools for BMI, exact chronological age, hydration estimations, and sleep cycles.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('bmi')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'bmi' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            BMI
          </button>
          <button
            onClick={() => setActiveTab('age')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'age' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Age & Milestones
          </button>
          <button
            onClick={() => setActiveTab('hydration')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'hydration' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Hydration
          </button>
          <button
            onClick={() => setActiveTab('bmr')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'bmr' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            BMR / Calories
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'sleep' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Sleep Cycles
          </button>
        </div>
      </div>

      {/* Reusable Disclaimer */}
      <MedicalDisclaimer type="calculators" className="mb-6" />

      {/* 1. BMI CALCULATOR */}
      {activeTab === 'bmi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Body Mass Index (BMI)</h3>
              </div>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setBmiUnit('metric')}
                  className={`rounded-md px-2.5 py-1 ${
                    bmiUnit === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : ''
                  }`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  onClick={() => setBmiUnit('imperial')}
                  className={`rounded-md px-2.5 py-1 ${
                    bmiUnit === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : ''
                  }`}
                >
                  Imperial (lbs/ft)
                </button>
              </div>
            </div>

            {bmiUnit === 'metric' ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Height (centimeters)</label>
                  <input
                    type="number"
                    value={metricHeight}
                    onChange={(e) => setMetricHeight(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Weight (kilograms)</label>
                  <input
                    type="number"
                    value={metricWeight}
                    onChange={(e) => setMetricWeight(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Height (Feet)</label>
                    <input
                      type="number"
                      value={imperialHeightFt}
                      onChange={(e) => setImperialHeightFt(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Height (Inches)</label>
                    <input
                      type="number"
                      value={imperialHeightIn}
                      onChange={(e) => setImperialHeightIn(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 focus:outline-hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Weight (Pounds)</label>
                  <input
                    type="number"
                    value={imperialWeightLbs}
                    onChange={(e) => setImperialWeightLbs(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-slate-900 focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results and Limitations */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Calculation Output
            </h3>

            {bmiResult ? (
              <div className={`rounded-xl p-5 border ${bmiResult.color}`}>
                <span className="text-xs font-semibold block opacity-80">Calculated BMI</span>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold tracking-tight">{bmiResult.bmi}</span>
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold shadow-2xs">
                    {bmiResult.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                Enter valid height and weight values to calculate.
              </div>
            )}

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-blue-600" />
                Critical Scientific Limitations of BMI:
              </span>
              <p>
                BMI is an epidemiological population screening tool, <strong>NOT</strong> an individualized measure of adiposity or clinical health.
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-600">
                <li>Does not distinguish between dense muscle mass, bone density, and adipose fat tissue (muscular athletes frequently score in the overweight bracket).</li>
                <li>Does not account for fat distribution (visceral abdominal fat vs subcutaneous fat).</li>
                <li>Cutoffs vary by ethnicity and age; clinical health assessments should always include waist circumference, blood pressure, and metabolic lipid panels.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2. AGE CALCULATOR */}
      {activeTab === 'age' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Chronological Age Calculator</h3>
            </div>
            <div>
              <label className="font-bold text-slate-700 block text-xs mb-1">
                Select Your Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-slate-500">
              Calculates your exact age down to days lived, alongside countdowns to upcoming life milestones.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Chronological Breakdown
            </h3>

            {ageResult ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-indigo-50/70 p-4 border border-indigo-200">
                  <span className="text-xs font-semibold text-indigo-800 block">Exact Age</span>
                  <div className="mt-1 text-2xl font-bold text-indigo-950">
                    {ageResult.years} <span className="text-sm font-normal">years</span>, {ageResult.months} <span className="text-sm font-normal">months</span>, {ageResult.days} <span className="text-sm font-normal">days</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Total Days Lived</span>
                    <span className="text-lg font-bold text-slate-900">
                      {ageResult.totalDaysLived.toLocaleString()} days
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Next Birthday Countdown</span>
                    <span className="text-lg font-bold text-teal-700">
                      {ageResult.daysUntilBirthday} days
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
                Please enter a valid past birth date.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. HYDRATION ESTIMATOR */}
      {activeTab === 'hydration' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Droplets className="h-5 w-5 text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">Personalized Hydration Estimator</h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Body Weight (kg)</label>
                  <span className="font-bold text-sky-700">{hydrationWeightKg} kg</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={140}
                  value={hydrationWeightKg}
                  onChange={(e) => setHydrationWeightKg(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-slate-700">Daily Exercise / Sweat Time (minutes)</label>
                  <span className="font-bold text-sky-700">{activityMinutes} mins</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={120}
                  step={15}
                  value={activityMinutes}
                  onChange={(e) => setActivityMinutes(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Current Climate & Ambient Heat</label>
                <select
                  value={climate}
                  onChange={(e: any) => setClimate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-sky-500 focus:outline-hidden"
                >
                  <option value="temperate">Mild / Temperate Climate (indoor AC)</option>
                  <option value="hot">Warm / Tropical Climate</option>
                  <option value="very-hot">Very Hot & Humid Climate / High Sweat Exposure</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Estimated Daily Fluid Need
            </h3>

            <div className="rounded-xl bg-sky-50/80 p-5 border border-sky-200">
              <span className="text-xs font-semibold text-sky-900 block">Recommended Total Fluids</span>
              <div className="mt-1 flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-sky-950">{hydrationResult.liters}</span>
                <span className="text-base font-semibold text-sky-800">Liters / day</span>
              </div>
              <p className="mt-2 text-xs text-sky-900">
                Equivalent to approximately <strong>{hydrationResult.glasses} standard glasses</strong> (250ml each) of water and hydrating foods.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <span className="font-bold text-slate-800">Practical Guidance:</span>
              <p>
                Fluid requirements vary with fever, gastrointestinal illness, lactation, and kidney conditions. Individuals with congestive heart failure or end-stage renal disease must strictly follow their physician's fluid restriction limits.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. BMR & CALORIES ESTIMATOR */}
      {activeTab === 'bmr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Flame className="h-5 w-5 text-orange-600" />
              <h3 className="text-base font-bold text-slate-900">BMR & Maintenance Calorie Estimate</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Biological Sex</label>
                <select
                  value={bmrSex}
                  onChange={(e: any) => setBmrSex(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2 text-slate-900"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={bmrAge}
                  onChange={(e) => setBmrAge(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 p-2 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={bmrHeight}
                  onChange={(e) => setBmrHeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 p-2 text-slate-900"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={bmrWeight}
                  onChange={(e) => setBmrWeight(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-300 p-2 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Physical Activity Level</label>
              <select
                value={bmrActivity}
                onChange={(e) => setBmrActivity(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-300 p-2 text-slate-900"
              >
                <option value={1.2}>Sedentary (desk job, minimal exercise)</option>
                <option value={1.375}>Lightly Active (light exercise 1–3 days/week)</option>
                <option value={1.55}>Moderately Active (exercise 3–5 days/week)</option>
                <option value={1.725}>Very Active (hard exercise 6–7 days/week)</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Estimated Energy Expenditures
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="text-[11px] text-slate-500 block">Basal Metabolic Rate (BMR)</span>
                <span className="text-2xl font-bold text-slate-900">{bmrResult.bmr}</span>
                <span className="text-xs text-slate-500 block mt-0.5">kcal / day at complete rest</span>
              </div>

              <div className="rounded-xl bg-orange-50/80 p-4 border border-orange-200">
                <span className="text-[11px] text-orange-800 block">Total Daily Energy (TDEE)</span>
                <span className="text-2xl font-bold text-orange-950">{bmrResult.tdee}</span>
                <span className="text-xs text-orange-800 block mt-0.5">kcal / day maintenance</span>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold block mb-1">⚠️ Educational Estimate Notice:</span>
              Calculated via the Mifflin-St Jeor formula. These numbers are general educational estimations and do not represent a clinical dietary prescription. Never pursue aggressive caloric deficits without personalized dietetic oversight.
            </div>
          </div>
        </div>
      )}

      {/* 5. SLEEP CYCLE CALCULATOR */}
      {activeTab === 'sleep' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Moon className="h-5 w-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">Sleep Cycle Optimization</h3>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                What time do you need to wake up?
              </label>
              <input
                type="time"
                value={sleepWakeTime}
                onChange={(e) => setSleepWakeTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-2.5 text-xs sm:text-sm text-slate-900 focus:border-indigo-500 focus:outline-hidden"
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Human sleep naturally cycles through non-REM and REM phases approximately every 90 minutes. Waking at the end of a cycle helps avoid sleep inertia (grogginess).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Ideal Bedtimes (Allowing 15m to fall asleep)
            </h3>

            <div className="space-y-2.5">
              {sleepCycles.map((c) => (
                <div
                  key={c.cycles}
                  className="flex items-center justify-between rounded-xl bg-indigo-50/60 p-3 border border-indigo-100"
                >
                  <div>
                    <span className="text-sm font-bold text-indigo-950">{c.timeString}</span>
                    <span className="text-xs text-indigo-800 ml-2">({c.hours} hrs of sleep)</span>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100">
                    {c.cycles} Cycles • {c.quality}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
