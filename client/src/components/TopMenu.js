import React from 'react'
import { Menu, Dropdown, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu

const menuStyle = {
  marginTop: 0,
  paddingTop: 0,
  height: '4em'
}

const violetText = {
  color: '#6434C9'
}

const TopMenu = ({ user }) => {

  const DropDownMenu = () => (
    <Dropdown item text='More' style={violetText}>
      <Dropdown.Menu>
        <Item 
          as={NavLink} to='/resources'
          name='Resources'
          icon='book'
        />
        <Dropdown.Item 
          as={NavLink} to='/help'
          icon='question circle outline'
          text='Help'
        />
        <Dropdown.Item 
          as={NavLink} to='/settings'
          icon='cog'
          text='Options'
        />
        <Dropdown.Item 
          href='/api/logout'
          icon='power off'
          text='Logout'
        />
      </Dropdown.Menu>
    </Dropdown>
  )

  return ( 
    <Menu style={menuStyle} attached='top' borderless>
      <Item 
        as={NavLink} exact to='/about'
        name='About'
        header
      />
      <Menu.Menu position='right'>
      {user ? 
        <>
        <Item 
          as={NavLink} to='/resources'
          name='Resources'
          icon='book'
          style={violetText}
        />
        <DropDownMenu /> 
        </>:          
        <Item>
          <Button basic fluid
            color='violet' 
            href='/auth/google' 
            content='Login' 
          />
        </Item>}
      </Menu.Menu>
    </Menu>
  )
}

export default TopMenu