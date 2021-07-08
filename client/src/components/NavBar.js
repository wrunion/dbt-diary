import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu

const NavBar = () => {

  return ( 
    <>
    <Menu pointing secondary vertical>
      <Item 
        as={NavLink} exact to='/'
        name='home'
      />
      <Item 
        as={NavLink} to='/day'
        name='Day'
      />
      <Item 
        as={NavLink} to='/week'
        name='Week'
      />

    </Menu>
    </>
  )
}

export default NavBar;
