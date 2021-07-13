import React from 'react'
import { Table, Segment } from 'semantic-ui-react'
const { Row, HeaderCell, Cell, Body } = Table;
const TableHeader = Table.Header;

const inputLabelsShort = {
  'SI': 'SI',
  'self_harm_urge': 'Self harm urge',
  'emotional_misery': 'Emotional Misery',
  'physical_misery': 'Physical Misery',
  'joy': 'Joy'
}

const CustomTable = ({ entries, error }) => {

  return(
    <div>
      {error && <div>{error}</div>}

      {entries && Object.keys(entries).length > 0 ?
      <Table striped columns={6} compact size='small' color='green'>
      <TableHeader>
        <Row>
        <HeaderCell>Date</HeaderCell>
        {Object.values(inputLabelsShort).map(e => 
          <HeaderCell>{e}</HeaderCell>
        )} 
        </Row>
      </TableHeader>
      <Body>
      {Object.values(entries).map(e => {
          if (e.rating_data) {
          const data = e.rating_data
          const { SI, self_harm_urge, drug_urge, emotional_misery, physical_misery, joy, gratitude, calm, intentionality } = data;
          
          const formattedDate = e.date.split(' ').filter(e => 
            e !== '2021').join(' ');
          return(
            <Row>
              <Cell>{formattedDate}</Cell>
              <Cell>{SI}</Cell>
              <Cell>{self_harm_urge}</Cell>
              <Cell>{emotional_misery}</Cell>
              <Cell>{physical_misery}</Cell>
              <Cell>{joy}</Cell>
            </Row>
            )
          }
        })} 
      </Body>
      </Table> :
      <Segment>
        No data found for those dates
      </Segment>}
    </div>
  )
}

export default CustomTable;
