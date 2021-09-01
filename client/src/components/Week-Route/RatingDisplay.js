import React from 'react'
import { DAILY_RATING_INPUTS } from './../../data/inputs'
import './RatingDisplay.css'
import { Table, Segment, Header, Divider } from 'semantic-ui-react'
const { Row, HeaderCell, Cell } = Table;
const TableHeader = Table.Header;

const liStyle = {
  marginBottom: '.5em',
  lineHeight: '2em',
}

const uiStyle = {
  margin: '25px',
}

const summaryStyle = {
  marginBottom: '1em',
  color: '#21BA45'
}

const headerStyle = {
  marginLeft: '25px'
}

const notesSegmentStyle = {
  marginTop: '2em'
}

const numericInputLabels = DAILY_RATING_INPUTS.filter(e => e.type === 'number').map(e => e.label)
const numericInputNames = DAILY_RATING_INPUTS.filter(e => e.type === 'number').map(e => e.name)
const textInputNames = DAILY_RATING_INPUTS.filter(e => e.type === 'text').map(e => e.name)
const textInputs = DAILY_RATING_INPUTS.filter(e => e.type === 'text' || e.type === 'textarea')

const noteLabels = {
  meds_notes: 'Meds Notes',
  sleep_notes: 'Sleep Notes',
  self_care: 'Self Care',
  other: 'Other Notes'
}

// helper to split strings into paragraphs
const splitToParagraph = (str) => {
  return str.split('\n\n')
}

const CustomTable = ({ data, error }) => {
  const entries = data.filter(e => e.entry_type === 'rating')
  return(
    <div>
      {error && <div>{error}</div>}

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
      {/* <div style={notesSegmentStyle}>
        <Header as='h2' content='Notes' 
          icon='edit outline' color='grey' 
          style={headerStyle} 
          />
          {Object.values(entries).map((e, i) => {
            if (e.entry?.notes) {
            const notes = e.entry.notes || ''
            const formattedNotes = notes && splitToParagraph(notes)

            const formattedDate = e.date.split(' ').filter(e => 
              e !== '2021').join(' ');

              return(
                <section 
                  key={formattedDate + i}      
                  style={detailsSummaryStyle}>
                  <ul className='ui list' 
                    style={uiStyle}>
                  <details>
                  <summary style={summaryStyle}>{formattedDate}</summary>
                  {formattedNotes.map((e, i) => {        
                    return (
                    <div key={i}>
                      <li style={liStyle}>{e}</li>
                    </div>
                    )
                  })}
                </details>
                </ul>
              </section>
              )
            }
          })}

      </div> */}
      </>
      :
      <Segment>
        No data found for those dates
      </Segment>}
    </div>
  )
}

export default CustomTable
