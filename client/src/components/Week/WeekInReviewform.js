import React, { useState, useEffect, createRef } from 'react'
import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon } from 'semantic-ui-react'
// import PropTypes from 'prop-types'
const { Field } = Form
const { Dimmable } = Dimmer
const { Subheader } = Header

const WeekInReview = () => {

  // form input props
  const inputs = [
    { name: 'weekNumber', label: 'Week #', type:'number' },
    { name: 'focus', label: 'Focus this week', type:'text'},
    { name: 'experienced', label: `This week I experienced`, type: 'textarea' },
    { name: 'learned', label: `This week I learned`, type: 'textarea' }
  ]

  const onSubmitCallback = (data) => {
    console.log('onSubmitCallback', data)
  }
  
  return (
    <div>
      <WeekInReviewForm 
        inputs={inputs} 
        onSubmitCallback={onSubmitCallback} 
      />
    </div>
  )
}

export default WeekInReview

const formStyle = {
  padding: '1.5em'
}

// props: inputs, init state, api route to hit, color, stamp-with-date true/false
const WeekInReviewForm = (props) => {

  // const { inputs, onSubmitCallback } = props
    // form input props
    const inputs = [
      { name: 'weekNumber', label: 'Week #', type:'number' },
      { name: 'focus', label: 'Focus this week', type:'text'},
      { name: 'experienced', label: `This week I experienced`, type: 'textarea' },
      { name: 'learned', label: `This week I learned`, type: 'textarea' }
    ]

  // const formRef = createRef()
  // const [formReset, setFormReset] = useState(0)
  const [formKey, setFormKey] = useState(0)
  const [vals, setVals] = useState({})
  const [dimmerActive, setDimmerActive] = useState(false)

  const setInitialState = (arr) => {
    // arr.forEach(e => setVals({ ...vals, [e.name]: '' }))
    setVals({
      experienced: "",
      focus: "",
      learned: "",
      weekNumber: ""
    })
  }

  useEffect(() => {
    setInitialState(inputs)
  }, [])

  useEffect(() => {
    console.log('current state', vals)
  }, [vals])

  const handleChange = e => {
    setVals({ ...vals, [e.target.name]: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const data = {}
    // Grab the vals from event.target and populate the data object
    // that we will send to the server
    inputs.forEach(e => data[e.name] = event.target[e.name]?.value)
    console.log(data)

    setDimmerActive(true)
    setInitialState({...inputs, reset: true})

    // reset form vals
    // formRef.reset()
    console.log('state after submit', vals)

    // reset state
    // inputs.forEach(e => data[e.name] = event.target[e.name]?.value)
    


    // fetch('api/week/create', {
    //   method: 'POST', 
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json()).then(json => {
    //   if (json.success === true) { 
    //     console.log(json)
    //     // TODO: Show success message & reset state
    //     // this.handleShow() 
    //     // this.resetState();
    //   }
    // }).catch(err => {
    //   console.log(err);
    //   return 'There was an error. See console for details'
    // }) 
  }

  return (
    <>
    <Dimmable dimmed={dimmerActive} style={{borderRadius: '5px'}}>

      <Segment as='section'>
        <Form onSubmit={handleSubmit} style={formStyle} key={formKey}>
          <Header as='h2' color='violet' content='Week in Review' />
          {inputs.map(e => (
            <Field key={e.name}>
              <Input 
                type={e.type}
                name={e.name}
                required={e.name === 'quote' ? true : false}
                value={vals[e.name]}
                onChange={(e) => handleChange(e)}
                label={<Label basic pointing='right' color='violet'>
                  {e.label}</Label>}
                />
            </Field>
          ))}
          <Button type='submit' color='violet'>Submit</Button>
        </Form>
      </Segment>

      {/* dimmer  */}
      <Dimmer active={dimmerActive} 
        onClickOutside={() => setDimmerActive(false)}>
        <Header as='h2' icon inverted>
          <Icon name='heart' />
          Nice work! 
          <Subheader>Make sure to get some rest today!</Subheader>
        </Header>
      </Dimmer>
    </Dimmable>
    </>
  )
}

// WeekInReviewForm.propTypes = {

// }

