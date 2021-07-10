import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
const { Content, Header, Meta, Description } = Card;

// const description = [
//   'Amy is a violinist with 2 years experience in the wedding industry.',
//   'She enjoys the outdoors and currently resides in upstate New York.',
// ].join(' ')

const title = 'title goes here'

const skills = [
  'skill 1', 'skill 2', 'skill 3'
]

const extra = (
  <a>
    <Icon name='user' />
    16 Friends
  </a>
)

const now = 'Saturday, June 10'

const divStyle = {
  marginBottom: '.75em'
}

const paragraphStyle = {
  color: 'grey'
}
// props: title, 
// formatted props object: {title, description}
const CustomCard = ({ key, title, skills, homework, gratitude, tags }) => {

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
      </div>
    )
  }

  const extra = () => {
    return(
    <div>
      {skills && 
        <div>
          <span style={{fontWeight: 'bold'}}> Skills used: </span>
          {skills}
        </div>}
      </div>
    )
  }

  return (
  <Card fluid color='red' key={key}>
    <Content header={title} />

    <Content description={description} />

    {/* bottom dividing line  */}
    <Content extra>
      <Icon name='hashtag' />{tags ? tags : 'No tags yet'}
    </Content>

  </Card>
  )
}


export default CustomCard



// const Card1 = () => (
//   <Card
//     image='/images/avatar/large/elliot.jpg'
//     header='Elliot Baker'
//     meta='Friend'
//     // content='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
//     description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
//     extra={extra}
//   />
// )

// export default Card1;