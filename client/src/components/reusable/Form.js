import React, { useState, useEffect } from 'react'
import { Form, Label, Segment, Input, Button, Header, TextArea, Icon } from 'semantic-ui-react'
const { Field } = Form
const { Subheader } = Header

const FIELDS = [
  { id: 1, label: 'Metric 1', name: 'metric-1', type:'text' },
  { id: 2, label: 'Metric 2', name: 'metric-2', type:'text' },
  { id: 3, label: 'Metric-3', name: 'metric-3', type:'text' },
  { id: 4, label: 'Metric-4', name: 'metric-4', type:'text' },
  { id: 10, label: 'Metric-5', name: 'metric-5', type:'text' },
  { id: 9, label: 'Metric-6', name: 'metric-6', type:'text' },
  { id: 5, label: 'Homework', name: 'homework', type: 'textarea' },
  { id: 6, label: 'Skills Focus', name: 'skill-focus', type: 'textarea' },
  { id: 7, label: 'Skills Used', name: 'skills-used', type: 'textarea' },
  { id: 8, label: 'Other', name: 'other', type: 'textarea' },
]

const buttonStyle ={
  marginTop: '1em'
}

const Form2 = () => {

  const [formVals, setFormVals] = useState({})
  // const [show, setShow] = useState(false)

  useEffect(() => {
    const fieldNames = FIELDS.map(e => e.name)
    fieldNames.forEach(e => formVals[e] = '')
    console.log(formVals)
  }, [])

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('submitted vals: ', formVals)
  }

  return(
  Object.keys(formVals).length > 0 &&
    <div style={{ padding: '20px'}}>

      <Form as={Segment} noValidate>
      <div style={{ padding: '1.5em' }}>
        <Header as='h2' icon color='violet' 
          textAlign='center'>
          <Icon name='heart outline' /> 
          <Header.Content>
            DBT Diary
          </Header.Content>
          <Subheader>
            Rate your day from 0 to 5
          </Subheader>
        </Header>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap' }}>

 
        {FIELDS.map(e => {

          const { id, label, name, type } = e

          if (type === 'text') {      
          return (
            <Field key={id} style={{ margin: '12px', padding: '1.5em' }}>
            {/* <label><Icon name='sort' /> {label}</label> */}
            <Label color='teal' basic
              pointing='right'>
                {label}
              </Label>
            <Input 
              // inline
              // label={label}
              // placeholder='0'
              // type={type}
              //
              type='number'
              // min='0'
              // max='5'
              name={name}
              style={{ width: '75px', margin: '1em' }}
              // value={formVals[name]}
              // onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
            />
            </Field>
          )}
          if (type === 'textarea') {
            return(
            <Field key={id} style={{ margin: '12px', width: '90%' }}>
              <label>{label} <Icon name='write' color='teal' /></label>
              <TextArea 
                rows='5'
                name={name}
                value={formVals[name]}
                onChange={(e) => setFormVals({...formVals, [name]: e.target.value })}
              />
            </Field>
            )
          } else {
            return null;
          }
        })}
        </div>

        <Button fluid color='teal' type='submit'
          onClick={handleSubmit}
          style={buttonStyle}>
          Submit
        </Button>
        </div>

      </Form>
    </div>
  )
}

export default Form2;

//* slider Input   <Field>
  // <label>123: </label>
  // <input
  //   type='range'
  //   min={0}
  //   max={5}
  //   // value={rating}
  //   // onChange={this.handleChange}
  // />
  // </Field> */