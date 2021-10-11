import React, { useState, useEffect } from 'react'
import Dropdown from './FormElements/Dropdown'
import { 
  CustomTextArea, 
  CustomTextInput, 
  CustomCheckboxInput, 
  CustomDateInput } from './FormElements/CustomFormInputs'

import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon, Checkbox } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moment from 'moment'

const { Field } = Form
const { Dimmable } = Dimmer
const { Subheader } = Header

const formStyle = {
  padding: '1.5em'
}

const headerStyle = {
  marginBottom: '1.25em'
}

const options = [
  { key: 0, text: '0', value: 0 },
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
]

/* Custom reusable form component.
 * Required props: 
 * inputs: array of objects each describing a single form input
 * success: boolean value that determines the value of "dimmerActive/" 
 * onSubmitCallback: function that is called with form data as an argument on submit.
 * 
 * Additional props for component styling are available and are described in PropTypes
 */

const CustomForm = (props) => {

  const { inputs, success, onSubmitCallback, color='grey', title='Journal', subheader='', icon=null } = props

  const [vals, setVals] = useState({})
  const [dimmerActive, setDimmerActive] = useState(false)

  const setInitialState = () => {
    const initState = {}
    inputs.forEach(e => initState[e.name] = e.defaultValue  || '')
    setVals(initState)
  }

  useEffect(() => {
    setInitialState(inputs)
  }, [inputs])

  useEffect(() => {
    setDimmerActive(success)
    setInitialState(inputs)
  }, [success])

  const handleSubmit = event => {
    event.preventDefault()
    // Timestamp entry if date was not entered
    if (!vals.date) { vals.date = moment().format('YYYY-MM-DD') }
    // Pass data up to parent component
    // onSubmitCallback(vals)
    console.log(vals)
  }

  const callbackFunction = ({ value, name }) => {
    setVals({ ...vals, [name]: value })
  }


  return (
    <>
    {(vals && Object.keys(vals).length > 0) &&
    <Dimmable dimmed={dimmerActive} 
      style={{borderRadius: '5px' }}>

      <Segment as='section'>
        <Form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
          <Header as='h2' color={color} 
            content={title}
            style={headerStyle} 
            subheader={subheader} 
            icon={icon} 
            />
          
          {inputs.map(e => {
            const { name, label, type } = e
            // Build props object to pass to custom input components
            const inputProps = { name, label, callbackFunction, icon, color }
           
            if (type === 'textarea') {
              return (
                <CustomTextArea inputProps={inputProps} />
              )
            }
            if (type === 'checkbox') {
              return(
                <CustomCheckboxInput inputProps={inputProps} />
              )
            } 
            if (type === 'number') {
              return (
                <Dropdown inputProps={inputProps} />
              )
            }
            if (type === 'text') {
              return (
                <CustomTextInput inputProps={inputProps} />
              )
            }
            if (type === 'date') {
              return (
                <CustomDateInput inputProps={inputProps} />
              )
            }
            else return null
            })}
          <Button type='submit' color={color}>Submit</Button>
        </Form>
      </Segment>

      <Dimmer active={dimmerActive} 
        onClickOutside={() => setDimmerActive(false)}>
        <Header as='h2' icon inverted>
          <Icon name='heart' />
          Nice work! 
          <Subheader>Make sure to get some rest today!</Subheader>
        </Header>
      </Dimmer>
    </Dimmable>}
    </>
  )
}

CustomForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  success: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string, 
  subheader: PropTypes.string
}

export default CustomForm