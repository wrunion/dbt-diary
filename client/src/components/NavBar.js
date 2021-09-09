import React from 'react'
import { Menu, Image, Input, Icon, Dropdown } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu
const SubMenu = Menu.Menu

const NavBar = () => {

  return ( 
    <>
    <Menu pointing secondary widths={3}>
      <Item 
        as={NavLink} exact to='/'
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



export const TopNavBar = ({ user }) => {

  const DropdownIcon = <Icon name='ellipsis horizontal' color='grey' size='large' />

  const UserIcon = <Icon name='user circle' size='big' color='grey' />

  const UserDisplay = () => (
    <>
      {user.picture 
        ? <Image src={user.picture} circular size='mini' />
        : <UserIcon />
      }
      <span style={{ marginLeft: '10px', color: '#909090' }}>
        {user.email}
      </span>
    </>
  )


  
  return ( 
    <>
    <Menu borderless stackable>
      <Item header color='violet'
        as={NavLink} exact to='/'
        name='MoodWise'
      />
      <SubMenu position='right' size={4}>
        <Item>
          <Input icon='search' placeholder='Search...' />
        </Item>
        <Item disabled>
          <UserDisplay />
        </Item>
        <Dropdown item icon={DropdownIcon}>
          <Dropdown.Menu>
            <Dropdown.Item 
              as={NavLink} to='/help'
              icon='question circle outline'
              text='Help'
            />
            {/* <Dropdown.Item 
              as={NavLink} to='/feedback'
              icon='comment outline'
              text='Feedback'
            /> */}
            <Dropdown.Item 
              as={NavLink} to='/settings'
              icon='cog'
              text='Settings'
            />
            <Dropdown.Item 
              as={NavLink} to='/api/logout'
              icon='power off'
              text='Logout'
            />
          </Dropdown.Menu>
        </Dropdown>
      </SubMenu>
    </Menu>
    </>
  )
}

export default NavBar;
