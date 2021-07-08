/* Semantic UI React processes the data from 
* Dropdown components differently than most, 
* so this is a customized component for dealing with
* any and all Dropdown inputs.
*/

import React, { Component } from 'react'
import { Dropdown, Form, Button } from 'semantic-ui-react'
import { Dimmer, Header, Icon, Segment } from 'semantic-ui-react'
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

/* Each of these is a field. Add here */
const metrics = ['suicideUrge', 'selfHarmUrge', 'drugUrge', 'emotionalMisery', 'physicalMisery', 'joy', 'gratitude', 'calm', 'intentionality']
const formVals = {} 
metrics.forEach((metric) => formVals[metric] = 0)

class DailyForm extends Component {

  state = { 
    ...formVals,
    active: false 
  }

  handleSubmit = () => {
    const timeStamp = Date.now();
    const formVals = { ...this.state, timeStamp: timeStamp}
    console.log('formVals', formVals)
    this.handleShow()
    // reset to initial form state on submit
    // this.state = formVals
  }

  handleChange = (event, data) => {
    const { name, value } = data
    this.setState({ [name]: value })
  }

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { handleSubmit, handleChange } = this;

  return (
    <Dimmable dimmed={this.state.active} style={{borderRadius: '5px'}}>

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
      <Dimmer active={this.state.active} onClickOutside={this.handleHide}>
      <Header as='h2' icon inverted>
        <Icon name='heart' />
        Nice Work! 
        <Subheader>Be gentle with yourself today</Subheader>
      </Header>
      </Dimmer>
    </Dimmable>
    )
  }
}

export default DailyForm;
