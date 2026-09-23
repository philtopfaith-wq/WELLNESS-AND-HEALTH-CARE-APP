import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { DisclaimerType } from '../../types';

interface MedicalDisclaimerProps {
  type?: DisclaimerType['type'];
  compact?: boolean;
  className?: string;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  type = 'general',
  compact = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDisclaimerContent = () => {
    switch (type) {
      case 'ai_qa':
        return {
          title: 'AI Health Assistant Disclaimer',
          text: 'AI-generated health information may contain errors and is provided strictly for educational purposes. Do not use it as a medical diagnosis or substitute for professional medical advice, examination, or treatment.',
          border: 'border-amber-200 bg-amber-50/80 text-amber-900',
          badge: 'bg-amber-100 text-amber-800'
        };
      case 'medication':
        return {
          title: 'Medication Educational Notice',
          text: 'Medication information is provided for educational purposes and is not a substitute for advice from a doctor or pharmacist. Never start, stop, or change prescribed drug dosages based on this information.',
          border: 'border-rose-200 bg-rose-50/80 text-rose-900',
          badge: 'bg-rose-100 text-rose-800'
        };
      case 'nutrition':
        return {
          title: 'Nutritional Guidance Disclaimer',
          text: 'Meal suggestions and nutrition tips are general educational guidance and may not be appropriate for individual medical conditions, allergies, or therapeutic diets.',
          border: 'border-emerald-200 bg-emerald-50/80 text-emerald-900',
          badge: 'bg-emerald-100 text-emerald-800'
        };
      case 'womens_health':
        return {
          title: "Women's Health Educational Notice",
          text: "Women's health information and cycle calculations are educational estimates and should not replace professional medical care, prenatal consultation, or clinical contraception.",
          border: 'border-purple-200 bg-purple-50/80 text-purple-900',
          badge: 'bg-purple-100 text-purple-800'
        };
      case 'symptoms':
        return {
          title: 'Symptom Information Disclaimer',
          text: 'Symptom information is for educational understanding only. Symptoms can have several possible causes and only a licensed clinician can provide a diagnosis.',
          border: 'border-sky-200 bg-sky-50/80 text-sky-900',
          badge: 'bg-sky-100 text-sky-800'
        };
      case 'calculators':
        return {
          title: 'Wellness Calculator Notice',
          text: 'Calculator results are statistical estimates for educational awareness only. They do not constitute personalized clinical health assessments or medical calorie prescriptions.',
          border: 'border-blue-200 bg-blue-50/80 text-blue-900',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'general':
      default:
        return {
          title: 'General Health Disclaimer',
          text: 'This information is for educational purposes and does not replace professional medical advice, diagnosis, or treatment.',
          border: 'border-slate-200 bg-slate-50 text-slate-800',
          badge: 'bg-slate-200 text-slate-700'
        };
    }
  };

  const content = getDisclaimerContent();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${content.border} ${className}`}>
        <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{content.text}</span>
      </div>
    );
  }

  return (
    <aside
      className={`rounded-xl border p-4 shadow-xs transition-all ${content.border} ${className}`}
      aria-label="Medical Disclaimer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full p-1.5 bg-white/80 shadow-xs">
            <ShieldAlert className="h-5 w-5 text-amber-600" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold tracking-tight">{content.title}</h4>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${content.badge}`}>
                Educational Only
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed opacity-95">
              {content.text}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 rounded-lg p-1.5 hover:bg-black/5 text-xs font-medium inline-flex items-center gap-1 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          aria-expanded={isExpanded}
        >
          <span className="hidden sm:inline text-xs">{isExpanded ? 'Hide safety guidelines' : 'Safety guidelines'}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-black/10 text-xs space-y-2 opacity-90">
          <div className="flex items-start gap-2 text-rose-800 font-semibold">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Emergency Situations:</span>
          </div>
          <p className="pl-6">
            If you or someone in your care is experiencing severe chest pain, shortness of breath, sudden facial drooping or weakness, uncontrolled bleeding, or suicidal thoughts, call your local emergency services (e.g., 911, 999, 112) immediately. Do not rely on digital applications during critical emergencies.
          </p>
          <div className="pl-6 pt-1 text-[11px] text-slate-600">
            AuraHealth does not store your identity, does not require an account, and operates in full compliance with privacy-first standards.
          </div>
        </div>
      )}
    </aside>
  );
};
