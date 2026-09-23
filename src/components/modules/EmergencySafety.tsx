import React, { useState } from 'react';
import {
  PhoneCall,
  AlertTriangle,
  HeartCrack,
  Clock,
  ShieldAlert,
  Flame,
  UserCheck,
  Globe,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import {
  EMERGENCY_CONTACTS,
  RED_FLAG_SIGNS,
  FIRST_AID_BASICS
} from '../../data/emergencyData';

export const EmergencySafety: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>(
    EMERGENCY_CONTACTS[0].region
  );

  const activeContact = EMERGENCY_CONTACTS.find((c) => c.region === selectedRegion) || EMERGENCY_CONTACTS[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Top Urgent Emergency Alert */}
      <div
        role="alert"
        className="rounded-3xl bg-rose-600 p-6 sm:p-8 text-white shadow-xl ring-4 ring-rose-200"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/20 p-3 shrink-0">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-rose-100">
                Immediate Urgent Care Protocol
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                Emergency & Crisis Safety Center
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
                If you or someone nearby is experiencing acute symptoms, loss of consciousness, severe chest pain, or thoughts of self-harm, stop reading and call your local emergency dispatch or crisis hotline immediately.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={`tel:${activeContact.generalEmergency.split(' ')[0]}`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-black text-rose-700 hover:bg-rose-50 shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <PhoneCall className="h-5 w-5" />
              Call Emergency ({activeContact.generalEmergency})
            </a>
          </div>
        </div>
      </div>

      {/* Country Emergency Directory */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-teal-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Regional Emergency Dispatch Numbers
            </h2>
          </div>

          {/* Region selector pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {EMERGENCY_CONTACTS.map((c) => (
              <button
                key={c.region}
                onClick={() => setSelectedRegion(c.region)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  selectedRegion === c.region
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.region}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-medium block mb-1">General Emergency:</span>
            <a
              href={`tel:${activeContact.generalEmergency.split(' ')[0]}`}
              className="text-2xl font-black text-rose-600 hover:underline flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4" /> {activeContact.generalEmergency}
            </a>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
            <span className="text-slate-500 font-medium block mb-1">Ambulance / Medical:</span>
            <span className="text-2xl font-black text-slate-900">
              {activeContact.ambulance || activeContact.generalEmergency}
            </span>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 sm:col-span-2">
            <span className="text-slate-500 font-medium block mb-1">
              Mental Health & Crisis Hotline:
            </span>
            <span className="text-base font-bold text-indigo-700 block">
              {activeContact.crisisHelpline || 'Contact local emergency service'}
            </span>
            {activeContact.notes && (
              <span className="text-[11px] text-slate-500 block mt-1">
                {activeContact.notes}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Red Flag Symptoms Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <h2 className="text-xl font-bold text-slate-900">
            Critical Red Flag Signs Requiring Immediate Hospital Triage
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RED_FLAG_SIGNS.map((rf, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 space-y-2 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-rose-950 font-bold text-sm">
                <span className="text-rose-600">🚨</span>
                <h4>{rf.title}</h4>
              </div>
              <p className="text-xs text-rose-900 leading-relaxed">{rf.description}</p>
              <div className="rounded-xl bg-white p-2.5 border border-rose-200 text-xs font-semibold text-rose-800 flex items-start gap-1.5">
                <span className="text-rose-600">Action:</span>
                <span>{rf.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* First Aid Fundamentals */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <LifeBuoy className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Essential First Aid Educational Guidance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
          {FIRST_AID_BASICS.map((fa, i) => (
            <div key={i} className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2.5">
              <h4 className="text-sm font-bold text-slate-900">{fa.situation}</h4>
              <ol className="list-decimal pl-4 space-y-1.5 text-slate-600 leading-relaxed">
                {fa.steps.map((s, stepIdx) => (
                  <li key={stepIdx}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
