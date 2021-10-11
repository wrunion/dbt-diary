import React from 'react'
import { Menu, Image, Input, Icon, Dropdown, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu
const SubMenu = Menu.Menu

const navBarTextStyle = {
  marginLeft: '10px', color: '#909090' 
}

const greyText = {
  color: '#909090'
}

const menuStyle = {
  marginTop: 0,
  paddingTop: 0,
}

export const NavBar = ({ user }) => {

  console.log('user', user)

  const DropDownMenu = () => (
    <Dropdown item text='More'>
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
    <>
    <Menu style={menuStyle} widths={3} collapsible>
      <Item 
        as={NavLink} exact to='/'
        name='Journal'
      />
      <Item 
        as={NavLink} to='/week'
        name='Week in Review'
      />
      {user 
      ? <DropDownMenu /> 
      : <Item>
        <Button basic fluid
          color='violet' 
          href='/auth/google' 
          content='Login' 
        />
      </Item>}
    </Menu>
    </>
  )
}

// export const TopNavBar = ({ user }) => {

//   const DropdownIcon = () => <Icon name='ellipsis horizontal' color='grey' size='large' />

//   const UserIcon = () => <Icon name='user circle' size='big' color='grey' />

//   const UserDisplay = () => (
//     <>
//       {user.picture 
//         ? <Image src={user.picture} circular size='mini' />
//         : <UserIcon />
//       }
//       <span style={navBarTextStyle}>
//         {user.email}
//       </span>
//     </>
//   )

//   return ( 
//     <>
//     <Menu borderless stackable>
//       <Item header color='violet'
//         as={NavLink} exact to='/'
//         name='MoodWise'
//         icon='heart outline'
//       />
//         <SubMenu position='right' size={4}>
//           <Item>
//             <Input icon='search' placeholder='Search...' />
//           </Item>
//           <Item disabled>
//             <UserDisplay />
//           </Item>
//           <Dropdown item icon={DropdownIcon}>
//             <Dropdown.Menu>
//               <Dropdown.Item 
//                 as={NavLink} to='/help'
//                 icon='question circle outline'
//                 text='Help'
//               />
//               <Dropdown.Item 
//                 as={NavLink} to='/feedback'
//                 icon='comment outline'
//                 text='Feedback'
//               />
//               <Dropdown.Item 
//                 as={NavLink} to='/settings'
//                 icon='cog'
//                 text='Options'
//               />
//               <Dropdown.Item 
//                 href='/api/logout'
//                 icon='power off'
//                 text='Logout'
//               />
//             </Dropdown.Menu>
//           </Dropdown>
//         </SubMenu>
//     </Menu>
//     </>
//   )
// }

// export const TopNavBarDemo = () => (
//   <Menu borderless stackable style={{ minHeight: '4.75em'}}>
//     <Item header  
//       name='MoodWise' 
//       icon='heart outline'
//     />
//     <SubMenu position='right'>
//       <Item>
//         <span style={greyText}>
//           You are in demo display
//         </span>
//       </Item>
//       <Item>
//         <Button basic 
//           color='violet' 
//           href='/auth/google' 
//           content='Login' 
//         />
//       </Item>
//     </SubMenu>
//   </Menu>
// )


export default NavBar;
