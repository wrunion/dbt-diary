export const DAILY_RATING_INPUTS = [
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

export const DEMO_JOURNAL_FORM_INPUTS = [
  { name: 'meds_boolean', label: `Took meds`, type: 'checkbox', required: false, defaultValue: false },
  { name: 'skills_boolean', label: 'Used one or more skills', type: 'checkbox', required: false, defaultValue: false },
  { name: 'safety_boolean', label: 'Kept self safe', type: 'checkbox', required: false, defaultValue: false },
  { name: 'thinking', label: 'Right now I am thinking...', type:'textarea', required: false, defaultValue: '' },
  { name: 'feeling', label: 'Right now I am feeling...', type:'textarea', required: false, defaultValue: '' },
  { name: 'gratitude', label: 'I am grateful for', type: 'text', required: false, defaulValue: '' },
  { name: 'proud', label: 'I am proud of myself for', type: 'text', required: false, defaulValue: '' },

  // { name: 'good_things', label: 'Something good that happened today...', type:'textarea', required: false, defaultValue: '' },
  { name: 'skills', label: 'Skills I used today / Homework', type:'textarea', required: false, defaultValue: '' },
  { name: 'mindfulness', label: 'Self care / mindfulness', type:'text', required: false, defaultValue: '' },
  { name: 'other', label: 'Anything else?', type: 'text', required: false, defaultValue: '' },
  // { name: 'tags', label: 'Tags', type: 'text', required: false, defaultValue: '' },
  { name: 'date', type: 'date', required: false }
]

export const PERSONAL_FORM_INPUTS = [
  { name: 'focus', label: 'What is today about?', type: 'text', required: true },
  { name: 'tarot', label: 'What do the cards have to say?', type: 'textarea', required: false },
  { name: 'journal', label: 'Right now I am thinking/feeling...', type:'textarea', required: true },
  { name: 'gratitude', label: `What are you grateful for?`, type: 'text', required: true },
  { name: 'moon_phase', label: `Moon Phase`, type: 'text', required: true },
  { name: 'self_care', label: `Today I took care of myself by`, type: 'textarea', required: false },
  { name: 'other', label: `Anything else?`, type: 'textarea', required: false }
]

export const DEMO_METRICS = [
  /* Numeric fields */
{ id: 1, name: 'suicide_ideation', label: 'Suicide Ideation', type:'number' },
{ id: 2, name: 'self_harm_urge', label: 'Self harm urge', type:'number' },
{ id: 3, name: 'drug_urge', label: 'Drug urge', type:'number' },
{ id: 4, name: 'emotion_misery', label: 'Emotion misery', type:'number' },
{ id: 5, name: 'physical_misery', label: 'Physical misery',  type:'number' },
{ id: 6, name: 'joy', label: 'Joy',  type:'number' },
// { id: 7, name: 'anxiety', label: 'Anxiety',  type:'number' },
{ id: 8, name: 'mood', label: 'Mood',  type:'number' },
// { id: 8, name: 'sleep_quality', label: 'Sleep Quality',  type:'number' },
{ id: 9, name: 'racing_thoughts', label: 'Racing thoughts',  type:'number' },
/* Text/textarea fields */
{ id: 10, name: 'skills_focus_week', label: 'Skills focus this week', type: 'text' },

{ id: 7, name: 'self_care', label: 'Today I will take care of myself by...', type: 'textarea' },
// { id: 16, name: 'highs_and_lows', label: `Highs and lows of today`,  type: 'textarea' },
{ id: 16, name: 'gratitude', label: `Today I'm grateful for...`,  type: 'textarea' },
{ id: 12, name: 'sleep_notes', label: 'Sleep notes', type: 'text' },
{ id: 11, name: 'meds_notes', label: 'Meds notes', type: 'text' },
// { id: 11, name: 'other_notes', label: 'Anything else?', type: 'text' },

{ name: 'date', type: 'date', required: false }

// { id: 12, name: 'focus_phrase', label: 'Focus phrase today', type: 'text' },

// { id: 14, name: 'skills', label: 'Skills used today',  type: 'textarea' },
// { id: 15, name: 'homework', label: 'Homework',  type: 'textarea' },
/* OPTIONAL journal prompts */
]