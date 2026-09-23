import React, { useState } from 'react';
import { ShieldCheck, Trash2, CheckCircle2, Lock, EyeOff, Database, ServerOff, X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataCleared: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose, onDataCleared }) => {
  const [clearedNotice, setClearedNotice] = useState(false);

  if (!isOpen) return null;

  const handleClearAllData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setClearedNotice(true);
      onDataCleared();
      setTimeout(() => {
        setClearedNotice(false);
      }, 3000);
    } catch (e) {
      console.error('Error clearing local storage', e);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900">
              Privacy-First Architecture
            </h3>
            <p className="text-xs text-slate-500">Stateless, private, and account-free</p>
          </div>
        </div>

        <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-600">
          <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
            <Lock className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">No Account or Registration:</span>
              <p className="mt-0.5 text-slate-600">
                You never need to log in, provide your email, full name, phone number, or personal identifiers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
            <ServerOff className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">No Database Storage:</span>
              <p className="mt-0.5 text-slate-600">
                There is no central database, Firebase, or external health record repository. Your chat questions and wellness calculations remain strictly within your browser.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3">
            <Database className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800">Client-Side Temporary Storage:</span>
              <p className="mt-0.5 text-slate-600">
                Any tools you use (such as your daily water intake counter or menstrual cycle inputs) are stored exclusively in your browser’s temporary storage (localStorage/sessionStorage) on your device.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-100/70 p-2.5 text-[11px] text-slate-600 flex items-center justify-between">
          <span>Architected by <strong className="text-slate-800">ABOLUWARIN TEMITOPE</strong></span>
          <a href="tel:08166102920" className="text-teal-700 font-mono font-semibold hover:underline">
            08166102920
          </a>
        </div>

        {clearedNotice && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span>All local browser storage, chat records, and calculator preferences have been cleared.</span>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={handleClearAllData}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 focus:outline-hidden focus:ring-2 focus:ring-rose-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Clear Local Data
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
