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

const CustomCard = ({ card, index, key, title }) => {
  console.log(card)
  const cardColor = colors[index%9]

  const entry = card.journal_data

  const keys = Object.keys(entry).filter(e => e !== 'date').filter(e => e !== 'used_skills')
  const tags = entry.tags || ''

  const Description = () => {
    return (
      keys && keys.map((e, i) => {
        const name = displayNames[e]
        // false is a valid value here, so we don't want to filter it out
        // as just another 'falsy value'
        const val = entry[e] === false ? false : entry[e] || null
        console.log(val)

        if (val !== null) {
          if (typeof val === 'boolean') { 
            return <DisplayBoolean val={val}
                      displayName={displayNames[e]}/>}
        return (
          <>
          {i !== 0 && <Divider style={{ marginTop: '.75em', marginBottom: '.75em' }}/>}
          <div style={{ padding: padding }}>
            <span style={{ fontWeight: 'bold', marginBottom: margin }}>{name}</span><br/>
            <span>{val}</span>
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

  return (
    <>
    <Card fluid color={cardColor} key={key}>
      {/* <Label corner='right' icon='bookmark outline' /> */}
      <Content header={Header}/>

      <Content description={Description} />

      <Content extra>
        <Icon name='hashtag' />{tags ? tags : entry.used_skills}
      </Content>

    </Card>
  </>
  )
}


export default CustomCard
