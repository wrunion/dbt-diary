import React, { useState, useEffect } from 'react'
import { Container, Card } from 'semantic-ui-react'

const colors = [
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'grey',
  'black'
]

const cardStyle = {
  padding: '1.25em', 
  overflowWrap: 'anywhere' 
}

const containerStyle = {
  paddingTop: '1em',
  paddingBottom: '1em'
}

const Quotes = () => {

  const [quoteData, setQuoteData] = useState([])

  useEffect(() => {
    fetch('dbt/quote/all', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        setQuoteData(json.data)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }, [])

  return (
    <>
    <Container style={containerStyle}>

      {(quoteData && quoteData.length) > 0 && 
        quoteData.map((e, index) => {
        const { date, id, link, quote, source } = e
        const color = colors[index%9]

        return (
          <Card fluid 
            color={color} 
            key={id}
            style={cardStyle}
            header={quote}  
            meta={link ? 
              <a href={link}>{source}</a> :
              source}
          />
        )
      })}
    </Container>
    </>
  )
}

export default Quotes

