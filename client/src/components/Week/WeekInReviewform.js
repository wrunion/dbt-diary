import React, { useState, useEffect } from 'react'
import { Segment, Form, Input, Label, Header, Button } from 'semantic-ui-react'
// import PropTypes from 'prop-types'
const { Field } = Form

const formStyle = {
  padding: '1.5em'
}

// props: inputs, init state, api route to hit, color, stamp-with-date true/false
const WeekInReviewForm = () => {

  const [vals, setVals] = useState({})

  // these will be props
  const inputs = [
    { name: 'week-number', label: 'Week #', type:'number' },
    { name: 'focus', label: 'Focus this week', type:'text'},
    { name: 'experienced', label: `This week I experienced`, type: 'textarea' },
    { name: 'learned', label: `This week I learned`, type: 'textarea' }
  ]

  // const initState = {
  //   'week-number': 0, 
  //   'focus': '',
  //   'experienced-this-week': '',
  //   'learned-this-week': ''
  // }

  useEffect(() => {
    const initState = {}
    inputs.forEach(e => initState[e.name] = '')
    setVals(initState)
    // console.log(vals)
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setVals({ ...vals, [name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    // console.log(e.target.focus.value)
    const data = {}
    inputs.forEach(e => data[e.name] = event.target[e.name]?.value)

    console.log(data)
    // const data = {
    //   quote: e.target.quote.value,
    //   source: e.target.source.value,
    //   focus: e.target.focus.value
    // }

    // fetch('api/quotes', {
    //   method: 'POST', 
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json()).then(json => {
    //   if (json.success === true) { 
    //     console.log(json)
    //     // Shows dimmer message and resets state
    //     this.handleShow() 
    //     this.resetState();
    //   }
    // }).catch(err => {
    //   console.log(err);
    //   return 'There was an error. See console for details'
    // }) 
  }

  return (
    <>
      <Segment as='section'>
        <Form onSubmit={handleSubmit} style={formStyle}>
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
                value={e.value} 
                />
            </Field>
          ))}
          <Button type='submit' color='violet'>Submit</Button>
        </Form>
      </Segment>
    </>
  )
}

// WeekInReviewForm.propTypes = {

// }

export default WeekInReviewForm

