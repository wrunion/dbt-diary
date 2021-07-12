import React from 'react'
import { Card, Icon, Divider, Label } from 'semantic-ui-react'
const { Content } = Card;

const divStyle = {
  marginBottom: '.75em'
}

const paragraphStyle = {
  color: 'grey'
}

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

const padding = '5px'
const marginSmall = '5px'
const margin = '10px'
const marginLarge = '15px'

const CustomCard = ({ card, index, key, title, skills, homework, gratitude, tags, other }) => {

  // const description = () => {
  //   return (
  //     <div id='card-description'>
  //       {homework && 
  //       <div style={divStyle}>
  //         <span style={{fontWeight: 'bold'}}> Homework: </span>
  //         <span style={paragraphStyle}>{homework}</span>
  //       </div>}
  //       {gratitude && 
  //       <div style={divStyle}>
  //         <span style={{fontWeight: 'bold'}}> Gratitude: </span>
  //         <span style={paragraphStyle}>{gratitude}</span>
  //       </div>}
  //       {skills && 
  //       <div>
  //         <span style={{fontWeight: 'bold'}}> Skills: </span>
  //         <span style={paragraphStyle}>{skills}</span>
  //       </div>}
  //       {other && 
  //       <div>
  //         <span style={{fontWeight: 'bold'}}> Other: </span>
  //         <span style={paragraphStyle}>{other}</span>
  //       </div>}
  //     </div>
  //   )
  // }

  const sampleObj = {
    "meds_as_prescribed": true,
    "self_harm": true,
    "used_skills": "Briefly, I remembered to stay in the moment by realizing that I was thinking too far ahead into the future, and reminding myself to come back to the present moment. I took a breath, and I feel more grounded and centered in my body now. ",
    "homework": "Yesterday I did observe and describe some wandering thoughts, and brought myself back to the situation at hand. I was with my partner and relaxing, and I kept thinking of things I had to do. But I reminded myself to stay in the moment, and that helped!'",
    "other": "",
    "gratitude": "I'm grateful that I get to code, and to play piano. I'm grateful that I have time to rest and relax and pursue hobbies for awhile. "
}

const displayNames = {
  "meds_as_prescribed": 'Took meds as prescribed',
  'used_skills': 'Skills used',
  "self_harm": 'Kept self safe',
  'homework': 'Homework',
  'other': 'Other',
  'gratitude': 'Gratitude'
}

  const cardColor = colors[index%9]

  const entry = card.journal_data
  console.log(entry)

  const keys = Object.keys(entry)

  const Description = () => {
    return (
      keys && keys.map((e, i) => {
        const name = displayNames[e]
        // false is a valid value here, so we don't want to filter it out
        // as just another 'falsy value'
        const val = entry[e] === false ? false : entry[e] || null
        if (val !== null) {
          if (typeof val === 'boolean') { 
            return <DisplayBoolean val={val} displayName={displayNames[e]}/>}
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
        <Icon name='hashtag' />{tags ? tags : 'No tags yet'}
      </Content>

    </Card>
  </>
  )
}


export default CustomCard
