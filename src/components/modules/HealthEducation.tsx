import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Info,
  Calendar,
  Layers
} from 'lucide-react';
import { HEALTH_TOPICS_DATA } from '../../data/healthTopicsData';
import { HealthTopic } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface HealthEducationProps {
  onAskAiAboutTopic: (topicTitle: string) => void;
}

export const HealthEducation: React.FC<HealthEducationProps> = ({ onAskAiAboutTopic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<HealthTopic | null>(
    HEALTH_TOPICS_DATA[0]
  );

  const categories = useMemo(() => {
    const cats = new Set<string>();
    HEALTH_TOPICS_DATA.forEach((t) => cats.add(t.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return HEALTH_TOPICS_DATA.filter((topic) => {
      const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
      const matchesQuery =
        !q ||
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.keyPoints.some((k) => k.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <BookOpen className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Evidence-Based Health Library</h1>
            <span className="text-slate-400 text-xs font-medium">· Peer-Reviewed Guidelines</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Comprehensive wellness education covering cardiovascular health, diabetes prevention, sleep physiology, and stress resilience.
          </p>
        </div>
      </div>

      <MedicalDisclaimer type="general" className="mb-6" />

      {/* Search & Filter */}
      <div className="mb-6 space-y-3">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search health library (e.g., blood pressure, diabetes, sleep, cortisol, asthma)..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 shadow-2xs"
          />
        </div>

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

      {/* Grid: Topic List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topic List */}
        <div className="lg:col-span-4 space-y-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Topics ({filteredTopics.length})
            </h3>

            {filteredTopics.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No matching topics found for "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
                {filteredTopics.map((topic) => {
                  const isSelected = selectedTopic?.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left rounded-xl p-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50 border border-teal-300 shadow-2xs ring-1 ring-teal-300'
                          : 'bg-slate-50/70 border border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{topic.title}</h4>
                          <span className="text-[11px] text-teal-700 font-medium">
                            {topic.category}
                          </span>
                        </div>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 mt-0.5 transition-transform ${
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

        {/* Right Column: Topic Detail */}
        <div className="lg:col-span-8">
          {selectedTopic ? (
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedTopic.title}</h2>
                    <span className="mt-1 inline-block rounded-md bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
                      Category: {selectedTopic.category}
                    </span>
                  </div>

                  <button
                    onClick={() => onAskAiAboutTopic(selectedTopic.title)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Ask AI about this topic
                  </button>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {selectedTopic.summary}
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="rounded-xl bg-teal-50/50 p-4 border border-teal-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-700" />
                  Key Physiological Facts & Clinical Targets
                </h4>
                <ul className="space-y-1.5 text-xs text-teal-950">
                  {selectedTopic.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lifestyle Actions */}
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Evidence-Based Lifestyle Strategies
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedTopic.practicalTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Red Flag Warning Signs */}
              <div className="rounded-xl bg-rose-50 p-4 border border-rose-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-700" />
                  Clinical Warning Signs (When to Consult a Physician)
                </h4>
                <ul className="space-y-1 text-xs text-rose-950 font-medium">
                  {selectedTopic.warningSigns.map((ws, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600">⚠️</span>
                      <span>{ws}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Authoritative Sources */}
              <div className="rounded-xl bg-slate-100 p-3 text-[11px] text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-slate-500" />
                  <span>Clinical Sources: {selectedTopic.sources.map((s) => `${s.organization} (${s.year})`).join(' • ')}</span>
                </div>
                <span className="text-slate-400">Verified 2024</span>
              </div>
            </article>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
              Select a health education topic to explore clinical guidelines.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
