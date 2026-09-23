import React, { useState } from 'react';
import { AppModule } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PrivacyModal } from './components/common/PrivacyModal';
import { Dashboard } from './components/modules/Dashboard';
import { AiHealthChat } from './components/modules/AiHealthChat';
import { HealthEducation } from './components/modules/HealthEducation';
import { MedicationInfo } from './components/modules/MedicationInfo';
import { NutritionMealPlanner } from './components/modules/NutritionMealPlanner';
import { WomensHealth } from './components/modules/WomensHealth';
import { WellnessCalculators } from './components/modules/WellnessCalculators';
import { SymptomInfo } from './components/modules/SymptomInfo';
import { HealthyHabitTools } from './components/modules/HealthyHabitTools';
import { EmergencySafety } from './components/modules/EmergencySafety';

export default function App() {
  const [currentModule, setCurrentModule] = useState<AppModule>('dashboard');
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [storageRefreshKey, setStorageRefreshKey] = useState(0);

  const handleSelectModule = (mod: AppModule) => {
    setCurrentModule(mod);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAiWithQuery = (query: string) => {
    try {
      sessionStorage.setItem('aura_pending_query', query);
    } catch {
      // ignore
    }
    setCurrentModule('ai-chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      setStorageRefreshKey((prev) => prev + 1);
    } catch (e) {
      console.error('Error clearing data', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Accessible Header */}
      <Header
        currentModule={currentModule}
        onSelectModule={handleSelectModule}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentModule === 'dashboard' && (
          <Dashboard
            onSelectModule={handleSelectModule}
            onAskAiWithQuery={handleAskAiWithQuery}
          />
        )}

        {currentModule === 'ai-chat' && (
          <AiHealthChat
            onNavigateToEmergency={() => handleSelectModule('emergency')}
          />
        )}

        {currentModule === 'education' && (
          <HealthEducation
            onAskAiAboutTopic={(title) =>
              handleAskAiWithQuery(`Can you explain the clinical details and lifestyle recommendations for: ${title}?`)
            }
          />
        )}

        {currentModule === 'medications' && (
          <MedicationInfo
            onAskAiAboutMedication={(medName) =>
              handleAskAiWithQuery(`What should a patient know about indications, common side effects, and precautions for ${medName}?`)
            }
          />
        )}

        {currentModule === 'nutrition' && <NutritionMealPlanner />}

        {currentModule === 'womens-health' && <WomensHealth />}

        {currentModule === 'calculators' && <WellnessCalculators />}

        {currentModule === 'symptoms' && (
          <SymptomInfo
            onAskAiAboutSymptom={(sym) =>
              handleAskAiWithQuery(`What are the common possible causes, home self-care options, and warning signs for the symptom: ${sym}?`)
            }
            onNavigateToEmergency={() => handleSelectModule('emergency')}
          />
        )}

        {currentModule === 'habits' && <HealthyHabitTools />}

        {currentModule === 'emergency' && <EmergencySafety />}
      </main>

      {/* Accessible Footer */}
      <Footer
        onSelectModule={handleSelectModule}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onClearAllData={handleClearAllData}
      />

      {/* Privacy & Stateless Architecture Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        onDataCleared={handleClearAllData}
      />
    </div>
  );
}
