import React from 'react'
import Page from '../reusable/Page'
import { Form, Label, Divider, Input, Button, Header, TextArea, Icon } from 'semantic-ui-react'
import './DailyForm.css'
const { Field } = Form

const testStyle = {
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'flex-start',
}

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

const DailyForm = (fields) => {

  const metrics = fields.metrics.filter(e => !e.journal)
  const journalPrompts = fields.metrics.filter(e => e.journal)

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
            {metrics.filter(e => e.type === 'number').map(e => 
              <NumberInput item={e} />
            )}
          </div>

          <Divider />
          {/* text inputs  */}
          <Header as='h2' icon='edit' color='teal'
            content='Skills Practice' 
            subheader='What are you learning?' />
          <div style={testStyle}>
            {metrics.filter(e => e.type === 'text' || e.type === 'textarea').map(e => 
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
            {journalPrompts && journalPrompts.filter(e => e.type === 'textarea').map(e => 
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