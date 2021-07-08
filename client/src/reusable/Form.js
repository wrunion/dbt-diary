import React, { Component } from 'react'
import { Dropdown, Form, Input, Button } from 'semantic-ui-react'

const { Field } = Form;

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
      <label>{label}</label>
      <CustomNumberDropdown name={name} onChange={handleChange} />
    </Field>
  ) } else {
    return null;
  }
}

// const RatingsDropdown = ({ label, name }) => {
//   {(label && name) && (
//     <Field inline>
//       <label> {label || ''} </label>
//       <CustomNumberDropdown 
//         name={name} />
//     </Field>
//   )
// }}

const metrics = ['suicideUrge', 'selfHarmUrge', 'drugUrge', 'emotionalMisery', 'physicalMisery', 'joy']
const formVals = {} 
metrics.forEach((metric) => formVals[metric] = 0)

class DailyForm extends Component {

  state = { 
    ...formVals 
  }

  handleSubmit = () => {
    console.log('submit', this.state)
    // reset to initial form state on submit
    // this.state = formVals
  }

  handleChange = (event, data) => {
    const { name, value } = data
    this.setState({ [name]: value })
  }

  render() {
    const { handleSubmit, handleChange } = this
    console.log('state at runtime', this.state)


    // ['suicideUrge', 'selfHarmUrge', 'drugUrge', 'emotionalMisery', 'physicalMisery', 'joy']
  return (
    <Form id="form" onSubmit={handleSubmit}>
      <Form.Group widths='equal' inline>
        <DropdownDisplay label='Joy' name='joy'
          handleChange={handleChange} />
        <DropdownDisplay label='Emotional Misery'  name='emotionalMisery'
          handleChange={handleChange} />  
        <DropdownDisplay label='Physical Misery' name='physicalMisery'
          handleChange={handleChange} />  
      </Form.Group>
      <Form.Group widths='equal' inline>
        <DropdownDisplay label='Suicide Urge' name='suicideUrge'
          handleChange={handleChange} />
        <DropdownDisplay label='Self Harm Urge' name='selfHarmUrge'
          handleChange={handleChange} />  
        <DropdownDisplay label='Drug Urge' name='drugUrge'
          handleChange={handleChange} />  
      </Form.Group>



      <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default DailyForm;

