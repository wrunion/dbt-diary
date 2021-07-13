export const METRICS = [
  /* Numeric fields */
  { id: 1, name: 'SI', label: 'SI', type:'number' },
  { id: 2, name: 'self_harm_urge', label: 'Self harm urge', type:'number' },
  { id: 3, name: 'drug_urge', label: 'Drug urge', type:'number' },
  { id: 4, name: 'emotion_misery', label: 'Emotion misery', type:'number' },
  { id: 5, name: 'physical_misery', label: 'Physical misery',  type:'number' },
  { id: 6, name: 'joy', label: 'Joy',  type:'number' },
  { id: 7, name: 'calm', label: 'Calm',  type:'number' },
  { id: 8, name: 'gratitude', label: 'Gratitude',  type:'number' },
  { id: 9, name: 'intentionality', label: 'Intentionality',  type:'number' },
  /* Text/textarea fields */
  { id: 10, name: 'skills_focus_week', label: 'Skills focus this week', type: 'text' },
  { id: 11, name: 'meds_changes', label: 'Meds changes this week', type: 'text' },
  { id: 13, name: 'breathing_meds', label: 'Breathing meds today', type: 'text' },
  { id: 12, name: 'focus_phrase', label: 'Focus phrase today', type: 'text' },
  { id: 14, name: 'skills', label: 'Skills used today',  type: 'textarea' },
  { id: 15, name: 'homework', label: 'Homework',  type: 'textarea' },
  { id: 16, name: 'gratitude', label: 'Gratitude',  type: 'textarea' },
  /* OPTIONAL journal prompts */
  { id: 25, name: 'did', label: 'Today I did...',  type: 'textarea', journal: 'true' },
  { id: 26, name: 'saw', label: 'Today I saw...',  type: 'textarea', journal: 'true' },
  { id: 27, name: 'learned', label: 'Today I learned...',  type: 'textarea', journal: 'true'  },
  { id: 28, name: 'thought', label: 'Today I thought...',  type: 'textarea', journal: 'true'  },
  { id: 29, name: 'rest', label: 'Today I rested, by...',  type: 'textarea', journal: 'true'  },
]

export const JOURNAL_PROMPTS = []