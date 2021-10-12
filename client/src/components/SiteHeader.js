import React from 'react'
import { Header } from 'semantic-ui-react'
import { ReactComponent as MoonImg } from './../assets/moon-phase-1.svg'

const { Subheader } = Header

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '1.5em',
  paddingBottom: '1.5em',
  background: '#FFF'
}


const moonStyle = {
  width: '325px',
  paddingRight: '2.5em',
  paddingLeft: '2.5em',
  paddingBottom: '0',
  marginBottom: '0'
}

const SiteHeader = ({ user, subtitle, color='violet', style }) => {
  
  return (
    <>
      <div style={containerStyle}>
        <div style={{ padding: '1em' }}>
          <a href='/auth/google'>
            <MoonImg style={moonStyle} />
          </a>
          
          <Header as='h1' color={color} style={style || {}}>
            {user ? `${user.name}'s MoodWise` : `MoodWise Demo`}
            <Subheader>
            {subtitle}
            </Subheader>
          </Header>
        </div>
      </div>
    </>
    )
}


export default SiteHeader;

