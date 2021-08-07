import React, { useState, useEffect } from 'react'
import ReadMoreReact from 'read-more-react'
import moment from 'moment'
import { Card, Icon, Divider, Label } from 'semantic-ui-react'
const { Content } = Card

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

const displayNames = {
  "meds_as_prescribed": 'Took meds',
  "meds_boolean": 'Took meds',
  'skills_boolean': 'Used skills',
  "skills_used": 'Used skills',
  'skills': 'Skills used',
  'used_skills': 'Skills used',
  "self_harm": 'Kept self safe',
  'harm_boolean': 'Kept self safe',
  'homework': 'Homework',
  'other': 'Other',
  'gratitude': 'Gratitude',
  'concerta_boolean': 'Took Concerta',
  'inhaler_boolean': 'Used inhaler on schedule'
}

const marginSmall = '5px'
const margin = '10px'
const padding = '5px'

// TODO: move this and 'dividerStyle' to global style sheet
const preStyle = {
  whiteSpace: 'pre-wrap', 
  fontFamily: 'inherit',
  display: 'flex'
}

const dividerStyle = {
  marginTop: '.75em', 
  marginBottom: '.75em'
}

const descriptionStyle = {
  fontWeight: 'bold', 
  marginBottom: margin 
}

const booleanStyle = {
  textDecoration: 'line-through', 
  marginRight: marginSmall, 
  marginBSmallottom: marginSmall
}

const CustomCard = ({ card, index, key }) => {

  const [favorite, setFavorite] = useState(card.favorite)

  const cardColor = colors[index%9]

  const entry = card.entry

  const date = moment(card.date).format('dddd MMMM Do, YYYY')

  const keys = Object.keys(entry).filter(e => e !== 'date').filter(e => e !== 'other' && e !== 'tags')
  const orderedKeys = ['skills_used', ...keys.filter(e => e !== 'skills_used')]
  
  const tags = card.entry.tags || 'No tags yet'

  /* This toggles the "favorite" property in the DB */
  const onFavoriteClick = async id => {

    fetch('/dbt/entry/favorite/toggle', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json.entry)
        setFavorite(json.entry.favorite)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }

  const Description = () => {
    return (
      orderedKeys && orderedKeys.map((e, i) => {
        const name = displayNames[e]
        // false is a valid value here, so we don't want to filter it out
        // as just another 'falsy value'
        const val = entry[e] === false ? false : entry[e] || null

        if (val !== null) {
          if (typeof val === 'boolean' || e.includes('boolean')) { 
            return (  
              <DisplayBoolean 
                val={val} 
                key={name}
                displayName={name} 
                /> 
              )
            } 

          
      return (
      <div key={name}> {i !== 0 && 
        <Divider style={dividerStyle}/>}
          <div style={{ padding: padding }}>
            <span style={descriptionStyle}>{name}</span><br/>
            {name === 'Homework' || name === 'Skills used' ? 
            <pre style={preStyle}>
              <ReadMoreReact text={val} 
                min={75}
                ideal={150}
                max={250}
                readMoreText={'(read more)'}
                /> 
              </pre> : 
            <pre style={preStyle}>{val}</pre>}
          </div>
        </div>
        )}
      })
    )
  }

  const DisplayBoolean = ({ val, displayName }) => {
    if (val === true || val === 'true') {
      return <span style={{ marginBottom: '25px' }}><Icon name='check' color={cardColor} />{displayName} </span>
    } else {
      return  <span style={booleanStyle}>{displayName}</span> 
    }
  }

  const Header = () => (
    <>
    <Icon name='heart' color={cardColor} /> 
      <span style={{fontWeight: 'bold'}}>
        {date}
      </span>
    </>
  )

  return (
    <>
    <Card fluid={true} color={cardColor} key={key}>
      <Label corner='right' color={cardColor} 
        onClick={() => onFavoriteClick(card.id)} 
        icon={favorite ? 'heart' : 'heart outline'} />
      <Content header={Header}/>

      <Content description={Description} />

      <Content extra>
        <Icon name='hashtag' />{tags}
      </Content>

    </Card>
  </>
  )
}

export default CustomCard
