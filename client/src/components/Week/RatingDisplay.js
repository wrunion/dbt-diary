import React from 'react'
import { Table, Segment, Header } from 'semantic-ui-react'
const { Row, HeaderCell, Cell, Body, Divider } = Table;
const TableHeader = Table.Header;

const inputLabelsShort = {
  'joy': 'Joy',
  'emotional_misery': 'Em. Mis',
  'physical_misery': 'Phys. Mis',
  'racing_thoughts': 'Racing Thoughts', 
  'calm': 'Rest', 
  'skills_score': 'Skills Score', 
}

// helper to split strings into paragraphs
const splitToParagraph = (str) => {
  return str.split('\n\n')
}

const CustomTable = ({ entries, error }) => {

  return(
    <div>
      {error && <div>{error}</div>}

      {entries && Object.keys(entries).length > 0 ?
      <>
      <Table striped columns={7} compact size='small' color='green'>
      <TableHeader>
        <Row>
        <HeaderCell>Date</HeaderCell>
        {Object.values(inputLabelsShort).map(e => 
          <HeaderCell>{e}</HeaderCell>
        )} 
        </Row>
      </TableHeader>
      <Body>
      {Object.values(entries).map((e, i) => {
          if (e.rating_data) {
          const data = e.rating_data
          const joy = data.joy;
          const emotionalMisery = data.emotional_misery;
          const physicalMisery = data.physical_misery;
          const calm = data.calm
          const skills = data.skills_score || '-'
          const racingthoughts = data.racing_thoughts || '-'

          const formattedDate = e.date.split(' ').filter(e => 
            e !== '2021').join(' ');
          return(
            <Row key={formattedDate + i}>
              <Cell>{formattedDate}</Cell>
              <Cell>{joy}</Cell>
              <Cell>{emotionalMisery}</Cell>
              <Cell>{physicalMisery}</Cell>
              <Cell>{racingthoughts}</Cell>
              <Cell>{calm}</Cell>
              <Cell>{skills}</Cell>
            </Row>
            )
          }
        })}
      </Body>
      </Table> 

      {/* notes  */}
      <div style={notesSegmentStyle}>
      <Header as='h2' content='Notes' icon='edit outline' color='grey' style={headerStyle} />
      {Object.values(entries).map((e, i) => {
          if (e.rating_data?.notes) {
          const notes = e.rating_data.notes || ''
          const formattedNotes = notes && splitToParagraph(notes)

          const formattedDate = e.date.split(' ').filter(e => 
            e !== '2021').join(' ');

            return(
              <>
              <section style={{ padding: '15px',  border: '1px solid #E0E1E2', borderRadius: '7px', margin: '15px' }}>
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