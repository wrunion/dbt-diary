import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import './Page.css'
const { Subheader, Content } = Header

const Page = ({ title, subtitle, children, color, icon }) => {

  return(
    <div className="Page">
      <Header as='h2' color={color || 'grey'}>
        {icon && <Icon name={icon} />}
        <Content>
          {title}
        <Subheader>
          {subtitle}
        </Subheader>
        </Content>
      </Header>
      {children}
    </div>
  )
}

export default Page;