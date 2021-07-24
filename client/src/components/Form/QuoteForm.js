import React, { useState } from 'react'
import { Segment, Form, Input, Label, Header, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
const { Field } = Form

function QuoteForm(props) {

  const [vals, setVals] = useState({
    quote: '',
    source: '',
    focus: ''
  })

  const inputs = [
    { name: 'quote', label: 'Quote', type:'text' },
    { name: 'source', label: 'Source', type:'text'},
    { name: 'focus', label: `Today I want to focus on`, type: 'text' }
  ]

  const handleChange = e => {
    const { name, value } = e.target
    setVals({ ...vals, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const data = {
      quote: e.target.quote.value,
      source: e.target.source.value,
      focus: e.target.focus.value
    }

    fetch('/dbt/quote/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
        // Shows dimmer message and resets state
        this.handleShow() 
        this.resetState();
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    }) 
  }

  return (
    <>
      <Segment as='section'>
        <Header as='h2' color='teal' content='Daily Quotes' subheader="What's your focus for today?" />
        <Form onSubmit={handleSubmit}>
          {inputs.map((e, i) => (
            <Field>
            <Input 
              key={e.name} 
              type={e.type}
              name={e.name}
              required={e.name === 'quote' ? true : false}
              value={vals[e.name]}
              onChange={(e) => handleChange(e)}
              label={<Label basic pointing='right' fluid={true} color='teal'>
                {e.label}</Label>}
              value={e.value} 
              />
            </Field>

          ))}
          <Button type='submit' color='teal'>Submit</Button>
        </Form>
      </Segment>
    </>
  )
}

// QuoteForm.propTypes = {

// }

export default QuoteForm

