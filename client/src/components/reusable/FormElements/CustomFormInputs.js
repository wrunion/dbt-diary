import React, { useState } from 'react'
import { Form, Input, Label, Icon, TextArea } from 'semantic-ui-react'

const { Field } = Form

/* TextArea Input */
export const CustomTextArea = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [value, setValue] = useState()

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  return (
    <Field key={name}>
      <label htmlFor={name}>
        <Icon name={icon} color={color} /> {label}
      </label>
      <TextArea 
        rows='5'
        name={name}
        value={value}
        onChange={handleChange}
      />
    </Field>
  )
}

/* Text Input */
export const CustomTextInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [value, setValue] = useState()

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  const CustomLabel = () => (
    <Label basic pointing='right' htmlFor={name} color={color}>
      {label}
    </Label>
  )

  return (
    <Field key={name}>
      <Input  
        name={name} 
        value={value}
        onChange={handleChange}
        label={<CustomLabel />}
      />
    </Field>
  )
}

/* Checkbox Input */
export const CustomCheckboxInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const [checked, setChecked] = useState()

  const handleChange = e => {
    let isChecked = e.target.checked
    setChecked(isChecked)
    callbackFunction({ value: isChecked, name })
  }

  const CustomLabel = () => (
    <Label basic pointing='left' htmlFor={name} color={color}>
      {label}
    </Label>
  )

  return (
    <Field inline key={name}>
      <input type='checkbox' 
        inline
        name={name}
        checked={checked}
        value={checked}
        onChange={handleChange}
      />
    <CustomLabel />
    </Field>
  )
}

/* Default Input */
export const CustomDateInput = ({ inputProps }) => {

  const { name, label, callbackFunction, icon, color } = inputProps

  const today = new Date().toISOString().substr(0,10)
  const [value, setValue] = useState(today)

  const handleChange = (e, { value }) => {
    setValue(value)
    callbackFunction({ value, name })
  }

  return (
    <Field key={name}>
      <Input 
        type='date'
        name={name}
        value={value}
        onChange={handleChange}
        />
    </Field>
  )
}