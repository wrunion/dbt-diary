import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import './Page.css'
const { Subheader, Content } = Header

const Page = ({ title, subtitle, children, color, icon, textAlign }) => {

  return(
    <div className="Page">
      <div id='page-header'>
        <Header as='h2' color={color || 'blue'}       
          className='display-title' textAlign={textAlign || 'center'}>
          {icon && <Icon name={icon} />}
          <Content>
            {title}
          <Subheader>
            {subtitle}
          </Subheader>
          </Content>
        </Header>
      </div>

      {children}
    </div>
  )
}

export default Page;