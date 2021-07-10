import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
const { Content, Header, Meta, Description } = Card;

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

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

const CustomCard = () => (
  
  <Card fluid color='red'>
    <Content header={now} />
    {/* top dividing line */}

    <Content description={description} />

    {/* bottom dividing line  */}
    <Content extra>
      <Icon name='hashtag' />
      {/* TODO: map over skills here and make them links
      also, format as desired */}
      {/* {skills?.map(e => 
        <span style={{ textDecoration: 'underline' }}>
          {e}
        </span>)} */}
        {skills?.join(', ')}
    </Content>
  
  </Card>
)

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