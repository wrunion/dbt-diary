import React, { useState, useEffect } from 'react'
import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
const { Field } = Form
const { Dimmable } = Dimmer
const { Subheader } = Header

const WeekInReview = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'weekNumber', label: 'Week #', type: 'number', required: true },
    { name: 'module', label: 'Module', type: 'text', required: true },
    { name: 'skills', label: 'Focus this week', type:'text', required: true },
    { name: 'experience', label: `This week I experienced`, type: 'textarea', required: false },
    { name: 'homework', label: `This week I learned`, type: 'textarea', required: false }
  ]

  const onSubmitCallback = (data) => {
    // submit data to server
    fetch('/api/week/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
        // this tells the child form to show success dimmer
        setSuccess(true)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })     
  }
  
  return (
    <div>
      <WeekInReviewForm 
        inputs={inputs} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='violet'
      />
    </div>
  )
}

export default WeekInReview

const formStyle = {
  padding: '1.5em'
}

const WeekInReviewForm = (props) => {

  const inputs = props.inputs
  const success = props.success
  const onSubmitCallback = props.onSubmitCallback
  const color = props.color || 'grey'
  
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
    // Grab the vals from event.target and populate the data object
    inputs.forEach(e => data[e.name] = event.target[e.name]?.value)
    // send submitted data to parent component
    onSubmitCallback(data)
  }

  return (
    <>
    {(vals && Object.keys(vals).length > 0) &&
    <Dimmable dimmed={dimmerActive} style={{borderRadius: '5px'}}>

      <Segment as='section'>
        <Form onSubmit={(e) => handleSubmit(e)} style={formStyle}>
          <Header as='h2' color={color} content='Week in Review' />
          {inputs.map(e => (
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
          ))}
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

WeekInReviewForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  onSubmitCallback: PropTypes.func.isRequired,
  success: PropTypes.bool,
  color: PropTypes.string
}

