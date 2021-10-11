import React, { useState } from 'react'
import { Dropdown, Form, Label } from 'semantic-ui-react'

const options = [
  { key: 0, text: '0', value: 0 },
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
]

const CustomDropdown = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [value, setValue] = useState()

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }
  
  return (
    <Form.Field>
      <label htmlFor={name}> {label} </label>
      <Dropdown 
        clearable 
        selection 
        options={options} 
        onChange={handleChange}
        value={value}
      />
    </Form.Field>
  )
}

export default CustomDropdown