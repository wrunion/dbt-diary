import React, { useState, useEffect } from 'react'
import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon, TextArea } from 'semantic-ui-react'
import PropTypes from 'prop-types'
const { Field } = Form
const { Dimmable } = Dimmer
const { Subheader } = Header

const formStyle = {
  padding: '1.5em'
}

/* 
 * Required props: 
 * inputs (array of what the form inputs should be. see example below)
 * success (boolean - if true will reset form state and show success message) 
 * onSubmitCallback (function, will be called with the data from the form)
 * color (string, enum for one of Semantic UI's color options, optional)
*/

const CustomForm = (props) => {

  const inputs = props.inputs
  const success = props.success
  const onSubmitCallback = props.onSubmitCallback
  const color = props.color || 'grey'
  const title = props.title || 'Journal'
  const subheader = props.subheader || ''
  const icon = props.icon ? props.icon : null
  
  const [vals, setVals] = useState({})
  const [dimmerActive, setDimmerActive] = useState(false)

  const setInitialState = () => {
    const initState = {}
    inputs.forEach(e => initState[e.name] = '')
    setVals(initState)
  }

  useEffect(() => {
    setInitialState(inputs)
  }, [inputs])

  useEffect(() => {
    setDimmerActive(success)
    setInitialState(inputs)
  }, [success])

  const handleChange = e => {
    setVals({ ...vals, [e.target.name]: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = {}
    inputs.forEach(e => data[e.name] = event.target[e.name]?.value)
    // TEMPORARY FOR TESTING
    console.log(data)
    // onSubmitCallback(data)
  }

  return (
    <>
    {(vals && Object.keys(vals).length > 0) &&
    <Dimmable dimmed={dimmerActive} 
      style={{borderRadius: '5px' }}>

      <Segment as='section'>
        <Form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
          {/* icon header vs regular header  */}
          {icon ?
          <Header as='h2' color={color} 
            content={title} 
            subheader={subheader} 
            icon={icon} /> :
          <Header as='h2' color={color} content={title} subheader={subheader} />}

          {inputs.map(e => {
            const { name, label, type, required } = e
            if (type === 'textarea') {
              return(
                <Field key={name}>
                  <label htmlFor={name} basic color={color}>
                    <Icon name='moon outline' color={color} /> {label}
                  </label>
                  <TextArea 
                    rows='5'
                    name={name}
                    required={required}
                    value={vals[name]}
                    onChange={(e) => handleChange(e)}
                  />
                </Field>
              )
            } 
            if (type === 'number') {
              return (
                <Field inline key={name}>
                  <Input 
                    type='number'
                    min='0'
                    max='5'
                    placeholder='0'
                    name={name}
                    // style={{ width: '75px', margin: '1em' }}
                    value={vals[e.name]}
                    onChange={(e) => handleChange(e)}
                  />
                  <Label htmlFor={name} color={color} basic pointing='left'>
                    {label}
                  </Label>
                </Field>
              )
            }
            
            else {
              return (
                <Field key={e.name}>
                <Input 
                  type={e.type}
                  name={e.name}
                  required={e.required}
                  value={vals[e.name]}
                  onChange={(e) => handleChange(e)}
                  label={<Label basic pointing='right' color={color}>
                    {e.label}</Label>}
                  />
              </Field>
              )
            }})}
            {/* </div> */}
            
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
  color: PropTypes.string
}

export default CustomForm