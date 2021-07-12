import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
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

const CustomCard = ({ card, index, key, title, skills, homework, gratitude, tags, other }) => {

  const description = () => {
    return (
      <div id='card-description'>
        {homework && 
        <div style={divStyle}>
          <span style={{fontWeight: 'bold'}}> Homework: </span>
          <span style={paragraphStyle}>{homework}</span>
        </div>}
        {gratitude && 
        <div style={divStyle}>
          <span style={{fontWeight: 'bold'}}> Gratitude: </span>
          <span style={paragraphStyle}>{gratitude}</span>
        </div>}
        {skills && 
        <div>
          <span style={{fontWeight: 'bold'}}> Skills: </span>
          <span style={paragraphStyle}>{skills}</span>
        </div>}
        {other && 
        <div>
          <span style={{fontWeight: 'bold'}}> Other: </span>
          <span style={paragraphStyle}>{other}</span>
        </div>}
      </div>
    )
  }

  const cardColor = colors[index%9]
  console.log(card.journal_data)

  return (
    <>
    <Card fluid color={cardColor} key={key}>
      <Content header={<><Icon name='heart' color={cardColor} /> <span style={{fontWeight: 'bold'}}>{title}</span></>} />

      <Content description={description} />

      <Content extra>
        <Icon name='hashtag' />{tags ? tags : 'No tags yet'}
      </Content>

    </Card>
  </>
  )
}


export default CustomCard
