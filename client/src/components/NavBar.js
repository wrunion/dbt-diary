import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu

const NavBar = () => {

  return ( 
    <>
    <Menu pointing widths={4}>
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
      <Item 
        as={NavLink} to='/resources'
        name='Resources'
      />

    </Menu>
    </>
  )
}

export default NavBar;
