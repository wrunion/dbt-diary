import React, { useState } from 'react'
import { INITIAL_JOURNAL_STATE, JOURNAL_METRICS } from './Form2data'


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
    setEntry({ ...entry, [e.target.name]: e.target.value})
  }

  return(
    <>
    {entry && fields &&
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {fields && fields.filter(e => e.display === true).map((e, i) => {
          const { defaultValue, display, form, label, name, type } = e;

          return (
            <>
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
            </>
          )
        })}
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>}
    </>
  )
}

export default JournalForm;