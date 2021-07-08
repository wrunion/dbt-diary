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

const CustomNumberDropdown = ({ name, setFormVals }) => (
    <Dropdown options={numberOptions}
      clearable 
      selection
      name={name} // this is how we'll read the value on submit
      defaultValue={numberOptions[0].value}
      onChange={(e) => setFormVals({ name: e.target.value })}
      />
)

// const RatingsDropdown = ({ label, name }) => {
//   {(label && name) && (
//     <Field inline>
//       <label> {label || ''} </label>
//       <CustomNumberDropdown 
//         name={name} />
//     </Field>
//   )
// }}



class DailyForm extends Component {
  state = {
    formVals: {
      joy: 0, 
      selfHarm: 0,
      controlEating: 0,
      lashOutAtPartner: 0, 
      racingThoughts: 0,
      sleepAverageHours: 0,
      emotionMisery: 0, 
      physicalMisery: 0,
      medsAsPrescribed: true,
      selfHarm: false,
      usedSkills: true, 
      medChanges: '',
      skillsUsed: [],
      homework: '',
      other: ''
    }
  }

  handleSubmit = () => {
    console.log(this.state.formVals)
  }

  handleDropdownChange = (event, data) => {
    const { name, value } = data
    
    console.log(name, value)
    this.setState({ [name]: value })
  }

  render() {
    const { handleSubmit, handleDropdownChange } = this
    console.log(this.state)

  return (
    <Form id="form" onSubmit={handleSubmit}>
      {/* <RatingsDropdown name="self_harm" label="Self harm" /> */}
      {/* <CustomNumberDropdown name="selfHarm" setFormVals={setFormVals} /> */}

      <Dropdown options={numberOptions}
        clearable 
        selection
        name='joy' // this is how we'll read the value on submit
        defaultValue={numberOptions[0].value}
        onChange={handleDropdownChange}
        // value={this.state.formVals.joy}
        />


      <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

export default DailyForm;

