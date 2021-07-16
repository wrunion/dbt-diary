/* Semantic UI React processes the data from 
* Dropdown components differently than most, 
* so this is a customized component for dealing with
* any and all Dropdown inputs.
*/

import React, { Component } from 'react'
import { Dropdown, Form, Button, TextArea, Input,  Dimmer, Header, Icon, Label  } from 'semantic-ui-react'
import moment from 'moment'
import Page from '../reusable/Page'

const { Subheader } = Header
const { Dimmable } = Dimmer
const { Field } = Form

const numberOptions = [
  { key: 0, text: '0', value: 0 },
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
]

const CustomNumberDropdown = ({ name, onChange }) => (
  <Dropdown options={numberOptions}
    selection
    scrolling
    name={name} // this is how we'll read the value on submit
    defaultValue={numberOptions[0].value}
    onChange={onChange}
    style={{ width: '100px' }}
    />
)

const DropdownDisplay = ({label, name, handleChange}) => {
  if (label && name && handleChange) {
  return(
    <Field style={{ margin: '20px' }}>
      <label style={{ color: '#5a5a5a', paddingBottom: '.5em' }}>{label}</label>
      <CustomNumberDropdown name={name} onChange={handleChange} />
    </Field>
  ) } else {
    return null;
  }
}

/* 
 * Helper function to get rid of local state vals
 * before sending form data
*/
const filterFormVals = (obj) => {
  let returnObj = {}
  for (const el in obj) {
    if (el !== 'active') {
    returnObj[el] = obj[el]
    }
  }
  return(returnObj)
}

/* Each of these is a dropdown form field. Add here */
const numberLabels = ['SI', 'self_harm_urge', 'drug_urge', 'emotional_misery', 'physical_misery', 'joy', 'gratitude', 'calm', 'intentionality', 'racing_thoughts', 'skills_score']

const textLabels = ['notes', 'focus_phrase', 'skills_focus']

// Used to map 'name' values to text display strings
// to label input fields
const inputLabels = {
  'joy': 'Joy',
  'emotional_misery': 'Emotional Misery',
  'physical_misery': 'Physical Misery',
  'SI': 'SI',
  'self_harm_urge': 'Self harm urge',
  'drug_urge': 'Drug urge',
  'gratitude': 'Gratitude',
  'calm': 'Calm',
  'intentionality': 'Intentionality', 
  'racing_thoughts': 'Racing Thoughts', 
  'skills_score': 'Skills Score',
  'notes': 'Notes', 
  'focus_phrase': 'Focus Phrase'
}  

/* Generate initial state from label arrays */
// numbers default to 0
const generateInitialNumberState = (arr) => {
  const initialState = {} 
  arr.forEach((element) => initialState[element] = '0')
  return initialState;
}

// text inputs default to ''
const generateInitialTextState = (arr) => {
  const initialState = {} 
  arr.forEach((element) => initialState[element] = '')
  return initialState;
}

// combines the two functions above to return initial state
const generateInitialState = (numArr, textArr) => {
  const inititalNumberState = generateInitialNumberState(numArr)
  const inititalTextState = generateInitialTextState(textArr)
  return {...inititalNumberState, ...inititalTextState}
}

class DailyForm extends Component {

  state = { 
    active: false 
  }

  componentDidMount() {
    const initState = generateInitialState(numberLabels, textLabels)
    // today's date, in the format accepted by the browser
    const formattedDate = moment().format('YYYY-MM-DD');
    this.setState({ ...this.state, ...initState, date: formattedDate })
  }

  resetState() {
    const initState = generateInitialState(numberLabels, textLabels)
    const formattedDate = moment().format('YYYY-MM-DD');
    this.setState({ ...initState, date: formattedDate })
  }

  handleSubmit = () => {
    /* set a default date if user hasn't picked one */
    if (!this.state.date) {
      const formattedDate = moment().format('YYYY-MM-DD');
      this.setState()
    } 

    const vals = filterFormVals(this.state)
    // format the data as the server expects
    const req = { json: vals, type: 'ratings' }

    fetch('api/day', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
        // Shows dimmer message and resets state
        this.handleShow() 
        this.resetState();
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    }) 
  }

  handleChange = (event, data) => {
    const { name, value } = data
    this.setState({ [name]: value })
  }

  handleTextChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value})
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { handleSubmit, handleChange, handleTextChange } = this;
    const { active } = this.state;

  return (
    <Dimmable dimmed={active} style={{borderRadius: '5px'}}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <Header as='h2'
        content='Daily DBT' 
        subheader='Rate your day from 0 to 5' icon='calendar outline' color='teal' textAlign='left'
        style={{ margin: '.5em 0 1.5em 2em', alignSelf: 'center' }}
        />

    <Form id="form" onSubmit={handleSubmit}>

      <div style={{display: 'flex', flexWrap: 'wrap', 
        justifyContent: 'center' }}>
        {numberLabels.map((e, i) =>  
          <DropdownDisplay key={i} label={inputLabels[e]} name={e}
            handleChange={handleChange} />
          )}
      </div>

      <Form.Field
        control={TextArea}
        name='notes'
        rows={7}
        style={{ width: '90%' }}
        label={{ children: `Notes` }}
        onChange={handleTextChange}
        />

      <Field style={{ margin: '5px', width: '90%', paddingBottom: '10px', margin: '0 auto' }}>      
        <Input 
          type='text'
          name='focus_phrase'
          size='small'
          label={<Label basic pointing='right' color='grey'>Focus phrase today: </Label>}
          onChange={handleTextChange}
        />
      </Field>
      <Field style={{ margin: '5px', width: '90%', margin: '0 auto'  }}>      
        <Input 
          type='text'
          name='skills_focus'
          size='small'
          label={<Label basic pointing='right' color='grey'>Skills focus this week: </Label>}
          onChange={handleTextChange}
        />
      </Field>
      <Input type='date' fluid
        className='date-input'
        name='date'
        style={{ width: '90%', margin: '0 auto', marginBottom: '1.5em', marginTop: '1.5em' }}
        defaultValue={this.state.date}
        onChange={handleChange}
        />
  
        <Button 
          style={{ width: '90%', margin: '0 auto' }}
          type="submit" color='teal' basic fluid>Submit</Button>
      </Form>
      
  
      <Dimmer active={active} onClickOutside={this.handleHide}>
      <Header as='h2' icon inverted>
        <Icon name='heart' />
        Success! Nice work! 
        <Subheader>Be gentle with yourself today</Subheader>
      </Header>
      </Dimmer>
      </div>
    </Dimmable>
    )
  }
}

export default DailyForm;
   