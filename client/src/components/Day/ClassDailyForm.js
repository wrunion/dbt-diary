import React, { Component } from 'react'
import Page from '../reusable/Page'
import { METRICS, INITIAL_STATE } from './../../data/metrics.js'

import { Form, Label, Divider, Input, Button, Header, TextArea, Icon, Dimmer } from 'semantic-ui-react'

import './DailyForm.css'

const { Dimmable } = Dimmer
const { Field } = Form

const testStyle = {
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'flex-start',
}

const metrics = METRICS.filter(e => !e.journal)
const journalPrompts = METRICS.filter(e => e.journal)

class DailyForm extends Component {

  state = {
    ...INITIAL_STATE,
    active: false,
  }


  NumberInput = ({ item }) => {
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

  TextInput = ({ item }) => {
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

  TextAreaInput = ({ item }) => {
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


  TextAreaJournalInput = ({ item }) => {
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
          // onChange={(e) => handleChange(name, e.target.input)}
          // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
          // onChange={(e) => console.log({ [name]: e.target.value })}
        />
      </div>
      </>
    )
  }


  handleChange = (e) => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value})
  }

  // for dropdown ?
  // handleChange = (event, data) => {
  //   const { name, value } = data
  //   this.setState({ [name]: value })
  // }

  resetState() {
    this.setState({ active: false, ...INITIAL_STATE })
  }
  
  handleSubmit() {
    console.log('submit')
  }

  // for dimmer
  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { handleChange, handleSubmit, NumberInput, TextInput, TextAreaInput, TextAreaJournalInput } = this;
  return(
    <div id='DailyForm'>
      <div>
        {/* <Form onSubmit={handleSubmit}> */}
        <Form action='/form' method='POST'>
          {/* number inputs  */}
          <Header as='h2' color='grey' icon='calendar outline'
            content='Daily DBT' 
            subheader='Rate your day from 0 to 5' />
          <Input type='date' 
            className='date-input'
            name='date' fluid />
          <div style={testStyle}>
            {metrics.filter(e => e.type === 'number').map(e => 
              <NumberInput item={e} handleChange={handleChange} />
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
              <TextInput item={e} handleChange={handleChange} /> :
              e.type === 'textarea' ? 
              <TextAreaInput item={e} handleChange={handleChange} /> :
              null
            )}
          </div>

          <div className='button-div'>
            <Button size='large' color='teal' fluid>
              Submit Daily DBT
            </Button>
          </div>
        </Form>
      </div>

      {/* optional add't journal prompts  */}
      <Divider />
      <Page 
        title='Journal' 
        subtitle='How was your day?' icon='moon' color='teal'>
        <Form onSubmit={handleSubmit}>
          <div className='test' style={testStyle}>
            {journalPrompts && journalPrompts.filter(e => e.type === 'textarea').map(e => 
             <TextAreaJournalInput item={e} handleChange={handleChange} />
            )}
          </div>
          <div className='button-div'>
            <Button size='large' color='teal' fluid>
              Submit Journal Entry
            </Button>
          </div>
        </Form>
      </Page>



    </div>
  )}
}

export default DailyForm