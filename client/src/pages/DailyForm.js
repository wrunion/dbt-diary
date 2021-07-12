import React from 'react'
import Page from './../reusable/Page'
import { Form, Label, Divider, Segment, Input, Button, Header, TextArea, Icon } from 'semantic-ui-react'
import './DailyForm.css'
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

const testStyle = {
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'flex-start',
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
      <Label basic color='teal' pointing='right'>{label}</Label>
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

const TextInput = ({ item }) => {
  const { id, name, label } = item;

  return( 
    <>
    <Field key={id} style={{ margin: '5px', width: '100%' }}>      
    {/* <Label basic color='teal' pointing='down'>{label}</Label> */}
      <Input 
        type='text'
        name={name}
        size='small'
        label={<Label basic pointing='right' color='grey'>{label}</Label>}
        // style={{ width: '75px', margin: '1em' }}
        // value={formVals[name]}
        // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
      />
    </Field>
    </>
  )
}

const TextAreaInput = ({ item }) => {
  const { id, name, label } = item;

  return( 
    <>
    <div key={id} className='daily-form-input' style={{ margin: '5px', fontWeight: 'bold', width: '100%' }}>

      <label>{label} <Icon name='write' color='grey' /></label>
      <TextArea 
        rows='5'
        name={name}
        style={{ marginTop: '7px' }}
        // value={formVals[name]}
        // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
      />
    </div>
    </>
  )
}


const TextAreaJournalInput = ({ item }) => {
  const { id, name, label } = item;

  return( 
    <>
    <div key={id} className='daily-form-input' style={{ margin: '5px', fontWeight: 'bold', width: '100%' }}>

      <label> <Icon name='moon outline' color='teal' />{label}</label>
      <TextArea 
        rows='5'
        name={name}
        style={{ marginTop: '7px' }}
        // value={formVals[name]}
        // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
      />
    </div>
    </>
  )
}

const DailyForm = () => {

  return(
    <div id='DailyForm'>
      <div>
        <Form>
          {/* number inputs  */}
          <Header as='h2' color='grey' icon='calendar outline'
            content='Daily DBT' 
            subheader='Rate your day from 0 to 5' />
          <Input type='date' 
            className='date-input'
            name='date' fluid />
          <div style={testStyle}>
            {METRICS.filter(e => e.type === 'number').map(e => 
              <NumberInput item={e} />
            )}
          </div>

          <Divider />
          {/* text inputs  */}
          <Header as='h2' icon='edit' color='teal'
            content='Skills Practice' 
            subheader='What are you learning?' />
          <div style={testStyle}>
            {METRICS.filter(e => e.type === 'text' || e.type === 'textarea').map(e => 
              e.type === 'text' ? 
              <TextInput item={e} /> :
              e.type === 'textarea' ? 
              <TextAreaInput item={e} /> :
              null
            )}
          </div>
        </Form>
      </div>

      {/* optional add't journal prompts  */}
      <Divider />
      <Page 
        title='Journal' 
        subtitle='How was your day?' icon='moon' color='teal'>
        <Form>
          <div className='test' style={testStyle}>
            {journalPrompts.filter(e => e.type === 'textarea').map(e => 
             <TextAreaJournalInput item={e} />
            )}
          </div>
        </Form>
      </Page>

      <div className='button-div'>
        <Button size='large' color='teal' fluid>
          Submit
        </Button>
      </div>

    </div>
  )
}

export default DailyForm