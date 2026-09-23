import React, { useState } from 'react';
import {
  HeartPulse,
  Sparkles,
  BookOpen,
  Pill,
  Utensils,
  Baby,
  Calculator,
  Stethoscope,
  Activity,
  PhoneCall,
  ShieldCheck,
  Menu,
  X,
  AlertCircle,
  Phone,
  UserCheck
} from 'lucide-react';
import { AppModule } from '../../types';

interface HeaderProps {
  currentModule: AppModule;
  onSelectModule: (module: AppModule) => void;
  onOpenPrivacyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentModule,
  onSelectModule,
  onOpenPrivacyModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: AppModule; label: string; icon: React.ElementType; isEmergency?: boolean }[] = [
    { id: 'dashboard', label: 'Overview', icon: HeartPulse },
    { id: 'ai-chat', label: 'Ask AI', icon: Sparkles },
    { id: 'education', label: 'Library', icon: BookOpen },
    { id: 'medications', label: 'Medications', icon: Pill },
    { id: 'nutrition', label: 'Nutrition & Meals', icon: Utensils },
    { id: 'womens-health', label: "Women's Health", icon: Baby },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'symptoms', label: 'Symptoms', icon: Stethoscope },
    { id: 'habits', label: 'Habits', icon: Activity },
    { id: 'emergency', label: 'Emergency', icon: PhoneCall, isEmergency: true }
  ];

  const handleNavClick = (id: AppModule) => {
    onSelectModule(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all shadow-[0_2px_12px_-3px_rgba(0,0,0,0.04)]">
      {/* Top Bar with Creator Attribution & Safety Notice */}
      <div className="bg-slate-950 px-4 py-1.5 text-white text-xs border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Creator Attribution */}
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-slate-400">Created by</span>
              <strong className="text-white font-semibold tracking-wide">ABOLUWARIN TEMITOPE</strong>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
              <a
                href="tel:08166102920"
                className="hidden sm:inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 hover:underline font-mono"
                title="Call Creator Aboluwarin Temitope"
              >
                <Phone className="h-3 w-3" />
                08166102920
              </a>
            </div>
          </div>

          {/* Privacy & Emergency Shortcuts */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPrivacyModal}
              className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">100% Client-Side Privacy</span>
              <span className="sm:hidden">Privacy</span>
            </button>

            <span className="text-slate-700" aria-hidden="true">|</span>

            <button
              onClick={() => handleNavClick('emergency')}
              className="inline-flex items-center gap-1 rounded-md bg-rose-600/90 px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-rose-500 cursor-pointer transition-colors"
            >
              <AlertCircle className="h-3 w-3" />
              <span>Emergency 911 / 112</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 text-left focus:outline-hidden group cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-[0_4px_12px_rgba(20,184,166,0.25)] group-hover:scale-105 transition-all">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">AuraHealth</span>
              <span className="text-[11px] font-medium text-teal-700 tracking-wide">Wellness</span>
            </div>
            <p className="text-[11px] text-slate-500 font-normal leading-none mt-0.5">
              Evidence-Informed Healthcare Guide
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentModule === item.id;
            if (item.isEmergency) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`ml-3 inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-2.5 py-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200/90 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile / Tablet Menu Trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="tel:08166102920"
            className="sm:hidden inline-flex items-center justify-center h-8 w-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200"
            title="Call Creator"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick('emergency')}
            className="inline-flex items-center gap-1 rounded-xl bg-rose-600 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Emergency</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-3 xl:hidden shadow-lg animate-in slide-in-from-top-2 duration-150">
          {/* Creator Mini Card on Mobile */}
          <div className="mb-3 rounded-xl bg-slate-50 p-3 border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-500 block">Lead Creator</span>
              <strong className="text-slate-900 font-bold">ABOLUWARIN TEMITOPE</strong>
            </div>
            <a
              href="tel:08166102920"
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-teal-700 shadow-2xs font-mono"
            >
              <Phone className="h-3 w-3" />
              08166102920
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-colors cursor-pointer ${
                    item.isEmergency
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : isActive
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      item.isEmergency
                        ? 'text-rose-600'
                        : isActive
                        ? 'text-teal-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrivacyModal();
              }}
              className="inline-flex items-center gap-1.5 text-teal-700 font-medium hover:underline cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Privacy & Local Data Controls
            </button>
            <span className="text-[11px] text-slate-400">Stateless System</span>
          </div>
        </div>
      )}
    </header>
  );
};
