import React from 'react'
import { DAILY_RATING_INPUTS } from './../../data/inputs'
import './RatingDisplay.css'
import PropTypes from 'prop-types'
import { Table, Segment, Header, Divider } from 'semantic-ui-react'
const { Row, HeaderCell, Cell } = Table;
const TableHeader = Table.Header;

const numericInputs = DAILY_RATING_INPUTS.filter(e => e.type === 'number')
const numericInputLabels = numericInputs.map(e => e.label)
const numericInputNames = numericInputs.map(e => e.name)
const textInputNames = DAILY_RATING_INPUTS.filter(e => e.type === 'text').map(e => e.name)

const noteLabels = {
  meds_notes: 'Meds Notes',
  sleep_notes: 'Sleep Notes',
  self_care: 'Self Care',
  other: 'Other Notes'
}

const RatingDisplay = ({ data }) => {
  if (!data) {
    return (
      <Segment className='noData'>
        No data found for those dates
      </Segment>
    )
  }

  // Entries before this date don't have a valid format
  const entries = data.filter(e => e.entry_type === 'rating').filter(e => e.date > '2021-08-20')

  return(
    <div>
      {entries && Object.keys(entries).length > 0 ?
      <>
      <Table striped compact size='small' color='green'>

        <TableHeader>
          <Row>
            <HeaderCell width={3}>Date</HeaderCell>
            {numericInputLabels.map((e, i) => 
              <HeaderCell width={2} key={i}>{e}</HeaderCell>
            )} 
          </Row>
        </TableHeader>
             
        <Table.Body>
        {Object.values(entries).map((e, i) => {
          // Target data from the "entry" object itself 
          // which contains both text notes
          // and numerical ratings
          const ratings = e.entry
          return (
            <Row key={e.date + i}>
              <Cell>{e.date}</Cell>
              {Object.entries(ratings).map((rating, i) => 
                // Filter out non-numeric data like date and notes
                // To do this, the function compares the keys against an array of numeric inputs, which is imported from the same file the form itself uses, so the two should always be in sync.
                numericInputNames.includes(rating[0]) ?
                <Cell key={i}>{rating[1]}</Cell>
                : 
                null
                )}
              </Row>
            )
          }
        )}
      </Table.Body>
      </Table> 

      <Divider id='divider' />

      <div className='notesDisplayDiv'>

        <Header as='h2' 
          color='blue' 
          content='Notes'
          icon='edit' 
          style={{ alignSelf: 'center' }}
        />

        {Object.values(entries).map((e, i) => {
          const notes = e.entry
          return (
            <section key={i} className='singleNote'>
              <details>
                <summary className='summary'>{notes.date}</summary>
                {Object.entries(notes).map((note, i) => {
                  const name = note[0]
                  const text = note[1]
                  // Filter out numeric data, and entries without values
                  if (textInputNames.includes(name) && text) {
                  return (
                    <div className='noteInnerText' key={i}>
                      <span className='noteLabel'>
                        {noteLabels[name]}</span>: {text}
                    </div>
                    )
                  } else { return null }
                })}
              </details>
            </section>
            )
          }
        )}

      </div>
      </>
      :
      <Segment>
        No data found for those dates
      </Segment>}
    </div>
  )
}

RatingDisplay.propTypes = {
  data: PropTypes.array
}

export default RatingDisplay
