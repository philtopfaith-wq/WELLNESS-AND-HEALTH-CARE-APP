import { HealthTopic } from '../types';

export const HEALTH_TOPICS_DATA: HealthTopic[] = [
  {
    id: 'sleep-optimization',
    title: 'Science of Restorative Sleep & Circadian Rhythms',
    category: 'Sleep',
    readTime: '5 min read',
    summary: 'How consistent sleep timing, light exposure, and bedroom environment regulate your biological clock and immune regeneration.',
    keyPoints: [
      'Adults typically require 7 to 9 hours of quality sleep per night for metabolic and neural recovery.',
      'Morning natural sunlight exposure sets the suprachiasmatic nucleus (internal clock) and promotes evening melatonin onset.',
      'Sleep is structured in 90-minute cycles alternating between non-REM deep sleep and REM cognitive restoration.'
    ],
    detailedContent: [
      'During non-REM stage 3 (deep slow-wave sleep), the body releases growth hormone, repairs tissue, and clears metabolic waste products through the glymphatic system.',
      'Caffeine has a half-life of 5 to 7 hours; consuming stimulants late in the afternoon reduces restorative deep sleep even if you fall asleep on time.',
      'A cooler bedroom temperature (around 18°C–20°C or 65°F–68°F) naturally aligns with the body’s core temperature drop required for sound sleep.'
    ],
    practicalTips: [
      'Aim for a consistent wake-up time 7 days a week to anchor your circadian rhythm.',
      'Dim artificial overhead lighting and turn off blue-spectrum screens 60 minutes before bed.',
      'Reserve the bed strictly for sleep and intimacy to reinforce positive neurological conditioning.'
    ],
    warningSigns: [
      'Chronic loud snoring paired with gasping for breath (possible obstructive sleep apnea).',
      'Unexplained excessive daytime sleepiness despite spending 8+ hours in bed.',
      'Inability to sleep lasting longer than 3 weeks (chronic insomnia).'
    ],
    sources: [
      { organization: 'American Academy of Sleep Medicine (AASM)', title: 'Clinical Sleep Guidelines', year: '2023' },
      { organization: 'National Sleep Foundation', title: 'Sleep Duration and Quality Recommendations', year: '2024' }
    ],
    tags: ['Sleep Hygiene', 'Circadian Clock', 'Melatonin', 'Recovery']
  },
  {
    id: 'hypertension-prevention',
    title: 'Cardiovascular Health: Understanding Blood Pressure',
    category: 'Preventive Health',
    readTime: '6 min read',
    summary: 'Evidence-based lifestyle strategies to maintain optimal arterial elasticity and prevent the silent risks of elevated blood pressure.',
    keyPoints: [
      'Normal blood pressure is generally defined as systolic under 120 mmHg and diastolic under 80 mmHg.',
      'Elevated blood pressure is frequently asymptomatic for years while exerting chronic strain on the heart, brain, and kidneys.',
      'The DASH (Dietary Approaches to Stop Hypertension) dietary pattern consistently demonstrates blood pressure reduction.'
    ],
    detailedContent: [
      'Blood pressure represents the force exerted by circulating blood against the walls of the body’s arteries. Chronic high pressure damages endothelial linings, promoting plaque buildup (atherosclerosis).',
      'Excess sodium intake causes fluid retention and vascular stiffness. Increasing dietary potassium from fruits and vegetables helps balance sodium and relax vascular walls.',
      'Regular aerobic exercise improves arterial compliance and stimulates nitric oxide production, naturally lowering resting resistance.'
    ],
    practicalTips: [
      'Measure blood pressure with a validated home upper-arm cuff after 5 minutes of quiet resting.',
      'Incorporate potassium-rich whole foods like leafy greens, bananas, sweet potatoes, and beans.',
      'Engage in at least 150 minutes of moderate aerobic activity (like brisk walking) weekly.'
    ],
    warningSigns: [
      'Severe sudden headache with visual changes or confusion.',
      'Chest tightness or shortness of breath accompanied by very high readings (>180/120 mmHg - Hypertensive Crisis).',
      'Sudden weakness or numbness.'
    ],
    sources: [
      { organization: 'World Health Organization (WHO)', title: 'Global Report on Hypertension', year: '2023' },
      { organization: 'American Heart Association (AHA)', title: 'High Blood Pressure Guidelines', year: '2024' }
    ],
    tags: ['Heart Health', 'Blood Pressure', 'DASH Diet', 'Longevity']
  },
  {
    id: 'iron-deficiency-nutrition',
    title: 'Nutritional Iron: Combating Fatigue & Supporting Blood Health',
    category: 'Nutrition',
    readTime: '4 min read',
    summary: 'A guide to heme vs non-heme iron sources, synergistic vitamin C pairing, and common dietary inhibitors of iron absorption.',
    keyPoints: [
      'Iron is vital for hemoglobin synthesis, the protein in red blood cells that transports oxygen throughout the body.',
      'Heme iron (found in meat, poultry, and fish) has higher bioavailability (15%–35%) than plant-based non-heme iron (2%–20%).',
      'Vitamin C enhances non-heme iron absorption, whereas calcium, tannins (in tea/coffee), and phytates can inhibit absorption.'
    ],
    detailedContent: [
      'Iron deficiency is the most widespread nutritional deficiency globally, especially prevalent among menstruating women, pregnant individuals, and growing children.',
      'Plant foods rich in iron include lentils, chickpeas, kidney beans, pumpkin seeds, dark leafy greens, tofu, and fortified cereals.',
      'Combining plant iron with citric acid or ascorbic acid (e.g., lemon dressing on spinach salad, or tomatoes with beans) dramatically boosts non-heme uptake.'
    ],
    practicalTips: [
      'Avoid drinking black tea, green tea, or coffee simultaneously with iron-rich meals; separate by at least 1 hour.',
      'Cook acidic foods in cast-iron cookware to naturally boost dietary iron content.',
      'Pair legumes and beans with vitamin C sources like bell peppers, oranges, or tomatoes.'
    ],
    warningSigns: [
      'Unusual pale skin, inner eyelids, or nail beds accompanied by chronic breathlessness upon mild exertion.',
      'Pica (unusual cravings for non-food items like ice, chalk, or clay).',
      'Rapid resting pulse or frequent dizziness upon standing.'
    ],
    sources: [
      { organization: 'WHO Nutritional Guidelines', title: 'Prevention of Micronutrient Deficiencies', year: '2023' },
      { organization: 'National Institutes of Health (NIH) Office of Dietary Supplements', title: 'Iron Fact Sheet', year: '2024' }
    ],
    tags: ['Iron', 'Anemia Prevention', 'Plant Nutrition', 'Energy']
  },
  {
    id: 'hydration-cellular-health',
    title: 'Daily Hydration: Fluid Balance, Electrolytes & Performance',
    category: 'Hydration',
    readTime: '4 min read',
    summary: 'Why cellular hydration goes beyond plain water: the role of electrolytes, climate, and how to assess personal hydration status.',
    keyPoints: [
      'The human body is approximately 55%–65% water, which facilitates nutrient transport, thermal regulation, and joint lubrication.',
      'Mild dehydration (even 1%–2% body weight loss) impairs working memory, mood, concentration, and physical endurance.',
      'Urine color is one of the simplest practical bio-indicators: pale straw color indicates good hydration.'
    ],
    detailedContent: [
      'Sweat loss during warm climates or vigorous exercise depletes sodium, potassium, and chloride alongside fluids.',
      'Hydration needs vary widely based on body mass, environmental humidity, temperature, metabolic rate, and physical activity level.',
      'Water-dense fruits and vegetables (cucumber, watermelon, oranges, spinach) contribute roughly 20% of daily total fluid intake.'
    ],
    practicalTips: [
      'Drink a glass of water first thing upon waking up to counter overnight respiratory fluid loss.',
      'In hot weather or during prolonged workouts, consume water with a pinch of salt or electrolyte-rich foods (e.g., coconut water, bananas).',
      'Keep a reusable bottle nearby to sip steadily throughout the day rather than chugging large amounts at once.'
    ],
    warningSigns: [
      'Dark amber urine or producing very small amounts of urine over 8+ hours.',
      'Extreme thirst accompanied by sunken eyes, dry mouth, and confusion.',
      'Dizziness or fainting upon standing.'
    ],
    sources: [
      { organization: 'National Academies of Sciences, Engineering, and Medicine', title: 'Dietary Reference Intakes for Water', year: '2023' },
      { organization: 'CDC', title: 'Water and Healthier Drinks', year: '2024' }
    ],
    tags: ['Water', 'Electrolytes', 'Kidney Health', 'Cognition']
  },
  {
    id: 'stress-nervous-system',
    title: 'Stress Resilience & the Autonomic Nervous System',
    category: 'Mental Wellbeing',
    readTime: '5 min read',
    summary: 'Evidence-based mechanisms to down-regulate sympathetic fight-or-flight and activate vagal tone through breath and mindfulness.',
    keyPoints: [
      'Chronic unmanaged stress elevates cortisol and inflammatory cytokines, impacting metabolic, digestive, and cardiovascular health.',
      'The vagus nerve is the primary conduit of the parasympathetic nervous system (rest, digest, restore).',
      'Controlled respiration techniques (such as extended exhalations) directly modulate heart rate variability (HRV).'
    ],
    detailedContent: [
      'When the brain perceives threat or high pressure, the hypothalamic-pituitary-adrenal (HPA) axis activates, releasing adrenaline and cortisol.',
      'While acute stress is an adaptive survival response, chronic low-grade activation impairs immune response, sleep quality, and gut microbiome balance.',
      'Slow, diaphragmatic breathing with exhalations longer than inhalations triggers the baroreceptor reflex, signalling physiological safety to the brain.'
    ],
    practicalTips: [
      'Practice "Box Breathing" (4s inhale, 4s hold, 4s exhale, 4s hold) for 3 minutes when feeling overwhelmed.',
      'Spend 15–20 minutes daily in natural green spaces to lower salivary cortisol markers.',
      'Establish a digital boundary: designate specific unplugged times in the evening.'
    ],
    warningSigns: [
      'Feelings of hopelessness, overwhelming panic, or inability to perform basic daily activities.',
      'Persistent chest tightness with racing heart that does not subside with rest.',
      'Thoughts of self-harm (requires immediate emergency contact).'
    ],
    sources: [
      { organization: 'American Psychological Association (APA)', title: 'Stress in Modern Life', year: '2023' },
      { organization: 'Harvard Health Publishing', title: 'Understanding the Stress Response', year: '2024' }
    ],
    tags: ['Mental Health', 'Vagus Nerve', 'Cortisol', 'Breathing']
  },
  {
    id: 'prenatal-wellness-basics',
    title: 'Prenatal Wellness: Nourishing Mother & Developing Child',
    category: "Women's Health",
    readTime: '6 min read',
    summary: 'Essential educational principles for prenatal nutrition, folic acid significance, gentle movement, and trimester checkpoints.',
    keyPoints: [
      'Folic acid (vitamin B9) supplementation before conception and during early pregnancy reduces neural tube defects by up to 70%.',
      'Prenatal care involves continuous clinical monitoring of blood pressure, blood glucose, fetal growth, and maternal wellbeing.',
      'Hydration and adequate caloric density from nutrient-dense whole foods support expanding maternal plasma volume.'
    ],
    detailedContent: [
      'During pregnancy, nutrient requirements increase for iron, calcium, choline, iodine, and omega-3 fatty acids (DHA for fetal brain and retinal development).',
      'Regular low-impact physical exercise (such as walking, swimming, or prenatal yoga) helps prevent gestational diabetes, alleviates lower back pain, and prepares the pelvic floor.',
      'Food safety is critical: avoid unpasteurized dairy, undercooked meats or seafood, and high-mercury predatory fish.'
    ],
    practicalTips: [
      'Take a certified prenatal multivitamin containing 400–800 mcg of folic acid as advised by your prenatal provider.',
      'Eat small, frequent meals if experiencing morning sickness; ginger and vitamin B6 often offer gentle relief.',
      'Rest on your side (especially the left side) during later trimesters to optimize uterine blood flow.'
    ],
    warningSigns: [
      'Any vaginal bleeding or fluid leaking.',
      'Severe headache, sudden face or hand swelling, or visual disturbances (warning signs of preeclampsia).',
      'Noticeable decrease in baby’s movement during the third trimester.'
    ],
    sources: [
      { organization: 'American College of Obstetricians and Gynecologists (ACOG)', title: 'Nutrition During Pregnancy', year: '2023' },
      { organization: 'WHO', title: 'Recommendations on Antenatal Care', year: '2024' }
    ],
    tags: ['Pregnancy', 'Prenatal Care', 'Folic Acid', 'Maternal Health']
  },
  {
    id: 'healthy-aging-mobility',
    title: 'Healthy Aging: Preserving Muscle Mass & Cognitive Vitality',
    category: 'Healthy Aging',
    readTime: '5 min read',
    summary: 'How progressive resistance training and social-cognitive engagement combat sarcopenia and support lifelong independence.',
    keyPoints: [
      'Sarcopenia (age-related loss of skeletal muscle mass and strength) begins subtly around age 30 and accelerates after 60.',
      'Resistance exercise is the most effective intervention to maintain bone mineral density, joint stability, and metabolic rate.',
      'Older adults need slightly higher dietary protein intake (1.0–1.2g per kg body weight) to stimulate muscle protein synthesis.'
    ],
    detailedContent: [
      'Maintaining balance and lower-body strength directly reduces fall risk, which is one of the leading causes of preventable injury in older adults.',
      'Cognitive resilience is strongly linked to cardiovascular health: regular movement, novel learning (languages, instruments), and rich social connection stimulate neuroplasticity.',
      'Routine screenings for bone density (DEXA scan), vision, hearing, and colon health enable timely preventive care.'
    ],
    practicalTips: [
      'Include simple bodyweight or resistance band exercises (chair squats, wall push-ups) 2–3 times per week.',
      'Distribute dietary protein evenly across all meals to optimize cellular protein utilization.',
      'Practice single-leg balance stands near a stable counter for 30 seconds daily.'
    ],
    warningSigns: [
      'Sudden unsteadiness or frequent unexplained stumbles/falls.',
      'Rapid, unintended weight loss without dietary changes.',
      'Sudden confusion, disorientation, or memory changes.'
    ],
    sources: [
      { organization: 'National Institute on Aging (NIH)', title: 'Exercise and Physical Activity for Older Adults', year: '2023' },
      { organization: 'World Report on Ageing and Health (WHO)', title: 'Decade of Healthy Ageing', year: '2024' }
    ],
    tags: ['Aging', 'Mobility', 'Sarcopenia', 'Bone Density']
  },
  {
    id: 'medication-safety-interactions',
    title: 'Medication Literacy: Safe Storage, Discarding & Interaction Basics',
    category: 'Medication Education',
    readTime: '5 min read',
    summary: 'Essential rules for reading prescription labels, preventing accidental drug interactions, and safely organizing medications.',
    keyPoints: [
      'Always inform all your healthcare providers of every prescription, over-the-counter medicine, herbal supplement, and vitamin you take.',
      'Food, alcohol, and grapefruit juice can significantly alter the absorption and metabolic breakdown of common drugs.',
      'Bathrooms are typically poor storage environments due to high humidity and temperature fluctuations from showers.'
    ],
    detailedContent: [
      'Drug interactions occur when two or more substances react with each other, either amplifying toxicity or neutralizing therapeutic effects.',
      'Never share prescription medicines with friends or family; medications are tailored to individual weight, renal clearance, and diagnoses.',
      'Expired medications can degrade in potency and, in some cases (like certain liquid antibiotics), become chemically unstable or toxic.'
    ],
    practicalTips: [
      'Store medicines in a cool, dry cabinet away from direct sunlight and completely out of reach of children and pets.',
      'Keep an updated list of your current medications and dosages in your wallet or phone for medical visits and emergency responders.',
      'Use a pill organizer box if managing multiple daily medications to prevent accidental double-dosing.'
    ],
    warningSigns: [
      'Developing an unexplained skin rash, hives, or swelling shortly after starting a new medicine.',
      'Severe unexpected dizziness, nausea, or rapid heartbeat after taking a medication.',
      'Signs of an overdose or accidental ingestion of someone else’s medication (call Poison Control immediately).'
    ],
    sources: [
      { organization: 'FDA Consumer Health Information', title: 'Safe Medication Use', year: '2023' },
      { organization: 'Institute for Safe Medication Practices (ISMP)', title: 'Patient Safety Guidelines', year: '2024' }
    ],
    tags: ['Medication Safety', 'Pharmacy Tips', 'Drug Interactions']
  }
];
