import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Pill,
  Utensils,
  Baby,
  Calculator,
  Stethoscope,
  Activity,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  Droplets,
  HeartPulse,
  Scale,
  Calendar,
  AlertTriangle,
  Phone,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { AppModule } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface DashboardProps {
  onSelectModule: (module: AppModule) => void;
  onAskAiWithQuery: (query: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectModule,
  onAskAiWithQuery
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAskAiWithQuery(searchQuery.trim());
  };

  const featureCards: {
    id: AppModule;
    title: string;
    description: string;
    icon: React.ElementType;
    kicker: string;
    iconBg: string;
    iconColor: string;
  }[] = [
    {
      id: 'ai-chat',
      title: 'AI Health Assistant',
      description: 'Ask symptoms, medication guidelines, and wellness questions in natural language with evidence-informed AI.',
      kicker: 'Gemini 3.8 Flash Engine',
      icon: Sparkles,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-700'
    },
    {
      id: 'medications',
      title: 'Medication Directory',
      description: 'Clinical insights into indications, drug interactions, contraindications, mechanism of action, and precautions.',
      kicker: 'FDA & WHO Essential List',
      icon: Pill,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-700'
    },
    {
      id: 'nutrition',
      title: 'Nutrition & Meal Planner',
      description: 'Culturally flexible meal generator featuring Nigerian staples and Mediterranean whole foods with macronutrient guides.',
      kicker: 'Culturally Inclusive',
      icon: Utensils,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      id: 'womens-health',
      title: 'Women’s Health & Cycle',
      description: 'Private, client-side menstrual cycle estimator, pregnancy warning signs, and reproductive wellness education.',
      kicker: '100% Client-Side Privacy',
      icon: Baby,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-700'
    },
    {
      id: 'symptoms',
      title: 'Symptom Guide',
      description: 'Non-diagnostic educational understanding of symptoms, possible causes, supportive self-care, and triage levels.',
      kicker: 'Non-Diagnostic Education',
      icon: Stethoscope,
      iconBg: 'bg-sky-50',
      iconColor: 'text-sky-700'
    },
    {
      id: 'calculators',
      title: 'Wellness Calculators',
      description: 'Interactive BMI with scientific limitation notes, exact chronological age, hydration need, and 90-minute sleep cycles.',
      kicker: 'Interactive Clinical Tools',
      icon: Calculator,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-700'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-10">
      {/* Creator Showcase Header Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-teal-900/90 via-slate-900 to-slate-950 px-5 py-3 text-white shadow-sm border border-teal-800/40">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30">
            <UserCheck className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <span className="text-slate-400">Application Lead Creator: </span>
            <strong className="text-teal-300 font-bold tracking-wide">ABOLUWARIN TEMITOPE</strong>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <a
            href="tel:08166102920"
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-500 px-3 py-1.5 font-bold text-slate-950 hover:bg-teal-400 transition-all font-mono"
            title="Call Creator Aboluwarin Temitope"
          >
            <Phone className="h-3.5 w-3.5" />
            08166102920
          </a>
          <a
            href="https://wa.me/2348166102920"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-1.5 font-semibold text-white transition-all"
            title="WhatsApp Creator"
          >
            <MessageSquare className="h-3.5 w-3.5 text-emerald-400" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 via-teal-950 to-slate-950 p-6 sm:p-10 md:p-12 text-white shadow-2xl border border-slate-800">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          {/* Metadata line without pill clutter */}
          <div className="flex items-center gap-2 text-xs text-teal-300 font-medium tracking-wide">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="h-4 w-4" /> 100% Stateless & Private
            </span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-300">No Account Required</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-300">WHO & CDC Grounded</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight font-sans">
            Your Evidence-Informed Health & Wellness Guide
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
            Conceived and engineered by <strong>ABOLUWARIN TEMITOPE</strong> to provide transparent health literacy, drug safety guidelines, culturally inclusive meal planning, and private calculators without storing your personal records.
          </p>

          {/* Search or Ask AI Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 border border-white/20 shadow-inner">
              <div className="relative w-full flex-1">
                <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ask a health question (e.g. 'What are rich natural sources of iron?')..."
                  className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 hover:bg-emerald-400 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4" />
                Ask Health AI
              </button>
            </div>
          </form>

          {/* Quick Prompts */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap pt-1">
            <span className="text-slate-400 font-medium">Quick explore:</span>
            <button
              onClick={() => onAskAiWithQuery('How can I naturally improve sleep quality and circadian rhythm?')}
              className="hover:text-emerald-300 hover:underline cursor-pointer"
            >
              Sleep quality
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onAskAiWithQuery('What are common causes of high blood pressure?')}
              className="hover:text-emerald-300 hover:underline cursor-pointer"
            >
              Blood pressure
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => onAskAiWithQuery('What are rich dietary sources of iron for steady energy?')}
              className="hover:text-emerald-300 hover:underline cursor-pointer"
            >
              Iron-rich nutrition
            </button>
          </div>
        </div>
      </section>

      {/* Mandatory General Medical Disclaimer */}
      <MedicalDisclaimer type="general" />

      {/* Emergency Quick Action Notice */}
      <div className="rounded-2xl border border-rose-200/90 bg-rose-50/60 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-rose-600 p-2 text-white shrink-0 shadow-2xs">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-rose-950">Experiencing Acute Medical Distress?</h3>
            <p className="mt-0.5 text-xs text-rose-900/90 leading-relaxed">
              For severe chest pressure, sudden breathing difficulty, facial numbness, or thoughts of self-harm, immediately access emergency medical dispatch (Nigeria: 112 / 767, US: 911, UK: 999).
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectModule('emergency')}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-rose-700 shadow-2xs transition-colors cursor-pointer"
        >
          <PhoneCall className="h-4 w-4" />
          Emergency Center
        </button>
      </div>

      {/* 6 Core Modules Grid */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Core Wellness Modules</h2>
            <p className="text-xs text-slate-500 mt-0.5">Explore structured health guidance and private tools</p>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">Designed by Aboluwarin Temitope</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => onSelectModule(card.id)}
                className="group text-left rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className={`rounded-xl p-2.5 ${card.iconBg} ${card.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">
                      {card.kicker}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-teal-600" />
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-medium">
                  <span>Open Module</span>
                  <span aria-hidden="true">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Daily Evidence-Based Health Bite & Habit Launchpad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Tip of the Day */}
        <div className="lg:col-span-7 rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-50/70 to-emerald-50/50 p-6 space-y-3 shadow-2xs">
          <div className="flex items-center gap-2 text-teal-900 font-bold text-xs uppercase tracking-wider">
            <HeartPulse className="h-4 w-4 text-teal-600" />
            <span>Evidence-Based Health Bite of the Day</span>
          </div>

          <h3 className="text-lg font-bold text-teal-950">
            The Power of Post-Meal Walking on Blood Glucose
          </h3>

          <p className="text-xs sm:text-sm text-teal-900/90 leading-relaxed">
            A meta-analysis published in <em>Sports Medicine</em> demonstrated that as little as a 2 to 5-minute light stroll immediately after meals significantly blunts postprandial glucose spikes. Contracting skeletal muscle takes up glucose through non-insulin-dependent GLUT4 translocation, easing the metabolic burden on the pancreas.
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-teal-200/60">
            <button
              onClick={() => onSelectModule('education')}
              className="text-xs font-bold text-teal-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Explore Full Health Education Library <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <span className="text-[11px] text-teal-700/80">Source: Sports Med Review</span>
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900">Quick Daily Routines</h3>

          <div className="space-y-2.5 text-xs">
            <button
              onClick={() => onSelectModule('habits')}
              className="w-full flex items-center justify-between rounded-xl bg-sky-50/60 p-3 border border-sky-100 hover:bg-sky-100/60 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Droplets className="h-4 w-4 text-sky-600" />
                <span className="font-semibold text-sky-950">Log Daily Water Intake</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-sky-600" />
            </button>

            <button
              onClick={() => onSelectModule('habits')}
              className="w-full flex items-center justify-between rounded-xl bg-teal-50/60 p-3 border border-teal-100 hover:bg-teal-100/60 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Activity className="h-4 w-4 text-teal-600" />
                <span className="font-semibold text-teal-950">1-Minute Parasympathetic Breathwork</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-teal-600" />
            </button>

            <button
              onClick={() => onSelectModule('calculators')}
              className="w-full flex items-center justify-between rounded-xl bg-indigo-50/60 p-3 border border-indigo-100 hover:bg-indigo-100/60 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="h-4 w-4 text-indigo-600" />
                <span className="font-semibold text-indigo-950">Calculate Sleep Cycles & Wake Times</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
