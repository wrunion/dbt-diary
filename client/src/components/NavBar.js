import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu

const NavBar = () => {

  return ( 
    <>
    <Menu pointing secondary widths={3}>
      <Item 
        as={NavLink} exact to='/'
        name='Journal'
      />
      <Item 
        as={NavLink} to='/day'
        name='Today'
      />
      <Item 
        as={NavLink} to='/week'
        name='This Week'
      />

    </Menu>
    </>
  )
}

export default NavBar;
