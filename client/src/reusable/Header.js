import React from 'react'
import { Header } from 'semantic-ui-react'

const { Subheader } = Header

const HeaderComponent = ({ title, subtitle, color='violet', style }) => (
  <Header as='h1' color={color} style={style || ''}>
    {title}
    <Subheader>
      {subtitle}
    </Subheader>
  </Header>
)

export default HeaderComponent;

