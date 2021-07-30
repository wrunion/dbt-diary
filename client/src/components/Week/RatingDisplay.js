import React from 'react'
import { Table, Segment, Header } from 'semantic-ui-react'
const { Row, HeaderCell, Cell, Body } = Table;
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

const inputLabelsAll = {
  SI: 'S.I.',
  self_harm_urge: 'S.H. urge',
  drug_urge: 'Drug urge',
  emotional_misery: 'Em Mis',
  physical_misery: 'Phys Mis',
  joy: 'Joy',
  gratitude: 'Gratitude',
  calm: 'Calm',
  intentionality: 'Intentionality',
  racing_thoughts: 'Racing thoughts',
  skills_score: 'Skills score'    
}

const noteLabels = {
  focus_phrase: 'Focus phrase',
  skills_focus: 'Skills focus',
  notes: 'Notes'
}

// helper to split strings into paragraphs
const splitToParagraph = (str) => {
  return str.split('\n\n')
}

const CustomTable = ({ data, error }) => {
  const entries = data.filter(e => e.entry_type === 'rating')

  // entries has: date, entry_type, id
  // entry has: everything else
  return(
    <div>
      {error && <div>{error}</div>}

      {entries && Object.keys(entries).length > 0 ?
        <>
        <Table striped compact size='small' color='green'>
          <TableHeader>
            <Row>
            <HeaderCell width={2}>Date</HeaderCell>
            {Object.values(inputLabelsAll).map((e, i) => 
              <HeaderCell key={i}>{e}</HeaderCell>
            )} 
            </Row>
          </TableHeader>
        <Body>
        {Object.values(entries).map((e, i) => {

          return(
            <Row key={e.date + i}>
              <Cell>{e.date}</Cell>
              {Object.entries(e.entry).filter(e => e[0] !== 'notes' && e[0] !== 'focus_phrase' && e[0] !== 'skills_focus' && e[0] !== 'date').map(e => {
                const value = e[1]
                return (
                  <Cell>{value}</Cell>
                )
              })}
              </Row>
            )
          }
        )}
      </Body>
      </Table> 

      <div style={notesSegmentStyle}>
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
                <>
                <section key={formattedDate + i} style={{ padding: '15px',  border: '1px solid #E0E1E2', borderRadius: '7px', margin: '15px' }}>
                  <ul className='ui list' style={uiStyle}>
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
              </>
              )
            }
          })}

      </div>
      </>
      :
      <Segment>
        No data found for those dates
      </Segment>}
    </div>
  )
}

export default CustomTable;
