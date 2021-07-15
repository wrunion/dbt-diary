import React, { useState } from 'react'
import { Checkbox, Form, TextArea, Button, Segment, Header, Input } from 'semantic-ui-react'
import Page from '../reusable/Page'
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

    // format the data as the server expects
    const req = { json: vals, type: 'journal' }

    fetch('api/day', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }).then(res => res.json()).then(json => {
      console.log(json)
      if (json.success === true) { 
        console.log(json)
        // TODO: Show dimmer message and reset state
        this.handleShow() 
        this.resetState();
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    }) 
  }

  return (
    <Page 
      title='Journal' 
      subtitle='How was your day?' icon='moon' color='teal'>

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
        {/* text fields */}
        {/* skills, homeworkA, homeworkB, other */}
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
      <Input type='date' fluid
        className='date-input'
        name='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        />
      <Button color='teal' basic fluid type='submit'>Submit</Button>
    </Form>
  </Page>
  );
  }

export default JournalForm;