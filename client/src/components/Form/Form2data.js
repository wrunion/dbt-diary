export const INPUTS_BY_TYPE = {
  // "number": 
}


// from ./../data/metrics, just here for reference
const METRICS = [
  /* RATING FORM */
  { name: 'SI', label: 'SI', type:'number',  defaultValue: 0, form: 'rating', display: false },
  { name: 'self_harm_urge', label: 'Self harm urge', type:'number', defaultValue: 0, form: 'rating', display: false },
  { name: 'drug_urge', label: 'Drug urge', type:'number', defaultValue: 0, form: 'rating', display: false },
  { name: 'emotion_misery', label: 'Emotion misery', type:'number', defaultValue: 0, form: 'rating', display: true },
  { name: 'physical_misery', label: 'Physical misery',  type:'number', defaultValue: 0, form: 'rating', display: true },
  { name: 'joy', label: 'Joy',  type:'number', defaultValue: 0, form: 'rating', display: true },
  { name: 'calm', label: 'Calm',  type:'number', defaultValue: 0, form: 'rating', display: true }, 
  { name: 'gratitude', label: 'Gratitude',  type:'number', defaultValue: 0, form: 'rating', display: true },
  { name: 'intentionality', label: 'Intentionality',  type:'number', defaultValue: 0, form: 'rating', display: true },
  { name: 'skills_focus_week', label: 'Skills focus this week', type: 'text', defaultValue: '', form: 'rating', display: true },
  { name: 'breathing_meds', label: 'Breathing meds today', type: 'text', defaultValue: '', defaultValue: 0, form: 'rating', display: false },
  { name: 'focus_phrase', label: 'Focus phrase today', type: 'text', defaultValue: '', form: 'rating', display: true },

  /* JOURNAL FORM */
  // Checkboxes (journal form)
  { name: 'meds', label: 'Took meds as prescribed', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'safety', label: 'Kept self safe', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'practiced_skills', label: 'Used one or more skills', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
 
  // Text area (journal form)
  { name: 'meds_changes', label: 'Meds changes this week', type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'skills', label: 'Skills I used today',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'homework', label: 'Homework',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'gratitude', label: 'Gratitude',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'tags', label: 'Tags',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
]

const personalPropmts = [
  { name: 'did', label: 'Today I did...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'saw', label: 'Today I saw...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'learned', label: 'Today I learned...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'thought', label: 'Today I thought...',  type: 'textarea', defaultValue: '', form: 'personal', personal: true, display: false },
  { name: 'rest', label: 'Today I rested, by...',  type: 'textarea', defaultValue: '', form: 'personal', personal: true, display: false },
]


const vals= {
  "date": date,
  'meds_as_prescribed': meds,
  'self_harm': harm,
  'used_skills': skills, 
  'homework': homework,
  'other': other,
  'gratitude': gratitude, 
  'skills_used': usedSkills,
  'used_skills': skills
}

arr.map(e => { return { 'name': e.name, 'label': e.label } })

// Filter by form type
// Available types are: number, text, textarea, checkbox
export const getInputsByType = (arr, type) => arr.filter(e => e.type === type)

// Filter by form type
// Available types are: journal, rating, personal
export const getInputsByForm = (arr, form) => arr.filter(e => e.form === form)
