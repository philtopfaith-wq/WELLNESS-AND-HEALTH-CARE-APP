import React, { useState, useMemo } from 'react';
import {
  Pill,
  Search,
  Filter,
  AlertTriangle,
  Info,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  HeartHandshake
} from 'lucide-react';
import { MEDICATIONS_DATA } from '../../data/medicationsData';
import { Medication } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface MedicationInfoProps {
  onAskAiAboutMedication: (medName: string) => void;
}

export const MedicationInfo: React.FC<MedicationInfoProps> = ({ onAskAiAboutMedication }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(
    MEDICATIONS_DATA[0]
  );

  const categories = useMemo(() => {
    const cats = new Set<string>();
    MEDICATIONS_DATA.forEach((m) => cats.add(m.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredMedications = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MEDICATIONS_DATA.filter((m) => {
      const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
      const matchesQuery =
        !q ||
        m.genericName.toLowerCase().includes(q) ||
        m.brandNames.some((b) => b.toLowerCase().includes(q)) ||
        m.drugClass.toLowerCase().includes(q) ||
        m.commonUses.some((u) => u.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Title Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <Pill className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Medication Information Guide</h1>
            <span className="text-slate-400 text-xs font-medium">· Educational Reference</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Educational reference on common drug classes, mechanisms, side effects, precautions, and food/drug interactions.
          </p>
        </div>
      </div>

      {/* Prominent Mandatory Medication Disclaimer */}
      <MedicalDisclaimer type="medication" className="mb-6" />

      {/* Search & Category Filter */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by generic name (e.g. Paracetamol), brand (Tylenol, Advil, Ventolin), or condition..."
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 shadow-2xs"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            Showing {filteredMedications.length} reference medicines
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List on Left, Comprehensive Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Medication Directory
            </h3>

            {filteredMedications.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No matching medications found for "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredMedications.map((med) => {
                  const isSelected = selectedMedication?.id === med.id;
                  return (
                    <button
                      key={med.id}
                      onClick={() => setSelectedMedication(med)}
                      className={`w-full text-left rounded-xl p-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border border-teal-300 shadow-2xs ring-1 ring-teal-300'
                          : 'bg-slate-50/70 border border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {med.genericName}
                          </h4>
                          <p className="mt-0.5 text-xs text-teal-700 font-medium">
                            {med.drugClass}
                          </p>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 mt-1 transition-transform ${
                            isSelected ? 'text-teal-600 translate-x-0.5' : 'text-slate-400'
                          }`}
                        />
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {med.brandNames.slice(0, 3).map((b) => (
                          <span
                            key={b}
                            className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-600"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8">
          {selectedMedication ? (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-slate-900">
                        {selectedMedication.genericName}
                      </h2>
                      <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                        {selectedMedication.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 font-medium">
                      Pharmacological Class: <span className="text-slate-800 font-semibold">{selectedMedication.drugClass}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onAskAiAboutMedication(selectedMedication.genericName)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask AI about this drug
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                  <span className="font-semibold text-slate-700">Common Brand Names:</span>
                  {selectedMedication.brandNames.map((b) => (
                    <span key={b} className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Uses & Mechanism */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Common Indications / Uses
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedMedication.commonUses.map((u, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    General Mechanism of Action
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedMedication.mechanismOfAction}
                  </p>
                </div>
              </div>

              {/* Side Effects & Serious Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-amber-50/60 p-4 border border-amber-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-amber-700" />
                    Common Side Effects
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-900">
                    {selectedMedication.commonSideEffects.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-rose-50 p-4 border border-rose-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4 text-rose-700" />
                    Serious Warning Signs (Seek Care)
                  </h4>
                  <ul className="space-y-1 text-xs text-rose-900 font-medium">
                    {selectedMedication.seriousWarningSigns.map((w, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-600">⚠️</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Precautions & Interactions */}
              <div className="space-y-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    General Clinical Precautions
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {selectedMedication.generalPrecautions.map((p, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-400 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                    Key Drug & Food Interactions
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {selectedMedication.interactions.map((it, i) => (
                      <span key={i} className="rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-slate-700">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Populations: Pregnancy, Pediatric, Elderly */}
              <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                  <HeartHandshake className="h-4 w-4 text-purple-700" />
                  Special Populations & Safety
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-purple-950 pt-1">
                  <div className="rounded-lg bg-white/80 p-2.5 border border-purple-100">
                    <span className="font-bold text-purple-900 block mb-1">Pregnancy & Nursing:</span>
                    <p className="text-[11px] leading-relaxed">{selectedMedication.specialPopulations.pregnancy}</p>
                  </div>
                  <div className="rounded-lg bg-white/80 p-2.5 border border-purple-100">
                    <span className="font-bold text-purple-900 block mb-1">Pediatric:</span>
                    <p className="text-[11px] leading-relaxed">{selectedMedication.specialPopulations.pediatric}</p>
                  </div>
                  <div className="rounded-lg bg-white/80 p-2.5 border border-purple-100">
                    <span className="font-bold text-purple-900 block mb-1">Older Adults & Renal:</span>
                    <p className="text-[11px] leading-relaxed">{selectedMedication.specialPopulations.elderly}</p>
                  </div>
                </div>
              </div>

              {/* Administration & Storage */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Administration Guidelines:</span>
                  <p>{selectedMedication.administration}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Recommended Storage:</span>
                  <p>{selectedMedication.storageInfo}</p>
                </div>
              </div>

              {/* Grounding Sources and Dates */}
              <div className="rounded-xl bg-slate-100 p-3 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-slate-600" />
                  <span>Authoritative Grounding Sources:</span>
                  <span className="text-slate-700 font-medium">
                    {selectedMedication.sources.map((s) => `${s.name} (${s.versionDate})`).join(' • ')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Calendar className="h-3 w-3" />
                  <span>Verified 2024</span>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              Select a medication from the directory to inspect educational details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
