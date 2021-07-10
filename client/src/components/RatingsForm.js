/* Semantic UI React processes the data from 
* Dropdown components differently than most, 
* so this is a customized component for dealing with
* any and all Dropdown inputs.
*/

import React, { Component } from 'react'
import { Dropdown, Form, Button } from 'semantic-ui-react'
import { Dimmer, Header, Icon } from 'semantic-ui-react'
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
    clearable 
    selection
    name={name} // this is how we'll read the value on submit
    defaultValue={numberOptions[0].value}
    onChange={onChange}
    />
)

const DropdownDisplay = ({label, name, handleChange}) => {
  if (label && name && handleChange) {
  return(
    <Field>
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
const metrics = ['suicideUrge', 'selfHarmUrge', 'drugUrge', 'emotionalMisery', 'physicalMisery', 'joy', 'gratitude', 'calm', 'intentionality']

/* Generate initial state from metrics array */
const generateInitialState = (arr) => {
  const initialState = {} 
  arr.forEach((element) => initialState[element] = 0)
  return initialState;
}

class DailyForm extends Component {

  state = { 
    active: false 
  }

  componentDidMount() {
    const initState = generateInitialState(metrics)
    this.setState({ ...this.state, ...initState })
  }

  resetState() {
    const initState = generateInitialState(metrics)
    this.setState({ ...initState })
  }

  handleSubmit = () => {
    const vals = filterFormVals(this.state)

    fetch('api/day', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vals)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        // Shows dimmer message
        this.handleShow() 
        this.resetState();
      }
    }).catch(err => console.log(err))

  }

  handleChange = (event, data) => {
    const { name, value } = data
    this.setState({ [name]: value })
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { handleSubmit, handleChange } = this;
    const { active } = this.state;

  return (
    <Dimmable dimmed={active} style={{borderRadius: '5px'}}>

    <Form id="form" onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <DropdownDisplay label='Joy' name='joy'
          handleChange={handleChange} />
        <DropdownDisplay label='Emotional Misery'  name='emotionalMisery'
          handleChange={handleChange} />  
        <DropdownDisplay label='Physical Misery' name='physicalMisery'
          handleChange={handleChange} />  
      </Form.Group>
      <Form.Group widths='equal'>
        <DropdownDisplay label='Suicide Urge' name='suicideUrge'
          handleChange={handleChange} />
        <DropdownDisplay label='Self Harm Urge' name='selfHarmUrge'
          handleChange={handleChange} />  
        <DropdownDisplay label='Drug Urge' name='drugUrge'
          handleChange={handleChange} />  
      </Form.Group>
      <Form.Group widths='equal'>
        <DropdownDisplay label='Gratitude' name='gratitude'
          handleChange={handleChange} />
        <DropdownDisplay label='Calm' name='calm'
          handleChange={handleChange} />  
        <DropdownDisplay label='Intentionality' name='intentionality'
          handleChange={handleChange} />  
      </Form.Group>

      <Button type="submit" color='grey' basic fluid>Submit</Button>

      </Form>
      <Dimmer active={active} onClickOutside={this.handleHide}>
      <Header as='h2' icon inverted>
        <Icon name='heart' />
        Success! Nice work! 
        <Subheader>Be gentle with yourself today</Subheader>
      </Header>
      </Dimmer>
    </Dimmable>
    )
  }
}

export default DailyForm;
