/* THIS IS THE SINGLE SOURCE OF TRUTH FOR FORM METRICS IN THE APP */
export const METRICS = [
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
  { name: 'breathing_meds', label: 'Breathing meds', type: 'text', defaultValue: '', defaultValue: 0, form: 'rating', display: false },
  { name: 'focus_phrase', label: 'Focus phrase today', type: 'text', defaultValue: '', form: 'rating', display: true },
  { name: 'meds_changes', label: 'Meds changes', type: 'textarea', defaultValue: '', form: 'rating', display: true },

  /* JOURNAL FORM */
  // Checkboxes
  { name: 'meds', label: 'Took meds as prescribed', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'self_harm', label: 'Kept self safe', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'practiced_skills', label: 'Used one or more skills', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
 
  // Text area
  { name: 'skills', label: 'Skills I used today',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'homework', label: 'Homework',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'gratitude', label: 'Gratitude',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'tags', label: 'Tags',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
]

// Taken from METRICS
export const RATING_METRICS = [
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
  { name: 'breathing_meds', label: 'Breathing meds', type: 'text', defaultValue: '', defaultValue: 0, form: 'rating', display: false },
  { name: 'focus_phrase', label: 'Focus phrase today', type: 'text', defaultValue: '', form: 'rating', display: true },
  { name: 'meds_changes', label: 'Meds changes', type: 'textarea', defaultValue: '', form: 'rating', display: true },
]

// Taken from METRICS
export const JOURNAL_METRICS = [
  { name: 'meds', label: 'Took meds as prescribed', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'self_harm', label: 'Kept self safe', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
  { name: 'practiced_skills', label: 'Used one or more skills', type: 'checkbox', defaultValue: false, form: 'journal', display: true },
   { name: 'skills', label: 'Skills I used today',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'homework', label: 'Homework',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'gratitude', label: 'Gratitude',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
  { name: 'tags', label: 'Tags',  type: 'textarea', defaultValue: '', form: 'journal', display: true },
]

const getInitialState = (arr) => {
  const initialState = {}
  arr.forEach((e) => { 
    e.type === 'checkbox' ? initialState[e.name] = Boolean(e.defaultValue) 
    : initialState[e.name] = e.defaultValue 
  })
  return initialState;
}

export const INITIAL_STATE = getInitialState(METRICS)
export const INITIAL_RATING_STATE = getInitialState(RATING_METRICS)
export const INITIAL_JOURNAL_STATE = getInitialState(JOURNAL_METRICS)

const personalPropmts = [
  { name: 'did', label: 'Today I did...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'saw', label: 'Today I saw...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'learned', label: 'Today I learned...',  type: 'textarea', defaultValue: '', form: 'personal', display: false },
  { name: 'thought', label: 'Today I thought...',  type: 'textarea', defaultValue: '', form: 'personal', personal: true, display: false },
  { name: 'rest', label: 'Today I rested, by...',  type: 'textarea', defaultValue: '', form: 'personal', personal: true, display: false },
]



// arr.map(e => { return { 'name': e.name, 'label': e.label } }) 

// Filter by form type
// Available types are: number, text, textarea, checkbox
export const getInputsByType = (arr, type) => arr.filter(e => e.type === type)

// Filter by form type
// Available types are: journal, rating, personal
export const getInputsByForm = (arr, form) => arr.filter(e => e.form === form)

export const getFormTextinputs = (arr, form) => arr.filter(e => e.form === form).filter(e => e.type === 'text' || e.type === 'textbox')

export const getInputsByTypeAndForm = (arr, form, type) => console.log(arr, form, type)







/*
this db needs to have:
- id primary key NOT NULL, // make unique
  - the id will be the date, formatted by browser, plus a number representing which entry it is for the day
- type 
- data json
- category character varying (128),
- created_at (this one should be automatic. necessary?) 
- date (standardized how the browser does it. TODO: see if browser standards around date inputs are universal)
- time
- tags 
- homework
- skills
- skills_score
- links
- meta // add't information we might want to use later for searching & ID'ing columns, but don't necessarily have available right now. this should be limited to a few fields, although there's no schema, so it can take as many fields as you like, as long as they're formatted with json
*/

/* 
The "meta" db table will need: (IN PROGRESS)
- quotes json,
- books json,
- links json,
- fields json, // representing the "METRICS" data
- meta json // other/catch all
- date
  skills_to_practice TEXT,
weekly focus

*/


/* BRAINSTORMING ONLY BELOW. NOT CODE IN USE */
// CREATE TABLE IF NOT EXISTS dbt_prod (
//   id SERIAL PRIMARY KEY, 
//   type VARCHAR(128) NOT NULL,
//   date VARCHAR(128) NOT NULL, 
//   keywords TEXT, 
//   data json NOT NULL,
//   focus_phrase TEXT,
//   weekly_skills_focus TEXT, 
//   links TEXT,
//   meta json, 
//   other json
// );

//   - data json
// - category character varying (128),
// - created_at (this one should be automatic. necessary?) 
// - date (standardized how the browser does it. TODO: see if browser standards around date inputs are universal)
// - time
// - tags 
// - homework
// - skills
// - skills_score
// - links
// - meta // add't information we might want to use later for searching & ID'ing columns, but don't necessarily have available right now. this should be limited to a few fields, although there's no schema, so it can take as many fields as you like, as long as they're formatted with json
