import React, { useState, useEffect } from 'react'
import { Table, Segment } from 'semantic-ui-react'
const { Row, HeaderCell, Cell, Body } = Table;
const TableHeader = Table.Header;

const sampleObj = {
    "id": 9,
    "date": "Sunday July 11th 2021",
    "timestamp": "1625996557687",
    "rating_data": {
        "SI": 0,
        "self_harm_urge": 0,
        "drug_urge": 0,
        "emotional_misery": 0,
        "physical_misery": 0,
        "joy": 0,
        "gratitude": 0,
        "calm": 0,
        "intentionality": 0
    },
    "journal_data": null
}

/* Each of these is a dropdown form field. Add here */
const metrics = ['SI', 'self_harm_urge', 'drug_urge', 'emotional_misery', 'physical_misery', 'joy', 'gratitude', 'calm', 'intentionality']

const inputLabels = {
  'SI': 'SI',
  'self_harm_urge': 'Self harm urge',
  'drug_urge': 'Drug urge',
  'emotional_misery': 'Emotional Misery',
  'physical_misery': 'Physical Misery',
  'joy': 'Joy',
  'gratitude': 'Gratitude',
  'calm': 'Calm',
  'intentionality': 'Intentionality'
}  

const inputLabelsShort = {
  'SI': 'SI',
  'self_harm_urge': 'Self harm urge',
  'emotional_misery': 'Emotional Misery',
  'physical_misery': 'Physical Misery',
  'joy': 'Joy'
}

const CustomTable = () => {

  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
  // fetch data & set in state
    fetch('api/day/test', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json)
      setEntries(json.data)
      }).catch(err => {
      console.log(err);
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  return(
    <div>
      {/* for fetch errors  */}
      {error && <div>{error}</div>}

      {/* Table start */}
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
          
          const formattedDate = e.date.split(' ').filter(e => e !==
            '2021').join(' ');
        return(
          <Row>
            <Cell>{formattedDate}</Cell>
            <Cell>{SI}</Cell>
            <Cell>{self_harm_urge}</Cell>
            {/* <Cell>{drug_urge}</Cell> */}
            <Cell>{emotional_misery}</Cell>
            <Cell>{physical_misery}</Cell>
            <Cell>{joy}</Cell>
            {/* <Cell>{gratitude}</Cell> */}
            {/* <Cell>{calm}</Cell> */}
            {/* <Cell>{intentionality}</Cell> */}
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
