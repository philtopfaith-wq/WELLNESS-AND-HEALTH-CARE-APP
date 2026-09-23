import React, { useState, useMemo } from 'react';
import {
  Stethoscope,
  Search,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Activity
} from 'lucide-react';
import { SYMPTOMS_DATA } from '../../data/symptomsData';
import { SymptomInfoItem } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface SymptomInfoProps {
  onAskAiAboutSymptom: (symptomName: string) => void;
  onNavigateToEmergency: () => void;
}

export const SymptomInfo: React.FC<SymptomInfoProps> = ({
  onAskAiAboutSymptom,
  onNavigateToEmergency
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomInfoItem | null>(
    SYMPTOMS_DATA[0]
  );

  const systems = useMemo(() => {
    const sys = new Set<string>();
    SYMPTOMS_DATA.forEach((s) => sys.add(s.bodySystem));
    return ['All', ...Array.from(sys)];
  }, []);

  const filteredSymptoms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SYMPTOMS_DATA.filter((s) => {
      const matchesSystem = selectedSystem === 'All' || s.bodySystem === selectedSystem;
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.commonPossibleCauses.some((c) => c.toLowerCase().includes(q));
      return matchesSystem && matchesQuery;
    });
  }, [searchQuery, selectedSystem]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <Stethoscope className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Symptom Educational Guide</h1>
            <span className="text-slate-400 text-xs font-medium">· Non-Diagnostic Reference</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Educational insights into common symptom causes, home supportive care, and triage indicators.
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <MedicalDisclaimer type="symptoms" className="mb-6" />

      {/* Search & Body Systems Filter */}
      <div className="mb-6 space-y-3">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms (e.g., headache, fever, cough, abdominal pain, fatigue)..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {systems.map((sys) => (
            <button
              key={sys}
              onClick={() => setSelectedSystem(sys)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSystem === sys
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sys}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Left Directory, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Symptom Index ({filteredSymptoms.length})
            </h3>

            {filteredSymptoms.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No matching symptoms found for "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {filteredSymptoms.map((sym) => {
                  const isSelected = selectedSymptom?.id === sym.id;
                  return (
                    <button
                      key={sym.id}
                      onClick={() => setSelectedSymptom(sym)}
                      className={`w-full text-left rounded-xl p-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border border-teal-300 shadow-2xs ring-1 ring-teal-300'
                          : 'bg-slate-50/70 border border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{sym.name}</h4>
                          <span className="text-[11px] text-teal-700 font-medium">
                            {sym.bodySystem}
                          </span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isSelected ? 'text-teal-600 translate-x-0.5' : 'text-slate-400'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Detail */}
        <div className="lg:col-span-8">
          {selectedSymptom ? (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedSymptom.name}</h2>
                    <span className="mt-1 inline-block rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                      System: {selectedSymptom.bodySystem}
                    </span>
                  </div>

                  <button
                    onClick={() => onAskAiAboutSymptom(selectedSymptom.name)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask AI about this symptom
                  </button>
                </div>

                <div className="mt-4 rounded-xl bg-sky-50/70 p-3.5 border border-sky-200 text-xs text-sky-950 leading-relaxed font-medium">
                  {selectedSymptom.description}
                </div>
              </div>

              {/* Causes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Common Possible Causes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedSymptom.commonPossibleCauses.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Less Common Possibilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedSymptom.lessCommonCauses.map((lc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{lc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Supportive Self-Care */}
              <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                  General Supportive Self-Care Measures
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {selectedSymptom.generalSelfCare.map((sc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{sc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Triage & Seeking Care */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900">When to Seek Medical Care</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Routine Doctor */}
                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1 text-[11px] uppercase tracking-wider">
                      Routine Doctor Visit
                    </span>
                    <ul className="space-y-1 text-slate-600">
                      {selectedSymptom.routineDoctorVisitSigns.map((r, i) => (
                        <li key={i}>• {r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Urgent Care */}
                  <div className="rounded-xl bg-amber-50/70 p-3.5 border border-amber-200">
                    <span className="font-bold text-amber-900 block mb-1 text-[11px] uppercase tracking-wider">
                      Prompt / Urgent Care
                    </span>
                    <ul className="space-y-1 text-amber-900">
                      {selectedSymptom.urgentCareWarningSigns.map((u, i) => (
                        <li key={i}>• {u}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Emergency Red Flags */}
                  <div className="rounded-xl bg-rose-50 p-3.5 border border-rose-200">
                    <span className="font-bold text-rose-900 block mb-1 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                      Emergency Red Flags
                    </span>
                    <ul className="space-y-1 text-rose-900 font-medium">
                      {selectedSymptom.emergencyRedFlags.map((e, i) => (
                        <li key={i}>⚠️ {e}</li>
                      ))}
                    </ul>
                    <button
                      onClick={onNavigateToEmergency}
                      className="mt-3 w-full rounded-lg bg-rose-600 py-1.5 text-center text-[10px] font-bold text-white hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      View Emergency Guide
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              Select a symptom from the directory to review educational causes and red flags.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
