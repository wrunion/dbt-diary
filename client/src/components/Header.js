import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { ReactComponent as Plant1 } from './../assets/succulents.svg'
import { ReactComponent as Plant2 } from './../assets/plant-1.svg'

const { Subheader } = Header

const svgStyle = {
  height: '65px',
  color: 'grey',
  paddingRight: '2.5em',
  paddingLeft: '2.5em'
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '1.25em',
  marginBottom: '1em'
  // borderBottom: '2px rgba(224, 225, 226, .85) solid'
}

const HeaderComponent = ({ title, subtitle, color='violet', style }) => (
  <Segment style={containerStyle}>

    <Plant1 style={svgStyle} className='header-icon' />
    
    <Header as='h1' color={color} style={style || {}}>
      {title}
      <Subheader>
        {subtitle}
      </Subheader>
    </Header>

    <Plant2 style={svgStyle} className='header-icon' />
  
  </Segment>
)

export default HeaderComponent;

