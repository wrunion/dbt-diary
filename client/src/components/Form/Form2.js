import React, { useState } from 'react'
import { INITIAL_JOURNAL_STATE, JOURNAL_METRICS } from './Form2data'
import { Segment, Form } from 'semantic-ui-react'


const JournalForm = () => {

  const [entry, setEntry] = useState(INITIAL_JOURNAL_STATE)
  const [fields, setFields] = useState(JOURNAL_METRICS)

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to server
    console.log('entry submitted: ', entry)
  }

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value})
  }

  const handleCheckboxChange = (e) => {
    setEntry({ ...entry, [e.target.name]: !e.target.checked})
    console.log(entry[e.name])
  }

  const CheckboxInput = (props) => {
    const { item, index } = props
    const { name, label } = item

    console.log(item, index, name, label)

    return(
      <input type='checkbox' 
        value={entry[name]} 
        onChange={(e) => handleCheckboxChange(e)}
      />
    )
  }

  if (entry && fields) {
    const checkboxInputs = fields.filter(e => e.type === 'checkbox')
    const textareaInputs = fields.filter(e => e.type === 'textarea')
  
    return (
      <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {checkboxInputs && checkboxInputs.map((e, i) => {
          const { defaultValue, display, form, label, name, type } = e;
          console.log('name ', name)
          return (
            <>
              {/* <CheckboxInput item={e} index={i} /> */}
              <label>{label}</label>
              <input type='checkbox' 
                checked={entry[name]}
                onChange={(e) => handleCheckboxChange(e)}
              />
            </>
          )
        })}
        {fields && fields.filter(e => e.display === true).map((e, i) => {
          const { defaultValue, display, form, label, name, type } = e;

          return (
            <div key={i}>
              <input type={type} 
                  name={name} 
                  // value={entry[`${name}`]}
                  value={entry[name]}
                  onChange={(e) => handleChange(e)}
                  placeholder={label}
                  />
              <label htmlFor={name}>{label}</label>
            </div>
          )
        })}
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
    )
  } else {
    return null;
  }
}

export default JournalForm;