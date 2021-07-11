import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
const { Content } = Card;

const divStyle = {
  marginBottom: '.75em'
}

const paragraphStyle = {
  color: 'grey'
}

const CustomCard = ({ key, title, skills, homework, gratitude, tags, other }) => {

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

  return (
  <Card fluid color='teal' key={key}>
    <Content header={title} />

    <Content description={description} />

    <Content extra>
      <Icon name='hashtag' />{tags ? tags : 'No tags yet'}
    </Content>

  </Card>
  )
}


export default CustomCard
