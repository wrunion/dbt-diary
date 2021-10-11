export const DAILY_RATING_INPUTS = [
  { name: 'hope', label: 'Hope', type:'number', required: true },
  { name: 'emotional_misery', label: 'Emotional Misery', type: 'number', required: false },
  { name: 'physical_misery', label: 'Physical Misery', type:'number', required: false },
  { name: 'joy', label: 'Joy', type:'number', required: false },
  { name: 'anxiety', label: 'Anxiety', type:'number', required: false },
  { name: 'mood', label: 'Mood', type:'number', required: false },
  { name: 'sleep', label: 'Sleep quality', type:'number', required: false },
  { name: 'racing_thoughts', label: 'Racing Thoughts', type:'number', required: false },
  { name: 'sleep_notes', label: 'Sleep Notes', type:'text', required: false },
  { name: 'meds_notes', label: 'Meds Notes', type:'text', required: false },
  { name: 'self_care', label: 'Today I will take care of myself by...', type:'textarea', required: false },
  { name: 'notes', label: 'Other', type:'text', required: false },
  { name: 'date', label: '', type: 'date', required: false }
]

export const JOURNAL_FORM_INPUTS = [
  { name: 'meds_boolean', label: `Took meds as prescribed`, type: 'checkbox', required: false, defaultValue: false },
  { name: 'skills_boolean', label: 'Used one or more skills', type: 'checkbox', required: false, defaultValue: false },
  { name: 'inhaler_boolean', label: 'Used inhaler on schedule', type: 'checkbox', required: false, defaultValue: false },
  { name: 'concerta_boolean', label: 'Took Concerta', type: 'checkbox', required: false, defaultValue: false },
  { name: 'skills', label: 'Skills I used', type:'textarea', required: false, defaultValue: '' },
  { name: 'homework', label: 'Homework', type: 'textarea', required: false, defaultValue: '' },
  { name: 'other', label: 'Other', type: 'textarea', required: false, defaultValue: '' },
  { name: 'gratitude', label: 'Gratitude', type: 'textarea', required: false, defaulValue: '' },
  { name: 'tags', label: 'Tags', type: 'text', required: false, defaultValue: '' },
  { name: 'date', type: 'date', required: false }
]