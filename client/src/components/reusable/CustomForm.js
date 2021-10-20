import React, { useState, useEffect } from 'react'
import Dropdown from './FormElements/Dropdown'
import { 
  CustomTextArea, 
  CustomTextInput, 
  CustomCheckboxInput, 
  CustomDateInput } from './FormElements/CustomFormInputs'

import { Form, Header, Button, Dimmer, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './CustomForm.css'

const { Dimmable } = Dimmer
const { Subheader } = Header


const headerStyle = {
  marginBottom: '1.25em'
}

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

  const formReset = () => {
    setVals({})
    setInitialState()
    setDimmerActive(false)
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
    console.log(vals)
    // Timestamp entry if date was not entered
    if (!vals.date) { vals.date = moment().format('YYYY-MM-DD') }
    // Pass data up to parent component
    onSubmitCallback(vals)
    // console.log(vals)
  }

  const callbackFunction = ({ value, name }) => {
    setVals({ ...vals, [name]: value })
    console.log(value, name)
  }

  return (
    <>
    {(vals && Object.keys(vals).length > 0) &&
    <Dimmable dimmed={dimmerActive} 
      style={{borderRadius: '5px' }}>

      <div as='section'>
        <Form onSubmit={(e) => handleSubmit(e)} id='CustomForm'>
          <Header as='h2' color={color} 
            content={title}
            style={headerStyle} 
            subheader={subheader} 
            icon={icon} 
            />
          
          {inputs.map(e => {
            const { name, label, type } = e
            const inputProps = { name, label, callbackFunction, icon, color }
           
            if (type === 'textarea') {
              return (
                <CustomTextArea inputProps={inputProps} key={name} />
              )
            }
            if (type === 'checkbox') {
              return(
                <CustomCheckboxInput inputProps={inputProps} key={name} />
              )
            } 
            if (type === 'number') {
              return (
                <Dropdown inputProps={inputProps} key={name} />
              )
            }
            if (type === 'text') {
              return (
                <CustomTextInput inputProps={inputProps} key={name}/>
              )
            }
            if (type === 'date') {
              return (
                <CustomDateInput inputProps={inputProps} key={name} />
              )
            }
            else return null
            })}

          <Button type='submit' color={color}>
            Submit
          </Button>

        </Form>
      </div>

      <Dimmer active={dimmerActive} 
        onClickOutside={() => formReset()}>
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