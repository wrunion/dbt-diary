import React from 'react'
import { Menu, Dropdown, Button, Segment } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

const { Item } = Menu

const menuStyle = {
  marginTop: 0,
  paddingTop: 0,
  // borderBottom: 'none'
}

const TabNavBar = ({ user, children }) => {

  return ( 
    <>
    <Menu style={menuStyle} widths={3} attached='top' tabular>
      <Item 
        as={NavLink} exact to='/'
        name='Daily DBT'
      />
      <Item 
        as={NavLink} exact to='/journal'
        name='Journal'
      />
      <Item 
        as={NavLink} to='/week'
        name='Week in Review'
      />

      {/* {user 
      ? <DropDownMenu /> 
      : <Item>
        <Button basic fluid
          color='violet' 
          href='/auth/google' 
          content='Login' 
        />
      </Item>} */}
    </Menu>
    <Segment attached='bottom'>
      {children}
    </Segment>
    </>
  )
}

export default TabNavBar

// export const MainNav = ({ user }) => {

//   const loggedIn = false
//   console.log(loggedIn)

//   const DropDownMenu = () => (
//     <Dropdown item text='More'>
//       <Dropdown.Menu>
//         <Item 
//           as={NavLink} to='/resources'
//           name='Resources'
//           icon='book'
//         />
//         <Dropdown.Item 
//           as={NavLink} to='/help'
//           icon='question circle outline'
//           text='Help'
//         />
//         <Dropdown.Item 
//           as={NavLink} to='/settings'
//           icon='cog'
//           text='Options'
//         />
//         <Dropdown.Item 
//           href='/api/logout'
//           icon='power off'
//           text='Logout'
//         />
//       </Dropdown.Menu>
//     </Dropdown>
//   )

//   return ( 
//     <>
//     <Menu style={topMenuStyle} attached='top' borderless>
//       <Item 
//         as={NavLink} exact to='/about'
//         name='About'
//       />
//       {/* <Item 
//         as={NavLink} exact to='/journal'
//         name='Journal'
//       />
//       <Item 
//         as={NavLink} to='/resources'
//         name='Resources'
//       /> */}
//       <Menu.Menu position='right'>
//         {loggedIn ? <DropDownMenu /> :
//           <Item>
//             <Button basic fluid
//               color='violet' 
//               href='/auth/google' 
//               content='Login' 
//             />
//           </Item>}
//       </Menu.Menu>
//     </Menu>
//     </>
//   )
// }

// export default NavBar