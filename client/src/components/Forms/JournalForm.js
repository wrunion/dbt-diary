import React, { useState } from 'react'
import { Checkbox, Form, TextArea, Button, Header, Input } from 'semantic-ui-react'
import moment from 'moment'

const formattedDate = moment().format('YYYY-MM-DD');

const JournalForm = () => {

  const [meds, setMeds] = useState(false)
  const [harm, setHarm] = useState(false)
  const [usedSkills, setUsedSkills] = useState(false) // checkbox
  const [skills, setSkills] = useState('')
  const [homework, setHomework] = useState('')
  const [other, setOther] = useState('')
  const [gratitude, setGratitude] = useState('')
  // defaults to the current date, as formatted by moment above
  const [date, setDate] = useState(formattedDate)

  const myObj = {
    meds: 'meds_as_prescribed',
    harm: 'self_harm', 
    usedSkills: 'used_skills',
    homework: 'homework',
    skills: 'skills_used',
    other: 'other',
    gratitude: 'gratitude'
  }

  const handleSubmit = () => {
    // grab and format our data from state
    const vals= {
      "date": date,
      'meds_as_prescribed': meds,
      'self_harm': harm,
      'used_skills': skills, 
      'homework': homework,
      'other': other,
      'gratitude': gratitude, 
      'skills_used': usedSkills
    }

    const req = { 
      date: date,
      entry_type: 'journal', 
      entry: vals 
    }

  fetch('/dbt/entry/create', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(req)
    }).then(res => res.json()).then(json => {
      console.log(json)
      if (json.success === true) { 
        console.log(json)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    }) 
  }
  const inputs = [
    { name: 'meds_boolean', label: `Took meds as prescribed`, type: 'checkbox', required: false, defaultValue: false },
    { name: 'harm_boolean', label: `Didn't self harm`, type:'checkbox', required: true, defaultValue: false },
    { name: 'skills_boolean', label: 'Used one or more skills', type: 'textarea', required: false, defaultValue: false },
    { name: 'skills', label: 'Skills I used', type:'checkbox', required: false, defaultValue: '' },
    { name: 'homework', label: 'Homework', type: 'textarea', required: false, defaultValue: '' },
    { name: 'other', label: 'Other', type: 'textarea', required: false, defaultValue: '' },
    { name: 'gratitude', label: 'Gratitude', type: 'textarea', required: false, defaulValue: '' },
  ]
  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', }}>
    <Header as='h2'
      content='Journal' style={{ marginBottom: '1.5em'}}
      subheader='How was your day?' icon='moon' color='teal' />
    
    <Form onSubmit={() => handleSubmit()}>
      <Form.Field
        control={Checkbox}
        name='meds'
        label={{ children: 'Took meds as prescribed' }}
        onChange={() => setMeds(!meds)}
        value={meds}
      />
      <Form.Field
        control={Checkbox}
        name='harm'
        label={{ children: `Didn't self harm` }}
        onChange={() => setHarm(!harm)}
        value={harm}
        />
      <Form.Field
        control={Checkbox}
        name='harm'
        label={{ children: `Used one or more skills` }}
        onChange={() => setUsedSkills(!usedSkills)}
        value={usedSkills}
        />
      <Form.Field
        control={TextArea}
        name='skills'
        label={{ children: `Skills I used` }}
        onChange={(e) => setSkills(e.target.value)}
        value={skills}
        />
      <Form.Field
        control={TextArea}
        name='homework'
        rows={7}
        label={{ children: `Homework` }}
        onChange={(e) => setHomework(e.target.value)}
        value={homework}
        />
      <Form.Field
        control={TextArea}
        name='other'
        label={{ children: `Other` }}
        onChange={(e) => setOther(e.target.value)}
        value={other}
        />
      <Form.Field
        control={TextArea}
        name='gratitude'
        label={{ children: `Gratitude` }}
        onChange={(e) => setGratitude(e.target.value)}
        value={gratitude}
        />
      <Input type='date' fluid={true}
        className='date-input'
        name='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        />
      <Button color='teal' basic fluid={true} type='submit'>Submit</Button>
    </Form>
    </div>
  </>
  );
  }

export default JournalForm;