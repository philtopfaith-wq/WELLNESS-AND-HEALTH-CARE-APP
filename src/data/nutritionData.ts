import { MealRecipe } from '../types';

export const MEAL_RECIPES: MealRecipe[] = [
  // Breakfasts
  {
    id: 'b1-yam-egg',
    name: 'Steamed White Yam with Garden Herb Scrambled Eggs',
    mealType: 'breakfast',
    dietType: 'cultural-african',
    caloriesEstimate: 380,
    prepTimeMinutes: 20,
    keyNutrients: ['Complex Carbohydrates', 'High Quality Protein', 'Choline', 'Potassium'],
    ingredients: [
      '2 thick slices of white yam (boiled until tender in lightly salted water)',
      '2 fresh eggs whisked with diced tomatoes, onions, and sweet bell pepper',
      '1 tsp cold-pressed olive or vegetable oil',
      'Fresh leafy green garnish (spinach or ugwu)'
    ],
    instructions: 'Boil peeled yam slices for 12–15 minutes until fork-tender. Lightly saute diced onions and tomatoes in 1 tsp oil, pour in whisked eggs, and gently scramble. Serve together with steamed greens.',
    culturalNote: 'A nourishing traditional West African staple providing sustained energy without heavy saturated fats.'
  },
  {
    id: 'b2-oats-seeds',
    name: 'Warm Rolled Oats with Chia Seeds & Fresh Berries',
    mealType: 'breakfast',
    dietType: 'vegetarian',
    caloriesEstimate: 340,
    prepTimeMinutes: 10,
    keyNutrients: ['Beta-glucan Soluble Fiber', 'Omega-3 (ALA)', 'Antioxidants', 'Magnesium'],
    ingredients: [
      '1/2 cup rolled whole grain oats',
      '1 cup water or plant milk (almond, soy, or oat)',
      '1 tbsp chia seeds or ground flaxseed',
      '1/2 cup mixed fresh berries (blueberries or strawberries)',
      'A dash of cinnamon powder'
    ],
    instructions: 'Simmer rolled oats in water or plant milk for 5 minutes. Stir in chia seeds and cinnamon. Top with fresh berries for natural sweetness and antioxidant richness.'
  },
  {
    id: 'b3-plantain-egg',
    name: 'Boiled Ripe Plantain with Spinach & Tomato Frittata',
    mealType: 'breakfast',
    dietType: 'cultural-african',
    caloriesEstimate: 390,
    prepTimeMinutes: 20,
    keyNutrients: ['Potassium', 'Vitamin A', 'Vitamin C', 'Dietary Fiber', 'Protein'],
    ingredients: [
      '1 medium ripe yellow plantain (cut into chunks, boiled with skin on or peeled)',
      '2 eggs whisked with chopped fresh spinach and red bell peppers',
      '1 tsp vegetable or olive oil',
      'A pinch of garlic and ginger'
    ],
    instructions: 'Boil plantain chunks for 10 minutes until tender. Sauté spinach and aromatics briefly, add eggs, and cook on low heat until set. Pair with boiled plantain.'
  },
  {
    id: 'b4-mediterranean-toast',
    name: 'Avocado & Boiled Egg on Whole Grain Toast',
    mealType: 'breakfast',
    dietType: 'mediterranean',
    caloriesEstimate: 350,
    prepTimeMinutes: 10,
    keyNutrients: ['Monounsaturated Healthy Fats', 'Fiber', 'Complete Protein', 'Lutein'],
    ingredients: [
      '1 slice dense 100% whole grain or rye bread',
      '1/2 ripe avocado mashed with a squeeze of fresh lemon juice',
      '1 soft-boiled or poached egg',
      'Pinch of chili flakes and black pepper'
    ],
    instructions: 'Toast bread until golden. Spread freshly mashed avocado seasoned with lemon juice and black pepper. Top with sliced boiled egg.'
  },

  // Lunches
  {
    id: 'l1-beans-plantain',
    name: 'Stewed Brown Beans with Steamed Plantain & Steamed Greens',
    mealType: 'lunch',
    dietType: 'cultural-african',
    caloriesEstimate: 450,
    prepTimeMinutes: 35,
    keyNutrients: ['Plant Protein', 'Soluble & Insoluble Fiber', 'Iron', 'Folate'],
    ingredients: [
      '1 cup cooked brown beans (or honey beans / ewa)',
      'Simmered with onions, tomato puree, a touch of crayfish or vegetable seasoning',
      '1 small boiled or air-roasted ripe plantain',
      'Steamed local greens (spinach, bitterleaf, or collard greens)'
    ],
    instructions: 'Simmer tender pre-soaked brown beans with diced onions, tomatoes, and ground herbs until creamy. Serve alongside gently boiled or baked plantain slices and dark leafy greens.',
    culturalNote: 'Widely cherished across Nigeria as an ideal balanced protein-and-fiber powerhouse that supports steady glycemic response.'
  },
  {
    id: 'l2-quinoa-salmon',
    name: 'Mediterranean Quinoa Salad with Baked Herb Salmon',
    mealType: 'lunch',
    dietType: 'mediterranean',
    caloriesEstimate: 490,
    prepTimeMinutes: 25,
    keyNutrients: ['Omega-3 Fatty Acids (EPA/DHA)', 'Complete Plant Protein', 'Lycopene', 'Vitamin D'],
    ingredients: [
      '100g wild salmon fillet baked with lemon and rosemary',
      '3/4 cup cooked quinoa',
      'Diced cucumbers, cherry tomatoes, and red onion',
      '1 tbsp extra virgin olive oil and lemon vinaigrette',
      'Handful of fresh parsley'
    ],
    instructions: 'Bake salmon at 190°C (375°F) for 12 minutes. Toss cooked quinoa with fresh diced vegetables, parsley, and olive oil vinaigrette. Top with flaked salmon.'
  },
  {
    id: 'l3-lentil-sweet-potato',
    name: 'Spiced Lentil Dahl with Roasted Sweet Potato Cubes',
    mealType: 'lunch',
    dietType: 'vegan',
    caloriesEstimate: 420,
    prepTimeMinutes: 30,
    keyNutrients: ['Beta-Carotene (Vitamin A)', 'Prebiotic Fiber', 'Plant Iron', 'Turmeric Curcumin'],
    ingredients: [
      '3/4 cup red or brown lentils simmered with turmeric, ginger, and cumin',
      '1 medium sweet potato cubed and roasted with 1 tsp olive oil',
      'Fresh baby spinach folded in at the end',
      'Fresh coriander (cilantro) garnish'
    ],
    instructions: 'Simmer lentils in vegetable broth with turmeric, cumin, and minced ginger for 20 minutes until velvety. Fold in baby spinach until wilted. Serve alongside roasted sweet potato.'
  },

  // Dinners
  {
    id: 'd1-jollof-fish',
    name: 'Smoky Tomato Brown Rice (Jollof Style) with Grilled Tilapia',
    mealType: 'dinner',
    dietType: 'cultural-african',
    caloriesEstimate: 480,
    prepTimeMinutes: 35,
    keyNutrients: ['Lean Fish Protein', 'Lycopene', 'B-Vitamins', 'Selenium'],
    ingredients: [
      '1 fillet tilapia or sea bass, seasoned with garlic, ginger, and black pepper, grilled',
      '3/4 cup brown rice steamed in reduced tomato, red bell pepper, and scotch bonnet sauce',
      'Side of steamed green beans and shredded carrots'
    ],
    instructions: 'Blend bell peppers, tomatoes, and onions; reduce into a rich stew base. Cook brown rice in the savory broth until fluffy and aromatic. Grill the seasoned fish fillet and serve with vibrant vegetables.',
    culturalNote: 'Crafted with brown whole grain rice and grilled lean fish for an authentic, heart-healthy twist on classic West African celebration food.'
  },
  {
    id: 'd2-tofu-stirfry',
    name: 'Rainbow Vegetable & Crispy Tofu Stir-Fry with Sesame',
    mealType: 'dinner',
    dietType: 'vegan',
    caloriesEstimate: 390,
    prepTimeMinutes: 20,
    keyNutrients: ['Isoflavones', 'Calcium', 'Sulforaphane (Broccoli)', 'Antioxidants'],
    ingredients: [
      '150g firm tofu pressed, cubed, and pan-seared until golden',
      'Broccoli florets, bell peppers, snap peas, and grated ginger',
      '1 tbsp low-sodium soy sauce or tamari with 1 tsp sesame oil',
      '1/2 cup cooked brown jasmine rice or cauliflower rice'
    ],
    instructions: 'Sear tofu cubes in a non-stick skillet until crisp on all sides. Stir-fry vibrant vegetables for 4–5 minutes until crisp-tender. Toss with ginger-soy sauce and toasted sesame seeds over rice.'
  },
  {
    id: 'd3-chicken-vegetables',
    name: 'Herb-Roasted Chicken Breast with Mediterranean Vegetables',
    mealType: 'dinner',
    dietType: 'heart-healthy',
    caloriesEstimate: 430,
    prepTimeMinutes: 30,
    keyNutrients: ['High Lean Protein', 'Potassium', 'Dietary Fiber', 'Vitamin C'],
    ingredients: [
      '120g skinless chicken breast marinated in lemon, thyme, and garlic',
      '1 cup zucchini, eggplant, and sweet bell pepper roasted in olive oil',
      '1/2 cup roasted baby potatoes with rosemary'
    ],
    instructions: 'Roast seasoned chicken breast and diced vegetables on a sheet pan at 200°C (400°F) for 22 minutes until chicken reaches 74°C (165°F) internal temperature.'
  },

  // Healthy Snacks
  {
    id: 's1-groundnuts-fruit',
    name: 'Roasted Groundnuts (Peanuts) with Fresh Pawpaw (Papaya)',
    mealType: 'snack',
    dietType: 'cultural-african',
    caloriesEstimate: 180,
    prepTimeMinutes: 5,
    keyNutrients: ['Healthy Monounsaturated Fats', 'Papain Digestive Enzymes', 'Vitamin C'],
    ingredients: [
      '2 tbsp lightly roasted unsalted groundnuts (peanuts)',
      '1 cup fresh cubed ripe papaya (pawpaw)'
    ],
    instructions: 'Enjoy a portion of crisp roasted groundnuts alongside chilled fresh papaya for natural digestive support and sustained fullness.',
    culturalNote: 'A traditional, readily available whole-food snack enjoyed widely throughout tropical Africa.'
  },
  {
    id: 's2-hummus-veggies',
    name: 'Crisp Vegetable Crudités with Creamy Chickpea Hummus',
    mealType: 'snack',
    dietType: 'vegan',
    caloriesEstimate: 160,
    prepTimeMinutes: 5,
    keyNutrients: ['Fiber', 'Plant Protein', 'Vitamin A', 'Folate'],
    ingredients: [
      '3 tbsp traditional chickpea hummus with tahini and lemon',
      'Carrot sticks, cucumber rounds, and sweet bell pepper slices'
    ],
    instructions: 'Dip colorful crunchy vegetables into rich chickpea hummus for satisfying mid-afternoon energy.'
  },
  {
    id: 's3-greek-yogurt-walnuts',
    name: 'Plain Greek Yogurt with Walnuts & Raw Honey',
    mealType: 'snack',
    dietType: 'vegetarian',
    caloriesEstimate: 210,
    prepTimeMinutes: 3,
    keyNutrients: ['Probiotics', 'Calcium', 'Omega-3 ALA', 'Protein'],
    ingredients: [
      '1/2 cup plain unsweetened Greek yogurt (rich in live active cultures)',
      '6 walnut halves, lightly crushed',
      '1/2 tsp pure honey'
    ],
    instructions: 'Spoon thick probiotic yogurt into a bowl, sprinkle with walnut halves, and drizzle lightly with honey.'
  }
];

export const NUTRITION_PRINCIPLES = [
  {
    title: 'The Balanced Plate Blueprint',
    description: 'Structure meals with 1/2 plate non-starchy vegetables & fruits, 1/4 plate quality protein (fish, beans, eggs, lean poultry, tofu), and 1/4 plate fiber-rich complex carbohydrates (whole grains, yam, plantain, sweet potato).'
  },
  {
    title: 'Whole-Food Diversity',
    description: 'Aim for 30 different plant foods weekly (vegetables, fruits, herbs, seeds, grains, legumes). Microbial diversity in the gut thrives on varied prebiotic fibers.'
  },
  {
    title: 'Hydration First',
    description: 'Drink water consistently between meals. Thirst is often misinterpreted as hunger or afternoon fatigue.'
  },
  {
    title: 'Mindful Satiety',
    description: 'Eat without screen distractions, chew thoroughly, and pause when approximately 80% full (the Okinawan principle of Hara Hachi Bu).'
  }
];

export const MACRONUTRIENT_GUIDE = [
  {
    name: 'Complex Carbohydrates',
    role: 'Primary brain and muscular energy source, rich in digestive fiber.',
    idealSources: 'Brown rice, oats, sweet potatoes, yams, plantains, quinoa, beans, lentils.',
    portionTip: 'Approximately 1 cupped fist per meal.'
  },
  {
    name: 'Proteins',
    role: 'Cellular repair, immune antibodies, muscle maintenance, satiety hormones.',
    idealSources: 'Eggs, fish (mackerel, salmon, tilapia), chicken, legumes, beans, tofu, nuts.',
    portionTip: 'Approximately the size and thickness of your open palm (20–30g).'
  },
  {
    name: 'Healthy Fats',
    role: 'Hormone synthesis, cell membrane integrity, absorption of fat-soluble vitamins (A, D, E, K).',
    idealSources: 'Avocados, extra virgin olive oil, nuts, seeds (chia, flax, pumpkin), fatty fish.',
    portionTip: 'Approximately 1 thumb-sized portion per meal.'
  },
  {
    name: 'Dietary Fiber',
    role: 'Bowel regularity, cholesterol regulation, microbiome fermentation into short-chain fatty acids.',
    idealSources: 'Vegetables (spinach, ugwu, broccoli, carrots), berries, legumes, seeds.',
    portionTip: 'Aim for at least 25–35 grams per day.'
  }
];
