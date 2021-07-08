import React from 'react'
import { Header } from 'semantic-ui-react'
import './Page.css'

const Page = ({ title, subtitle, children }) => {

  return(
    <div className="Page">
      <Header as='h2' color='black'>
        {title}
        <Header.Subheader>
          {subtitle}
        </Header.Subheader>
      </Header>
      {children}
    </div>
  )
}

export default Page;