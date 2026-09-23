import React, { useState, useMemo } from 'react';
import {
  Utensils,
  Apple,
  Sparkles,
  CheckCircle2,
  Clock,
  Flame,
  Globe2,
  Layers,
  Heart,
  Droplet,
  Info,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import {
  MEAL_RECIPES,
  NUTRITION_PRINCIPLES,
  MACRONUTRIENT_GUIDE
} from '../../data/nutritionData';
import { MealRecipe } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

export const NutritionMealPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'principles' | 'nutrients'>('planner');

  // Meal Planner State
  const [selectedMealType, setSelectedMealType] = useState<string>('all');
  const [selectedDietType, setSelectedDietType] = useState<string>('all');
  const [calorieFilter, setCalorieFilter] = useState<string>('all');
  const [exclusionFilter, setExclusionFilter] = useState<string>('none');
  const [savedFavoriteIds, setSavedFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_favorite_meals');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setSavedFavoriteIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('aura_favorite_meals', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const filteredMeals = useMemo(() => {
    return MEAL_RECIPES.filter((meal) => {
      const matchesType = selectedMealType === 'all' || meal.mealType === selectedMealType;
      const matchesDiet =
        selectedDietType === 'all' ||
        meal.dietType === selectedDietType ||
        (selectedDietType === 'vegetarian' && meal.dietType === 'vegan');

      let matchesCalories = true;
      if (calorieFilter === 'under350') matchesCalories = meal.caloriesEstimate < 350;
      if (calorieFilter === '350to450') matchesCalories = meal.caloriesEstimate >= 350 && meal.caloriesEstimate <= 450;
      if (calorieFilter === 'over450') matchesCalories = meal.caloriesEstimate > 450;

      let matchesExclusion = true;
      if (exclusionFilter === 'dairy-free') {
        matchesExclusion = !meal.ingredients.some((i) => i.toLowerCase().includes('yogurt') || i.toLowerCase().includes('milk') || i.toLowerCase().includes('cheese'));
      }
      if (exclusionFilter === 'nut-free') {
        matchesExclusion = !meal.ingredients.some((i) => i.toLowerCase().includes('peanut') || i.toLowerCase().includes('groundnut') || i.toLowerCase().includes('walnut'));
      }

      return matchesType && matchesDiet && matchesCalories && matchesExclusion;
    });
  }, [selectedMealType, selectedDietType, calorieFilter, exclusionFilter]);

  const resetFilters = () => {
    setSelectedMealType('all');
    setSelectedDietType('all');
    setCalorieFilter('all');
    setExclusionFilter('none');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <Utensils className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nutrition & Meal Planning</h1>
            <span className="text-slate-400 text-xs font-medium">· Culturally Diverse Staples</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Evidence-informed eating principles, macronutrient guides, and interactive client-side meal ideas.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('planner')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'planner' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Meal Planner
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'principles' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Healthy Principles
          </button>
          <button
            onClick={() => setActiveTab('nutrients')}
            className={`rounded-lg px-3 py-1.5 transition-colors cursor-pointer ${
              activeTab === 'nutrients' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Macronutrients
          </button>
        </div>
      </div>

      {/* Mandatory Nutrition Disclaimer */}
      <MedicalDisclaimer type="nutrition" className="mb-6" />

      {/* TAB 1: MEAL PLANNER */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900">Custom Meal Generator</h3>
              </div>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Meal Type */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Meal Timing / Type</label>
                <select
                  value={selectedMealType}
                  onChange={(e) => setSelectedMealType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-hidden"
                >
                  <option value="all">All Meal Times</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Healthy Snacks</option>
                </select>
              </div>

              {/* Dietary Style */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Dietary Style & Heritage</label>
                <select
                  value={selectedDietType}
                  onChange={(e) => setSelectedDietType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-hidden"
                >
                  <option value="all">All Dietary Traditions</option>
                  <option value="cultural-african">West African & Nigerian Heritage</option>
                  <option value="mediterranean">Mediterranean Heart-Healthy</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">100% Plant-Based (Vegan)</option>
                  <option value="heart-healthy">Low Sodium / Lean Protein</option>
                </select>
              </div>

              {/* Calorie Range */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Approx. Calorie Bracket</label>
                <select
                  value={calorieFilter}
                  onChange={(e) => setCalorieFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-hidden"
                >
                  <option value="all">Any Calorie Level</option>
                  <option value="under350">Light (&lt; 350 kcal)</option>
                  <option value="350to450">Moderate (350–450 kcal)</option>
                  <option value="over450">Sustained (&gt; 450 kcal)</option>
                </select>
              </div>

              {/* Exclusions */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Allergy / Exclusions</label>
                <select
                  value={exclusionFilter}
                  onChange={(e) => setExclusionFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-900 focus:border-teal-500 focus:outline-hidden"
                >
                  <option value="none">No Specific Exclusion</option>
                  <option value="dairy-free">Dairy-Free</option>
                  <option value="nut-free">Nut / Peanut-Free</option>
                </select>
              </div>
            </div>
          </div>

          {/* Meal Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => {
              const isFav = savedFavoriteIds.includes(meal.id);
              return (
                <article
                  key={meal.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:shadow-xs transition-shadow"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                          {meal.mealType}
                        </span>
                        {meal.culturalNote && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                            <Globe2 className="h-3 w-3" /> Cultural Staple
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(meal.id)}
                        className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                          isFav ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title={isFav ? 'Saved to client favorites' : 'Save recipe'}
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-rose-600' : ''}`} />
                      </button>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900 leading-snug">
                      {meal.name}
                    </h3>

                    {meal.culturalNote && (
                      <p className="mt-1.5 text-xs text-amber-900/90 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">
                        {meal.culturalNote}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Flame className="h-3.5 w-3.5 text-orange-500" />
                        ~{meal.caloriesEstimate} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-blue-500" />
                        {meal.prepTimeMinutes} mins
                      </span>
                    </div>

                    {/* Nutrient Badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {meal.keyNutrients.map((n) => (
                        <span
                          key={n}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {n}
                        </span>
                      ))}
                    </div>

                    {/* Ingredients Preview */}
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Ingredients:
                      </h4>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {meal.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-600">
                    <span className="font-bold text-slate-800 block mb-1">Preparation Note:</span>
                    <p className="text-[11px] leading-relaxed text-slate-600">{meal.instructions}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HEALTHY PRINCIPLES */}
      {activeTab === 'principles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {NUTRITION_PRINCIPLES.map((p, idx) => (
              <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-100 text-teal-700 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {/* Culturally Inclusive Food Groups */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Culturally Inclusive Whole Food Staples
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Healthy eating is not restricted to any single cuisine. Regional staples like yams, plantains, beans, cassava leaves, fish, and seeds provide complete nutritional profiles when balanced appropriately.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Tubers & Grains:</span>
                <p className="text-slate-600">Yam, Sweet Potatoes, Brown Rice, Rolled Oats, Green Plantains, Millet, Sorghum.</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Proteins & Legumes:</span>
                <p className="text-slate-600">Brown Beans (Ewa), Lentils, Fresh Eggs, Mackerel, Tilapia, Skinless Poultry, Tofu.</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                <span className="font-bold text-slate-800 block mb-1">Greens, Fruits & Seeds:</span>
                <p className="text-slate-600">Ugwu (Fluted Pumpkin Leaves), Spinach, Bitterleaf, Watermelon, Papaya, Chia, Pumpkin Seeds (Egusi).</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MACRONUTRIENTS & PORTIONS */}
      {activeTab === 'nutrients' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MACRONUTRIENT_GUIDE.map((m) => (
              <div key={m.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                  <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
                  <span className="rounded-md bg-teal-50 border border-teal-200 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                    Essential
                  </span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  <p><span className="font-bold text-slate-800">Physiological Role:</span> {m.role}</p>
                  <p><span className="font-bold text-slate-800">Ideal Food Sources:</span> {m.idealSources}</p>
                  <p className="text-teal-700 font-semibold bg-teal-50/70 p-2 rounded-lg border border-teal-100">
                    🖐️ Visual Portion Guide: {m.portionTip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
