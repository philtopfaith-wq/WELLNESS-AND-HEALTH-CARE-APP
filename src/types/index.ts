export type AppModule =
  | 'dashboard'
  | 'ai-chat'
  | 'education'
  | 'medications'
  | 'nutrition'
  | 'womens-health'
  | 'calculators'
  | 'symptoms'
  | 'habits'
  | 'emergency';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  isEmergencyNotice?: boolean;
}

export interface Medication {
  id: string;
  genericName: string;
  brandNames: string[];
  category: string;
  drugClass: string;
  commonUses: string[];
  mechanismOfAction: string;
  commonSideEffects: string[];
  seriousWarningSigns: string[];
  generalPrecautions: string[];
  interactions: string[];
  storageInfo: string;
  administration: string;
  specialPopulations: {
    pregnancy: string;
    pediatric: string;
    elderly: string;
  };
  sources: {
    name: string;
    versionDate: string;
  }[];
}

export interface HealthTopic {
  id: string;
  title: string;
  category:
    | 'Nutrition'
    | 'Fitness'
    | 'Sleep'
    | 'Mental Wellbeing'
    | "Women's Health"
    | "Men's Health"
    | "Children's Wellness"
    | 'Medication Education'
    | 'Preventive Health'
    | 'Healthy Aging'
    | 'Hydration'
    | 'Common Symptoms'
    | 'Lifestyle';
  readTime: string;
  summary: string;
  keyPoints: string[];
  detailedContent: string[];
  practicalTips: string[];
  warningSigns: string[];
  sources: {
    organization: string;
    title: string;
    year: string;
  }[];
  tags: string[];
}

export interface SymptomInfoItem {
  id: string;
  name: string;
  bodySystem: 'Head & Neurological' | 'Respiratory' | 'Digestive' | 'Systemic' | 'Musculoskeletal' | 'Skin & Allergy';
  description: string;
  commonPossibleCauses: string[];
  lessCommonCauses: string[];
  generalSelfCare: string[];
  routineDoctorVisitSigns: string[];
  urgentCareWarningSigns: string[];
  emergencyRedFlags: string[];
}

export interface MealRecipe {
  id: string;
  name: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  dietType: 'all' | 'vegetarian' | 'vegan' | 'heart-healthy' | 'cultural-african' | 'mediterranean';
  caloriesEstimate: number;
  prepTimeMinutes: number;
  keyNutrients: string[];
  ingredients: string[];
  instructions: string;
  culturalNote?: string;
}

export interface DisclaimerType {
  type: 'general' | 'ai_qa' | 'medication' | 'nutrition' | 'womens_health' | 'symptoms' | 'calculators';
  showDetails?: boolean;
}
