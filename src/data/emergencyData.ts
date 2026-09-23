export interface EmergencyContact {
  region: string;
  generalEmergency: string;
  ambulance?: string;
  police?: string;
  fire?: string;
  crisisHelpline?: string;
  notes?: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    region: 'United States & Canada',
    generalEmergency: '911',
    ambulance: '911',
    crisisHelpline: '988 (Suicide & Crisis Lifeline - Call or Text 24/7)',
    notes: 'Poison Help National Hotline: 1-800-222-1222'
  },
  {
    region: 'United Kingdom',
    generalEmergency: '999 or 112',
    ambulance: '999',
    crisisHelpline: '111 (NHS Non-Emergency) / 116 123 (Samaritans Free 24/7)',
    notes: 'Text SHOUT to 85258 for 24/7 crisis text support'
  },
  {
    region: 'European Union',
    generalEmergency: '112',
    ambulance: '112',
    crisisHelpline: '116 123 (Emotional Support Hotline)',
    notes: '112 is accessible free of charge anywhere across the EU'
  },
  {
    region: 'Nigeria',
    generalEmergency: '112',
    ambulance: '112 or 767 (Lagos State Emergency)',
    police: '112',
    crisisHelpline: '0800 800 2000 (Mental Health Support Line)',
    notes: 'NEMA (National Emergency Management Agency): 0800 2255 6362'
  },
  {
    region: 'Australia',
    generalEmergency: '000',
    ambulance: '000',
    crisisHelpline: '13 11 14 (Lifeline Australia)',
    notes: '1300 22 4636 (Beyond Blue Support)'
  },
  {
    region: 'India',
    generalEmergency: '112',
    ambulance: '102 / 108',
    crisisHelpline: '14416 (Tele-MANAS National Mental Health Line)',
    notes: 'Disaster Management Services: 1070'
  },
  {
    region: 'South Africa',
    generalEmergency: '112 (mobile) or 10111',
    ambulance: '10177',
    crisisHelpline: '0800 567 567 (SADAG Mental Health Helpline)',
    notes: 'Poison Information Centre: 0861 555 777'
  }
];

export const RED_FLAG_SIGNS = [
  {
    title: 'Severe Chest Discomfort or Pressure',
    description: 'Crushing pressure, tightness, squeezing, or aching in the center of the chest radiating to the left arm, shoulder, neck, jaw, or back, often accompanied by cold sweats or dizziness.',
    action: 'Call emergency services immediately. Sit down, keep calm, and do not attempt to drive yourself.'
  },
  {
    title: 'Stroke Symptoms (The F.A.S.T. Protocol)',
    description: 'F - Face Drooping (one side uneven or numb) | A - Arm Weakness (one arm drifts downward when raised) | S - Speech Difficulty (slurred or nonsensical words) | T - Time to call emergency services.',
    action: 'Note the exact time symptoms started and call emergency services immediately.'
  },
  {
    title: 'Severe Shortness of Breath or Air Hunger',
    description: 'Inability to speak in full sentences without gasping, severe audible wheezing, blue-tinged lips, tongue, or fingertips, or sudden feeling of suffocation.',
    action: 'Seek emergency hospital care immediately; use prescribed rescue inhaler if diagnosed with asthma.'
  },
  {
    title: 'Anaphylaxis (Severe Allergic Reaction)',
    description: 'Swelling of the throat, lips, tongue, or face, difficulty swallowing, hives, dizziness, or vomiting rapidly developing after exposure to a food, insect sting, or medication.',
    action: 'Administer emergency epinephrine auto-injector (EpiPen) into outer thigh if available, and call emergency services immediately.'
  },
  {
    title: 'Sudden Loss of Consciousness or Unresponsiveness',
    description: 'Fainting with delayed awakening, sudden collapse, or seizures lasting longer than 5 minutes or occurring in someone without a known seizure disorder.',
    action: 'Turn patient into recovery position on their side if breathing; call emergency services immediately.'
  },
  {
    title: 'Uncontrollable Bleeding or Traumatic Injury',
    description: 'Pulsing or rapid spurting arterial blood that does not slow down with firm, continuous direct pressure over a sterile cloth or dressing.',
    action: 'Apply firm, continuous manual pressure directly to the wound and call emergency immediately.'
  },
  {
    title: 'Acute Mental Health Crisis / Thoughts of Self-Harm',
    description: 'Experiencing severe emotional despair, feeling unsafe with oneself, or experiencing intrusive thoughts of self-harm or suicide.',
    action: 'Connect with emergency help right away: Call or text 988 (USA/Canada), 111/116 123 (UK), 112 (EU/Nigeria), or contact a trusted person immediately.'
  }
];

export const FIRST_AID_BASICS = [
  {
    situation: 'Choking (Conscious Adult or Child >1 Year)',
    steps: [
      'Encourage coughing if the person can still make sounds or breathe.',
      'If unable to speak, breathe, or cough, stand behind them and lean them slightly forward.',
      'Deliver up to 5 sharp back blows between the shoulder blades with the heel of your hand.',
      'If back blows fail, perform up to 5 abdominal thrusts (Heimlich maneuver): place a fist above the navel and pull inward and upward sharply.',
      'Alternate 5 back blows and 5 abdominal thrusts until object is expelled or call emergency if unresponsive.'
    ]
  },
  {
    situation: 'Recovery Position (Unconscious but Breathing Normally)',
    steps: [
      'Kneel beside the person and ensure their airway is clear.',
      'Place their arm nearest to you at a right angle to their body with elbow bent and palm up.',
      'Bring their other hand across their chest, holding the back of their hand against their nearest cheek.',
      'Pull up their far knee so their foot is flat on the ground.',
      'Gently roll the person towards you onto their side by pulling on the bent knee.',
      'Tilt their head back gently to keep airway open and monitor breathing continuously until help arrives.'
    ]
  },
  {
    situation: 'Burns & Scalds',
    steps: [
      'Immediately remove the heat source.',
      'Cool the burn under gentle, running cool tap water for at least 20 minutes.',
      'Do NOT apply ice, iced water, butter, oil, or toothpaste to the burn.',
      'Remove jewelry or tight clothing near the burn area before swelling begins (unless stuck to the skin).',
      'Cover loosely with clean plastic cling wrap or a sterile non-adherent dressing and seek medical review.'
    ]
  }
];
