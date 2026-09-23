import { SymptomInfoItem } from '../types';

export const SYMPTOMS_DATA: SymptomInfoItem[] = [
  {
    id: 'headache',
    name: 'Headache',
    bodySystem: 'Head & Neurological',
    description: 'Pain, throbbing, or aching pressure in any region of the head, ranging from dull tension bands to unilateral pulsing sensations. This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Tension-type headache (muscle contraction in neck and scalp, stress, fatigue)',
      'Migraine (neurological vascular cascade, often with light/sound sensitivity or aura)',
      'Dehydration or missed meals (hypoglycemia)',
      'Eye strain from prolonged screen exposure or uncorrected vision',
      'Sinus pressure from seasonal allergies or common upper respiratory infection'
    ],
    lessCommonCauses: [
      'Medication overuse headache (rebound headache from frequent analgesics)',
      'Cervicogenic headache (cervical spine issues)',
      'Temporomandibular joint (TMJ) dysfunction',
      'Hypertension (blood pressure spikes)',
      'Temporal arteritis (in older adults)'
    ],
    generalSelfCare: [
      'Rest in a quiet, dark room with cool or warm compress applied to forehead or back of neck',
      'Hydrate with water or electrolyte fluids if dehydration is suspected',
      'Practice gentle neck and shoulder stretches',
      'Take appropriate over-the-counter pain relief as directed on packaging, if suitable for you'
    ],
    routineDoctorVisitSigns: [
      'Headaches occurring more than 2–3 times weekly',
      'Headaches steadily increasing in frequency or intensity over weeks',
      'Current over-the-counter medications are no longer effective'
    ],
    urgentCareWarningSigns: [
      'Headache accompanied by persistent fever, stiff neck, and sensitivity to light',
      'Headache following a recent head injury or sports concussion'
    ],
    emergencyRedFlags: [
      'Sudden onset "thunderclap" headache reaching maximum excruciating intensity within seconds',
      'Headache accompanied by facial drooping, weakness on one side of the body, or slurred speech (stroke signs)',
      'Headache accompanied by confusion, high fever, or loss of consciousness'
    ]
  },
  {
    id: 'fever',
    name: 'Fever (Elevated Body Temperature)',
    bodySystem: 'Systemic',
    description: 'A temporary rise in core body temperature, typically above 38.0°C (100.4°F), representing an active immune response to foreign pathogens or inflammation. This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Viral infections (influenza, common cold, COVID-19, gastroenteritis)',
      'Bacterial infections (strep throat, urinary tract infection, ear infection)',
      'Post-vaccination immune response (usually mild, lasting 24–48 hours)',
      'Heat exhaustion from prolonged high ambient temperatures and insufficient fluid intake'
    ],
    lessCommonCauses: [
      'Autoimmune conditions (lupus, rheumatoid arthritis flare)',
      'Drug reactions or medication fever',
      'Endocrine conditions (thyroid crisis)',
      'Tropical or regional infections (e.g., malaria, dengue, typhoid in endemic areas)'
    ],
    generalSelfCare: [
      'Drink plenty of fluids (water, oral rehydration solutions, clear broths) to replace evaporative fluid loss',
      'Rest in a cool, well-ventilated room with lightweight clothing and light blankets',
      'Avoid cold ice baths (which cause shivering and paradoxically elevate core temperature); use lukewarm sponging if needed',
      'Over-the-counter antipyretics (paracetamol or ibuprofen) may be used for comfort if appropriate'
    ],
    routineDoctorVisitSigns: [
      'Fever lasting longer than 3 consecutive days in adults without a clear resolving cause',
      'Fever that resolves for 2 days and then abruptly returns with worsening symptoms'
    ],
    urgentCareWarningSigns: [
      'Fever accompanied by productive cough with discolored phlegm or sharp chest pain on breathing',
      'Fever with painful or burning urination and lower back flank pain'
    ],
    emergencyRedFlags: [
      'Fever in infants under 3 months of age (requires immediate pediatric emergency triage)',
      'Fever accompanied by stiff neck, inability to touch chin to chest, confusion, or a non-blanching dark purple rash (meningitis signs)',
      'Fever accompanied by severe shortness of breath or inability to stay awake'
    ]
  },
  {
    id: 'cough',
    name: 'Cough (Acute or Persistent)',
    bodySystem: 'Respiratory',
    description: 'A rapid expulsion of air from the lungs to clear the respiratory tract of foreign particles, mucus, or irritants. This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Upper respiratory viral infections (common cold, viral bronchitis)',
      'Post-nasal drip from allergic rhinitis or sinusitis',
      'Asthma or reactive airway irritation (often nocturnal or triggered by exercise/cold air)',
      'Gastroesophageal reflux disease (GERD - stomach acid triggering airway cough reflex)',
      'Environmental irritants (tobacco smoke, cooking smoke, dust, pollution)'
    ],
    lessCommonCauses: [
      'ACE-inhibitor medication side effect (dry tickling persistent cough)',
      'Bacterial pneumonia or pertussis (whooping cough)',
      'Chronic Obstructive Pulmonary Disease (COPD)',
      'Bronchiectasis or interstitial lung disease'
    ],
    generalSelfCare: [
      'Stay well hydrated to thin mucus secretions',
      'Inhale warm steam from a hot shower or use a cool-mist room humidifier',
      'Sip warm water with honey and lemon (note: never give honey to infants under 1 year of age)',
      'Elevate the head with an extra pillow during sleep to reduce nighttime post-nasal pooling'
    ],
    routineDoctorVisitSigns: [
      'Cough persisting longer than 3 to 4 weeks (chronic cough)',
      'Cough consistently accompanied by nighttime acid reflux or heartburn',
      'Cough interfering significantly with sleep or work'
    ],
    urgentCareWarningSigns: [
      'Coughing with high fever, chills, and localized sharp chest pain when inhaling deeply',
      'Noticeable wheezing or whistling sound during breathing'
    ],
    emergencyRedFlags: [
      'Coughing up significant amounts of blood or pink frothy sputum',
      'Severe breathlessness, inability to speak in full sentences, or blue-tinted lips/fingernails',
      'Rapidly worsening stridor (harsh high-pitched sound) or feeling of choking'
    ]
  },
  {
    id: 'fatigue',
    name: 'Persistent Fatigue & Low Energy',
    bodySystem: 'Systemic',
    description: 'An overwhelming feeling of physical, emotional, or cognitive exhaustion that is not relieved by standard sleep or rest. This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Sleep deprivation or poor sleep architecture (frequent nighttime awakenings)',
      'Chronic psychosocial stress, burnout, or emotional strain',
      'Nutritional deficiencies (iron deficiency anemia, vitamin B12, or vitamin D insufficiency)',
      'Sedentary lifestyle and deconditioning',
      'Mild dehydration or poor dietary caloric/macronutrient balance'
    ],
    lessCommonCauses: [
      'Thyroid dysfunction (hypothyroidism)',
      'Obstructive sleep apnea (often with morning headaches or snoring)',
      'Diabetes mellitus or metabolic dysregulation',
      'Chronic infections (Epstein-Barr virus, post-viral fatigue syndrome)',
      'Autoimmune disorders or chronic kidney/liver conditions'
    ],
    generalSelfCare: [
      'Establish a regular 7–9 hour sleep schedule with a quiet, screen-free pre-bed routine',
      'Prioritize balanced meals containing complex carbohydrates, lean protein, and healthy fats',
      'Engage in 20–30 minutes of gentle daylight walking to stimulate circadian alertness',
      'Maintain steady hydration throughout the working day'
    ],
    routineDoctorVisitSigns: [
      'Fatigue lasting more than 2–3 weeks with no obvious lifestyle explanation',
      'Fatigue accompanied by unexplained weight loss or weight gain',
      'Fatigue accompanied by heavy menstrual periods or pale skin'
    ],
    urgentCareWarningSigns: [
      'Fatigue accompanied by swollen lymph nodes in neck, armpits, or groin',
      'Fatigue accompanied by persistent low-grade fevers or night sweats'
    ],
    emergencyRedFlags: [
      'Fatigue accompanied by sudden chest pain, profound shortness of breath, or fainting',
      'Profound muscle weakness making it impossible to walk or stand',
      'Sudden cognitive confusion or disorientation'
    ]
  },
  {
    id: 'abdominal-pain',
    name: 'Abdominal Pain & Cramping',
    bodySystem: 'Digestive',
    description: 'Discomfort, cramping, aching, or sharp sensations felt anywhere between the ribs and the pelvis. This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Gas buildup, indigestion (dyspepsia), or constipation',
      'Gastroenteritis (stomach virus or food poisoning)',
      'Menstrual cramps (dysmenorrhea) or ovulation pain (mittelschmerz)',
      'Irritable Bowel Syndrome (IBS) or dietary food intolerances (lactose, gluten)',
      'Gastritis or gastroesophageal reflux'
    ],
    lessCommonCauses: [
      'Appendicitis (classically begins around navel, migrating to right lower quadrant)',
      'Gallstones (cholecystitis - right upper quadrant pain after fatty meals)',
      'Kidney stones (flank pain radiating down towards the groin)',
      'Peptic ulcer disease',
      'Gynecological causes (ovarian cysts, pelvic inflammatory disease, ectopic pregnancy)'
    ],
    generalSelfCare: [
      'Apply a warm heating pad or warm water bottle to the lower abdomen',
      'Sip clear fluids like peppermint or ginger herbal tea; avoid greasy or spicy foods',
      'Eat small, light meals (e.g., bananas, rice, applesauce, toast - BRAT diet) if recovering from upset stomach',
      'Avoid taking NSAIDs (ibuprofen, aspirin) for stomach pain, as they can irritate the gastric lining'
    ],
    routineDoctorVisitSigns: [
      'Recurrent abdominal cramping associated with changes in bowel habits lasting weeks',
      'Unexplained loss of appetite or involuntary weight loss',
      'Mild persistent pain that comes and goes after eating certain foods'
    ],
    urgentCareWarningSigns: [
      'Abdominal pain accompanied by yellowing of the skin or eyes (jaundice)',
      'Inability to keep liquids down for 24 hours due to persistent vomiting',
      'Pain accompanied by blood in bowel movements (red blood or black tarry stools)'
    ],
    emergencyRedFlags: [
      'Severe, sudden, excruciating abdominal pain or rigid "board-like" abdominal wall',
      'Severe localized right lower quadrant pain with fever and vomiting (possible appendicitis)',
      'Sudden severe lower abdominal pain in a woman of reproductive age with missed period (possible ectopic pregnancy)',
      'Abdominal pain accompanied by dizziness, clammy skin, or fainting (internal bleeding)'
    ]
  },
  {
    id: 'dizziness',
    name: 'Dizziness & Lightheadedness',
    bodySystem: 'Head & Neurological',
    description: 'Sensations of feeling faint, lightheaded, unsteady, or experiencing a spinning sensation (vertigo). This symptom can have several possible causes.',
    commonPossibleCauses: [
      'Orthostatic hypotension (brief blood pressure drop when standing up quickly)',
      'Dehydration or prolonged fasting (low blood sugar)',
      'Benign Paroxysmal Positional Vertigo (BPPV - inner ear crystal displacement)',
      'Viral inner ear infection (labyrinthitis or vestibular neuritis)',
      'Anxiety or hyperventilation'
    ],
    lessCommonCauses: [
      'Medication side effect (especially blood pressure lowering agents)',
      'Cardiac arrhythmia (irregular heart rhythm causing fluctuating cerebral perfusion)',
      'Severe anemia (reduced oxygen-carrying capacity)',
      'Ménière’s disease (vertigo, tinnitus, hearing changes)'
    ],
    generalSelfCare: [
      'Sit or lie down immediately upon feeling lightheaded to prevent fall injury',
      'Drink a glass of water slowly and rest quietly',
      'Transition slowly from lying to sitting, and from sitting to standing (allow 30 seconds at each stage)',
      'Ensure room is well-lit and avoid sudden rapid head turns if experiencing spinning'
    ],
    routineDoctorVisitSigns: [
      'Frequent episodes of lightheadedness when standing up',
      'Persistent unsteadiness lasting several days without other acute signs',
      'Dizziness that began shortly after starting a new prescription medication'
    ],
    urgentCareWarningSigns: [
      'Vertigo accompanied by new ringing in ears or hearing loss in one ear',
      'Dizziness accompanied by persistent vomiting and inability to walk'
    ],
    emergencyRedFlags: [
      'Dizziness accompanied by sudden numbness, facial droop, or inability to speak clearly (stroke warning)',
      'Dizziness accompanied by chest pain, palpitations, or fainting (loss of consciousness)',
      'Dizziness following a traumatic blow to the head'
    ]
  }
];
