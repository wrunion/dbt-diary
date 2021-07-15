import React from 'react'
import { Card, Icon, Divider } from 'semantic-ui-react'
const { Content } = Card;

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
  "meds_as_prescribed": 'Took meds as prescribed',
  'used_skills': 'Skills used',
  "self_harm": 'Kept self safe',
  'homework': 'Homework',
  'other': 'Other',
  'gratitude': 'Gratitude'
}

const marginSmall = '5px'
const margin = '10px'
const padding = '5px'

// helper to split strings into paragraphs
const splitToParagraph = (str) => {
  return str.split('\n\n')
}

const CustomCard = ({ card, index, key, title }) => {
  const cardColor = colors[index%9]

  const entry = card.journal_data

  const keys = Object.keys(entry).filter(e => e !== 'date')
  const tags = entry.tags || ''

  const Description = () => {
    return (
      keys && keys.map((e, i) => {
        const name = displayNames[e]
        // false is a valid value here, so we don't want to filter it out
        // as just another 'falsy value'
        const val = entry[e] === false ? false : entry[e] || null

        if (val !== null) {
          if (typeof val === 'boolean') { 
            return <DisplayBoolean val={val}
                      displayName={displayNames[e]}/>
                    } 
        return (
          <>
          {i !== 0 && <Divider style={{ marginTop: '.75em', marginBottom: '.75em' }}/>}
          <div style={{ padding: padding }}>
            <span style={{ fontWeight: 'bold', marginBottom: margin }}>{name}</span><br/>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{val}</pre>
          </div>
          </>
        )}
      })
    )
  }

  const DisplayBoolean = ({ val, displayName }) => {
    if (val === true) {
      return <span style={{ marginBottom: '25px' }}><Icon name='check' color={cardColor} />{displayName} </span>
    } else {
      return  <span style={{textDecoration: 'line-through', marginRight: marginSmall, marginBSmallottom: marginSmall }}>{displayName}</span> 
    }
  }

  const Header = () => (
    <>
    <Icon name='heart' color={cardColor} /> 
      <span style={{fontWeight: 'bold'}}>
        {title}
      </span>
    </>
  )

  console.log(entry)
  return (
    <>
    <Card fluid color={cardColor} key={key}>
      {/* <Label corner='right' icon='bookmark outline' /> */}
      <Content header={Header}/>

      <Content description={Description} />

      <Content extra>
        {/* this just filters out the early entries that don't have tag data  */}
        <Icon name='hashtag' />{entry.date !== '2021-07-13' && entry.date !== undefined ? entry.used_skills: 'No tags yet'}

      </Content>

    </Card>
  </>
  )
}


export default CustomCard