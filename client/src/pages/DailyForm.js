// declare form vals 
// make them into a form 
import React from 'react'
import Page from './../reusable/Page'
// import { Segment, Form } from 'semantic-ui-react'
import { Form, Label, Segment, Input, Button, Header, TextArea, Icon } from 'semantic-ui-react'
const { Field } = Form

// number input label mapping 
const inputLabels = {
  'SI': 'SI',
  'self_harm_urge': 'Self harm urge',
  'drug_urge': 'Drug urge',
  'emotion_misery': 'Emotion misery',
  'physical_misery': 'Physical misery',
  'joy': 'Joy',
  'calm': 'Calm',
  'gratitude': 'Gratitude',
  'intentionality': 'Intentionality',
}  

// text input mapping, OLD 
const myObj = {
  meds: 'meds_as_prescribed',
  harm: 'self_harm', 
  usedSkills: 'used_skills',
  homework: 'homework',
  skills: 'skills',
  other: 'other',
  gratitude: 'gratitude'
}

const METRICS = [
  /* Numeric fields */
  { id: 1, name: 'SI', label: 'SI', type:'number' },
  { id: 2, name: 'self_harm_urge', label: 'Self harm urge', type:'number' },
  { id: 3, name: 'drug_urge', label: 'Drug urge', type:'number' },
  { id: 4, name: 'emotion_misery', label: 'Emotion misery', type:'number' },
  { id: 5, name: 'physical_misery', label: 'Physical misery',  type:'number' },
  { id: 6, name: 'joy', label: 'Joy',  type:'number' },
  { id: 7, name: 'calm', label: 'Joy',  type:'number' },
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
]

const journalPrompts = [
  { id: 25, name: 'did', label: 'Today I did...',  type: 'textarea' },
  { id: 26, name: 'saw', label: 'Today I saw...',  type: 'textarea' },
  { id: 27, name: 'learned', label: 'Today I learned...',  type: 'textarea' },
  { id: 28, name: 'thought', label: 'Today I thought...',  type: 'textarea' },
  { id: 29, name: 'rest', label: 'Today I rested, by...',  type: 'textarea' },
]

const DailyForm = () => {

  return(
    <div>
      <Page title='Daily DBT' subtitle='Rate your day from 0 to 5' icon='sun' color='teal'>
        {/* <Segment> */}
          <Form />
        {/* </Segment> */}

      </Page>


    </div>
  )
}

export default DailyForm