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
]

const journalPrompts = [
  { id: 25, name: 'did', label: 'Today I did...',  type: 'textarea' },
  { id: 26, name: 'saw', label: 'Today I saw...',  type: 'textarea' },
  { id: 27, name: 'learned', label: 'Today I learned...',  type: 'textarea' },
  { id: 28, name: 'thought', label: 'Today I thought...',  type: 'textarea' },
  { id: 29, name: 'rest', label: 'Today I rested, by...',  type: 'textarea' },
]

const NumberInput = ({ item }) => {
  const { id, name, label } = item;

  return( 
    <>
    <div key={id} style={{ margin: '5px' }}>
      <Label color='teal' basic
        pointing='right'>
          {label}
        </Label>
      <Input 
        type='number'
        min='0'
        max='5'
        name={name}
        style={{ width: '75px', margin: '1em' }}
        // value={formVals[name]}
        // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
      />
    </div>
    </>
  )
}

const FancyNumberInput = (item) => {
  const { id, name, itemLabel } = item;

  return( 
    <Field key={id} 
      style={{ margin: '12px', padding: '1.5em' }}>
    {/* <label><Icon name='sort' /> {label}</label> */}
      <Label color='teal' basic
        pointing='right'>
          {itemLabel}
        </Label>
      <Input 
        // inline
        // label={label}
        // placeholder='0'
        // type={type}
        //
        type='text'
        // min='0'
        // max='5'
        name={name}
        style={{ width: '75px', margin: '1em' }}
        // value={formVals[name]}
        // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
      />
    </Field>
  )
}

const DailyForm = () => {

  return(
    <div>
      <Page title='Daily DBT' subtitle='Rate your day from 0 to 5' icon='sun' color='teal'>

      <Form>
        <div className='test' style={{display: 'flex', flexWrap: 'wrap', 
          justifyContent: 'flex-start' }}>
          {METRICS.filter(e => e.type === 'number').map(e => 
            <NumberInput item={e} />
          )}
        </div>
        {/* <div style={{display: 'flex', flexWrap: 'wrap', 
          justifyContent: 'center' }}> */}
      </Form>
      </Page>
    </div>
  )
}

export default DailyForm