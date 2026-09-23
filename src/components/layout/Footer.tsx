import React from 'react';
import {
  HeartPulse,
  ShieldCheck,
  Trash2,
  PhoneCall,
  Phone,
  MessageSquare,
  Sparkles,
  User,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { AppModule } from '../../types';

interface FooterProps {
  onSelectModule: (module: AppModule) => void;
  onOpenPrivacyModal: () => void;
  onClearAllData: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectModule,
  onOpenPrivacyModal,
  onClearAllData
}) => {
  return (
    <footer className="mt-20 border-t border-slate-200/90 bg-white text-slate-600">
      {/* Creator Profile Spotlight Section */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-950 text-white py-10 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 shadow-inner">
              <User className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Application Creator & Architect
                </span>
                <span className="text-slate-500" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Verified Developer
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                ABOLUWARIN TEMITOPE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Dedicated to engineering accessible, privacy-centric health technology that empowers everyday wellness and clinical literacy.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <a
              href="tel:08166102920"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 hover:bg-teal-400 transition-all shadow-[0_4px_16px_rgba(20,184,166,0.3)] cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              Call: 08166102920
            </a>

            <a
              href="https://wa.me/2348166102920"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              WhatsApp Creator
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Authoritative Disclaimer Banner */}
        <div className="mb-10 rounded-2xl bg-amber-50/70 p-4 border border-amber-200/90 text-xs text-amber-900 leading-relaxed flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="font-bold text-amber-950">Authoritative Medical Disclaimer:</p>
              <p className="mt-0.5 text-amber-800/95">
                AuraHealth is an evidence-informed wellness educational application created by ABOLUWARIN TEMITOPE. It does NOT replace licensed physician advice, clinical diagnosis, or individualized treatment plans. Always consult your doctor or pharmacist regarding personal medical concerns.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectModule('emergency')}
            className="shrink-0 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors cursor-pointer shadow-2xs"
          >
            Emergency Protocols
          </button>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-2xs">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-base font-bold text-slate-900">AuraHealth</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Engineered by Aboluwarin Temitope to deliver transparent health education, drug safety guides, and nutrition planning with zero tracking.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
              <span className="font-semibold text-slate-800">Phone:</span>
              <a href="tel:08166102920" className="text-teal-700 hover:underline font-mono">
                08166102920
              </a>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Stateless • No Tracking • No Database
            </div>
          </div>

          {/* Column 2: Clinical & Education */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Clinical & AI Tools
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectModule('ai-chat')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  AI Health Assistant Q&A
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('medications')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Medication Information Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('symptoms')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Non-Diagnostic Symptom Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('calculators')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  BMI & Hydration Calculators
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Wellness & Nutrition */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Wellness & Nutrition
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectModule('nutrition')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Culturally Flexible Meal Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('womens-health')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Women’s Health & Cycle Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('education')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Evidence-Based Health Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectModule('habits')}
                  className="hover:text-teal-700 hover:underline cursor-pointer"
                >
                  Mindful Breathing & Habit Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts & Storage Action */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <PhoneCall className="h-3.5 w-3.5" /> Emergency Contacts
            </h4>
            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <p><span className="font-semibold text-slate-800">Nigeria:</span> 112 / 767</p>
              <p><span className="font-semibold text-slate-800">USA & Canada:</span> 911 | Crisis: 988</p>
              <p><span className="font-semibold text-slate-800">UK:</span> 999 or 112</p>
              <p><span className="font-semibold text-slate-800">European Union:</span> 112</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={onOpenPrivacyModal}
                className="text-left text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
              >
                Privacy Controls & Storage Info
              </button>
              <button
                type="button"
                onClick={onClearAllData}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear Local Browser Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} AuraHealth. Created by <span className="font-bold text-slate-800">ABOLUWARIN TEMITOPE</span>.
          </p>
          <div className="flex items-center gap-4">
            <span>Contact: <a href="tel:08166102920" className="font-mono text-teal-700 font-semibold hover:underline">08166102920</a></span>
            <span aria-hidden="true">·</span>
            <span>Clinical Grounding: WHO · CDC · FDA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
