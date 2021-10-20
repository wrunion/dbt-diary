import React, { useState, useEffect } from 'react'
// import './RatingDisplay.css'

import { DEMO_METRICS } from '../../data/inputs'
import PropTypes from 'prop-types'
import { Table, Segment, Header, Divider } from 'semantic-ui-react'
const { Row, HeaderCell, Cell } = Table
const TableHeader = Table.Header

const inputs = DEMO_METRICS

const numericInputs = inputs.filter(e => e.type === 'number')
const numericInputLabels = numericInputs.map(e => e.label)
const numericInputNames = numericInputs.map(e => e.name)

const tableStyle = {
  marginTop: '.5em',
  marginBottom: '1em'
}

const footerStyle = {
  fontWeight: '700'
}

let totals = {}

const RatingDisplay = ({ data }) => {

  const [colTotal, setColTotal] = useState({})
  const [numEntries, setNumEntries] = useState({})

  // Entries before this date don't have a valid format
  const entries = data.filter(e => e.entry_type === 'rating').filter(e => e.date > '2021-08-20')

  useEffect(() => {
    setNumEntries(entries.length)
  }, [data])

  useEffect(() => {
    totals = {}
  }, [data])

  return(
    <div>
      {entries && Object.keys(entries).length > 0 ?
      <>
      <Table striped compact size='small' color='green' style={tableStyle}>

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
              {Object.entries(ratings).map((rating, i) => {
                let name = rating[0]
                let value = rating[1]
                // Filter out non-numeric data like date and notes
                // To do this, the function compares the keys against an array of numeric inputs, which is imported from the same file the form itself uses, so the two should always be in sync.
                if (numericInputNames.includes(name)) {

                  // Add the value to the weekly total amount for that category
                  (totals[name] && value) ? totals[name] = totals[name] += value : (!totals[name] && value) ? totals[name] = value : totals[name] += 2
                  
                  return (
                    <Cell key={i}>{value}</Cell>
                  )
                } else return null
              })}
              </Row>
            )
          }
        )}
      </Table.Body>
      {/* Display averages for each category  */}
        <Row id='table-footer' style={footerStyle}>
          <Cell>Average Rating</Cell>
          {numericInputNames.map((name, i) => {
            console.log(colTotal)
            return <Cell key={i}>{(totals[name]/parseInt(numEntries)).toFixed(1)}</Cell>

          }
          )}
        </Row>
      </Table>
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