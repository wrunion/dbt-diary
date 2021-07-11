import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { ReactComponent as MoonImg } from './../assets/moon-phase-1.svg'

const { Subheader } = Header

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: '1.25em',
  marginBottom: '1em'
  // borderBottom: '2px rgba(224, 225, 226, .85) solid'
}


const moonStyle = {
  width: '325px',
  paddingRight: '2.5em',
  paddingLeft: '2.5em',
  paddingBottom: '0',
  marginBottom: '0'
}

const HeaderComponent = ({ title, subtitle, color='violet', style }) => (
  <Segment style={containerStyle}>
    <div style={{ padding: '1em' }}>

    <MoonImg style={moonStyle} />
    
    <Header as='h1' color={color} style={style || {}}>
      {title}
      <Subheader>
        {subtitle}
      </Subheader>
    </Header>

    </div>
  </Segment>
)

export default HeaderComponent;

