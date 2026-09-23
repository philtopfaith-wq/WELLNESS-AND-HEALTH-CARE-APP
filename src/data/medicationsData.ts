import { Medication } from '../types';

export const MEDICATIONS_DATA: Medication[] = [
  {
    id: 'paracetamol',
    genericName: 'Paracetamol (Acetaminophen)',
    brandNames: ['Tylenol', 'Panadol', 'Calpol', 'Mapap'],
    category: 'Analgesics & Antipyretics',
    drugClass: 'Non-opioid analgesic',
    commonUses: ['Mild to moderate pain relief', 'Headache & toothache', 'Fever reduction', 'Musculoskeletal pain'],
    mechanismOfAction: 'Acts primarily in the central nervous system to inhibit prostaglandin synthesis and modulate cannabinoid/serotonergic pain pathways.',
    commonSideEffects: ['Generally well-tolerated at normal doses', 'Mild nausea (rare)', 'Rash or allergic itching (rare)'],
    seriousWarningSigns: ['Severe liver toxicity from overdose', 'Jaundice (yellowing of skin or eyes)', 'Dark urine', 'Severe upper right abdominal pain'],
    generalPrecautions: [
      'Do not exceed 4,000 mg in 24 hours (lower limits for older adults or chronic illness)',
      'Check all combination cold and flu remedies to avoid accidental duplicate dosing',
      'Use with caution in chronic alcohol use or preexisting liver disease'
    ],
    interactions: ['Alcohol (increases hepatotoxicity risk)', 'Warfarin (prolonged high-dose paracetamol can increase bleeding risk)', 'Isoniazid'],
    storageInfo: 'Store at controlled room temperature (20°C–25°C / 68°F–77°F) away from excess moisture and direct heat.',
    administration: 'Can be taken with or without food. Drink with a full glass of water.',
    specialPopulations: {
      pregnancy: 'Widely considered the first-choice pain reliever in pregnancy when used at the lowest effective dose for the shortest duration under clinical guidance.',
      pediatric: 'Pediatric dosing must be calculated strictly by weight (kg), never by adult estimates.',
      elderly: 'Consider lower maximum daily limit (e.g., 2,000–3,000 mg) especially with decreased liver/renal function.'
    },
    sources: [
      { name: 'WHO Model Formulary / Essential Medicines List', versionDate: '2023 Revision' },
      { name: 'US FDA Drug Label Database', versionDate: '2024' }
    ]
  },
  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Nurofen', 'Brufen'],
    category: 'NSAIDs (Anti-inflammatory)',
    drugClass: 'Non-steroidal anti-inflammatory drug (NSAID)',
    commonUses: ['Inflammatory pain', 'Arthritis and joint swelling', 'Menstrual cramps (dysmenorrhea)', 'Headache and fever'],
    mechanismOfAction: 'Non-selectively inhibits cyclooxygenase enzymes (COX-1 and COX-2), reducing the synthesis of inflammatory prostaglandins.',
    commonSideEffects: ['Stomach upset or heartburn', 'Mild nausea', 'Dizziness', 'Fluid retention'],
    seriousWarningSigns: ['Gastrointestinal ulceration or black tarry stools', 'Chest pain or shortness of breath', 'Sudden ankle swelling', 'Kidney impairment signs'],
    generalPrecautions: [
      'Always take with food or milk to reduce gastric irritation',
      'Avoid if you have active stomach ulcers, uncontrolled hypertension, or advanced kidney disease',
      'Do not combine with other NSAIDs (e.g., naproxen, aspirin)'
    ],
    interactions: ['Blood thinners (warfarin, apixaban)', 'ACE inhibitors and diuretics', 'Lithium', 'Oral corticosteroids'],
    storageInfo: 'Store between 15°C and 30°C (59°F–86°F) in a tightly closed container protected from light.',
    administration: 'Take with or immediately after a meal or snack with a full glass of water. Do not lie down immediately after taking.',
    specialPopulations: {
      pregnancy: 'Contraindicated during the third trimester due to risk of premature closure of ductus arteriosus and low amniotic fluid. Consult doctor.',
      pediatric: 'Approved for infants over 6 months with weight-based dosing. Never give to dehydrated children without medical advice.',
      elderly: 'Higher risk of renal failure, cardiovascular events, and gastrointestinal bleeding. Use lowest dose for shortest time.'
    },
    sources: [
      { name: 'British National Formulary (BNF)', versionDate: '2024' },
      { name: 'FDA Medication Guides', versionDate: '2023' }
    ]
  },
  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Trimox', 'Moxatag'],
    category: 'Antibiotics',
    drugClass: 'Beta-lactam / Penicillin antibiotic',
    commonUses: ['Bacterial respiratory infections', 'Streptococcal pharyngitis', 'Bacterial ear and sinus infections', 'Skin & urinary tract bacterial infections'],
    mechanismOfAction: 'Binds to penicillin-binding proteins in bacterial cell walls, inhibiting cell wall synthesis and causing bacterial cell lysis.',
    commonSideEffects: ['Diarrhea', 'Mild nausea', 'Abdominal cramping', 'Mild non-allergic skin rash'],
    seriousWarningSigns: ['Anaphylaxis (swelling of face, lips, tongue, or difficulty breathing)', 'Severe watery diarrhea with fever (C. difficile infection)', 'Severe blistering rash (Stevens-Johnson syndrome)'],
    generalPrecautions: [
      'Complete the full course prescribed by your physician even if feeling better sooner',
      'Does NOT treat viral infections (common cold, flu, viral sore throats)',
      'Confirm allergy status before taking; notify doctor of any prior penicillin reactions'
    ],
    interactions: ['Allopurinol (increased rash risk)', 'Methotrexate', 'Oral contraceptives (progestin/estrogen absorption may be altered with diarrhea)'],
    storageInfo: 'Oral tablets/capsules: room temperature. Reconstituted liquid suspension: preferably refrigerated (discard after 14 days).',
    administration: 'Can be taken with or without food. Taking with food helps reduce stomach discomfort.',
    specialPopulations: {
      pregnancy: 'Category B. Generally considered acceptable when medically indicated; consult OB/GYN.',
      pediatric: 'Commonly prescribed for pediatric bacterial infections; dosing must follow precise pediatric guidelines.',
      elderly: 'Dose adjustment may be required if renal function (creatinine clearance) is diminished.'
    },
    sources: [
      { name: 'CDC Antibiotic Prescribing and Use', versionDate: '2024' },
      { name: 'WHO Essential Medicines Guidelines', versionDate: '2023' }
    ]
  },
  {
    id: 'metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet', 'Glumetza'],
    category: 'Antidiabetics',
    drugClass: 'Biguanide',
    commonUses: ['Type 2 diabetes mellitus glycemic management', 'Insulin resistance management', 'Polycystic ovary syndrome (PCOS) guidance under endocrinologist care'],
    mechanismOfAction: 'Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake.',
    commonSideEffects: ['Nausea and vomiting', 'Diarrhea and loose stools', 'Abdominal bloating and flatulence', 'Metallic taste'],
    seriousWarningSigns: ['Lactic acidosis (deep rapid breathing, severe fatigue, muscle aches, hypothermia)', 'Severe hypoglycemia when combined with other diabetic drugs'],
    generalPrecautions: [
      'Take with meals to minimize gastrointestinal discomfort',
      'Temporary discontinuation required prior to contrast dye radiologic procedures',
      'Requires periodic monitoring of kidney function (eGFR) and vitamin B12 levels'
    ],
    interactions: ['Iodinated radiocontrast agents', 'Alcohol (amplifies lactic acidosis risk)', 'Cimetidine', 'Certain diuretics'],
    storageInfo: 'Store at 20°C–25°C (68°F–77°F). Protect from moisture and light.',
    administration: 'Take with food. Extended-release (XR) formulations must be swallowed whole without crushing or chewing.',
    specialPopulations: {
      pregnancy: 'Sometimes used under specialist supervision; insulin remains the gold standard in many guidelines. Consult doctor.',
      pediatric: 'Approved for children 10 years and older with type 2 diabetes under specialist care.',
      elderly: 'Careful renal monitoring required; contraindicated in severe renal impairment.'
    },
    sources: [
      { name: 'American Diabetes Association (ADA) Standards of Care', versionDate: '2024' },
      { name: 'FDA Package Insert', versionDate: '2023' }
    ]
  },
  {
    id: 'amlodipine',
    genericName: 'Amlodipine',
    brandNames: ['Norvasc', 'Amlor', 'Istin'],
    category: 'Antihypertensives & Cardiac',
    drugClass: 'Dihydropyridine Calcium Channel Blocker (CCB)',
    commonUses: ['Hypertension (high blood pressure)', 'Chronic stable angina', 'Vasospastic angina'],
    mechanismOfAction: 'Inhibits calcium ion influx across vascular smooth muscle and cardiac muscle, resulting in arterial vasodilation and decreased peripheral resistance.',
    commonSideEffects: ['Peripheral edema (swelling in ankles/feet)', 'Flushing or feeling warm', 'Dizziness when standing up', 'Headache', 'Fatigue'],
    seriousWarningSigns: ['Severe hypotension / fainting', 'Worsening angina upon initiation or dose increase', 'Rapid or irregular heartbeat'],
    generalPrecautions: [
      'Do not abruptly stop taking without consulting your physician',
      'Monitor blood pressure regularly at home',
      'Rise slowly from sitting or lying down to prevent lightheadedness'
    ],
    interactions: ['Simvastatin (amlodipine increases simvastatin exposure; dose cap recommended)', 'CYP3A4 inhibitors (ketoconazole, clarithromycin)', 'Diltiazem'],
    storageInfo: 'Store between 15°C and 30°C (59°F–86°F). Keep in original container.',
    administration: 'Take once daily at the same time each day, with or without food.',
    specialPopulations: {
      pregnancy: 'Use only if potential benefit justifies potential risk to fetus. Alternative antihypertensives often preferred.',
      pediatric: 'Approved for pediatric hypertension in children 6 years and older under pediatric cardiology guidance.',
      elderly: 'Lower starting doses often recommended due to decreased clearance.'
    },
    sources: [
      { name: 'ACC/AHA High Blood Pressure Guidelines', versionDate: '2023' },
      { name: 'National Institute for Health and Care Excellence (NICE)', versionDate: '2024' }
    ]
  },
  {
    id: 'omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec', 'Omez'],
    category: 'Gastrointestinal',
    drugClass: 'Proton Pump Inhibitor (PPI)',
    commonUses: ['Gastroesophageal reflux disease (GERD)', 'Erosive esophagitis', 'Gastric and duodenal ulcers', 'H. pylori eradication (in combination regimens)'],
    mechanismOfAction: 'Irreversibly inhibits the hydrogen-potassium ATPase pump system in gastric parietal cells, significantly decreasing gastric acid secretion.',
    commonSideEffects: ['Headache', 'Abdominal pain', 'Constipation or diarrhea', 'Flatulence', 'Nausea'],
    seriousWarningSigns: ['Clostridioides difficile-associated diarrhea', 'Bone fractures with prolonged high-dose use', 'Hypomagnesemia', 'Vitamin B12 deficiency'],
    generalPrecautions: [
      'Best taken 30 to 60 minutes before breakfast on an empty stomach',
      'Intended for short-term courses (4–8 weeks) unless extended by a physician',
      'Do not chew or crush delayed-release capsules or tablets'
    ],
    interactions: ['Clopidogrel (may reduce antiplatelet efficacy)', 'Methotrexate', 'Iron supplements (decreased absorption)', 'Diazepam'],
    storageInfo: 'Store at 15°C–30°C (59°F–86°F) protected from light and moisture.',
    administration: 'Take once daily in the morning before eating. Swallow whole with water.',
    specialPopulations: {
      pregnancy: 'Epidemiological studies indicate low risk, but consultation with physician is necessary before use.',
      pediatric: 'Prescribed only under specialist guidance for specific pediatric reflux conditions.',
      elderly: 'Increased risk of hip/spine fractures and nutrient deficiencies with extended use.'
    },
    sources: [
      { name: 'American College of Gastroenterology (ACG)', versionDate: '2023' },
      { name: 'FDA Drug Safety Communications', versionDate: '2024' }
    ]
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandNames: ['Ventolin', 'ProAir', 'Proventil'],
    category: 'Respiratory & Asthma',
    drugClass: 'Short-acting Beta-2 Adrenergic Agonist (SABA)',
    commonUses: ['Acute relief of bronchospasm in asthma and COPD', 'Exercise-induced bronchospasm prevention'],
    mechanismOfAction: 'Stimulates beta-2 receptors in airway smooth muscle, activating adenylate cyclase and leading to rapid bronchodilation.',
    commonSideEffects: ['Tremor or shakiness in hands', 'Rapid heartbeat (tachycardia)', 'Nervousness or jitteriness', 'Mild headache'],
    seriousWarningSigns: ['Paradoxical bronchospasm (sudden airway narrowing after use)', 'Severe chest pain', 'Cardiac arrhythmias', 'Hypokalemia at excessive doses'],
    generalPrecautions: [
      'This is a "rescue inhaler" for acute relief, not a daily anti-inflammatory controller',
      'Using a rescue inhaler more than twice a week usually indicates poor asthma control requiring doctor visit',
      'Always keep inhaler accessible and check expiration and dose counter'
    ],
    interactions: ['Beta-blockers (antagonize bronchodilatory effects)', 'MAO inhibitors', 'Diuretics (additive potassium-lowering risk)'],
    storageInfo: 'Store upright at 15°C–25°C. Do not puncture canister or expose to open flame.',
    administration: 'Inhale through mouth as directed. Rinse mouth with water after use. Use a spacer chamber if recommended by provider.',
    specialPopulations: {
      pregnancy: 'Considered standard rescue therapy during pregnancy because controlled asthma is critical for maternal and fetal oxygenation.',
      pediatric: 'Safe for children using appropriate spacer and pediatric face mask under physician supervision.',
      elderly: 'Monitor cardiovascular parameters (heart rate, blood pressure) carefully.'
    },
    sources: [
      { name: 'Global Initiative for Asthma (GINA)', versionDate: '2024' },
      { name: 'British Thoracic Society Guidelines', versionDate: '2023' }
    ]
  },
  {
    id: 'atorvastatin',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor', 'Atorva', 'Lipivas'],
    category: 'Cardiovascular & Lipids',
    drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
    commonUses: ['Hypercholesterolemia (elevated LDL cholesterol)', 'Cardiovascular disease prevention', 'Post-myocardial infarction risk reduction'],
    mechanismOfAction: 'Inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol biosynthesis, increasing hepatic LDL receptors and LDL clearance.',
    commonSideEffects: ['Mild muscle or joint aches', 'Digestive upset (nausea, mild diarrhea)', 'Transient elevation in liver enzymes'],
    seriousWarningSigns: ['Rhabdomyolysis (unexplained severe muscle pain, weakness, and tea-colored urine)', 'Severe jaundice or liver injury signs'],
    generalPrecautions: [
      'Report unexplained persistent muscle pain or weakness promptly',
      'Avoid drinking large quantities of grapefruit juice (CYP3A4 inhibition)',
      'Periodic lipid panels and liver function tests recommended'
    ],
    interactions: ['Grapefruit juice in large amounts', 'Clarithromycin and erythromycin', 'Cyclosporine', 'Gemfibrozil'],
    storageInfo: 'Store at 20°C–25°C (68°F–77°F).',
    administration: 'Take once daily at any time of day, with or without food, consistently.',
    specialPopulations: {
      pregnancy: 'Contraindicated during pregnancy and breastfeeding. Discontinue immediately if pregnancy is suspected.',
      pediatric: 'Used in specific familial hypercholesterolemia cases under specialist pediatric cardiology care.',
      elderly: 'Monitor muscle symptoms closely; consider starting with lower dose regimens.'
    },
    sources: [
      { name: 'AHA/ACC Cholesterol Clinical Guidelines', versionDate: '2023' },
      { name: 'European Society of Cardiology (ESC)', versionDate: '2024' }
    ]
  },
  {
    id: 'artemether-lumefantrine',
    genericName: 'Artemether / Lumefantrine',
    brandNames: ['Coartem', 'Lonart', 'Riamet'],
    category: 'Antimalarials',
    drugClass: 'Artemisinin-based Combination Therapy (ACT)',
    commonUses: ['Treatment of acute uncomplicated Plasmodium falciparum malaria'],
    mechanismOfAction: 'Artemether rapidly clears the majority of malaria parasites; lumefantrine provides long-acting clearance of residual parasites.',
    commonSideEffects: ['Loss of appetite', 'Nausea and vomiting', 'Headache', 'Dizziness', 'Sleep disturbance'],
    seriousWarningSigns: ['QT interval prolongation on ECG', 'Severe allergic hypersensitivity', 'Recurrent high fever or signs of severe cerebral malaria'],
    generalPrecautions: [
      'Take with food or fatty drinks (such as milk) to ensure adequate absorption',
      'Complete the full 6-dose 3-day treatment regimen to prevent treatment failure and parasite resistance',
      'Not for malaria prevention/prophylaxis, only for treatment of confirmed or diagnosed acute malaria'
    ],
    interactions: ['Drugs that prolong QT interval (erythromycin, antiarrhythmics)', 'CYP3A4 inducers (rifampin, St. John’s wort)'],
    storageInfo: 'Store below 30°C (86°F) in a dry place protected from direct sunlight.',
    administration: 'Strict 6-dose schedule over 3 days. Take with food or full-fat milk.',
    specialPopulations: {
      pregnancy: 'Recommended by WHO for uncomplicated malaria in 2nd and 3rd trimesters; in 1st trimester use when no suitable alternative is available under medical advice.',
      pediatric: 'Standard weight-dosed therapy in malaria-endemic regions under clinical oversight.',
      elderly: 'Monitor cardiac history and electrolyte levels before and during therapy.'
    },
    sources: [
      { name: 'WHO Guidelines for Malaria', versionDate: '2023' },
      { name: 'CDC Yellow Book / Malaria Treatment Tables', versionDate: '2024' }
    ]
  },
  {
    id: 'cetirizine',
    genericName: 'Cetirizine',
    brandNames: ['Zyrtec', 'Piriteze', 'Alleroff'],
    category: 'Antihistamines & Allergy',
    drugClass: 'Second-generation H1 receptor antagonist',
    commonUses: ['Allergic rhinitis (hay fever)', 'Chronic idiopathic urticaria (hives)', 'Allergic conjunctivitis / itchy watery eyes'],
    mechanismOfAction: 'Selectively blocks peripheral histamine H1 receptors, inhibiting histamine-mediated allergic inflammatory responses.',
    commonSideEffects: ['Mild drowsiness in some individuals', 'Dry mouth', 'Fatigue', 'Dizziness'],
    seriousWarningSigns: ['Severe allergic reaction (rare)', 'Urinary retention (in predisposed individuals)', 'Extreme somnolence'],
    generalPrecautions: [
      'Less sedating than first-generation antihistamines, but caution advised when driving',
      'Avoid alcohol consumption as it can compound sedative effects',
      'Adjust dose in moderate to severe kidney dysfunction'
    ],
    interactions: ['Central nervous system depressants', 'Alcohol', 'Theophylline (minor clearance reduction)'],
    storageInfo: 'Store at 20°C–25°C in original container.',
    administration: 'Take once daily with or without food. Drink with water.',
    specialPopulations: {
      pregnancy: 'Widely used in pregnancy under physician recommendation when antihistamine therapy is necessary.',
      pediatric: 'Available in syrup formulations for children 2 years and older with pediatric dosing.',
      elderly: 'Start at lower end of dosing scale if renal function is reduced.'
    },
    sources: [
      { name: 'American Academy of Allergy, Asthma & Immunology (AAAAI)', versionDate: '2023' },
      { name: 'FDA Label Information', versionDate: '2024' }
    ]
  }
];
