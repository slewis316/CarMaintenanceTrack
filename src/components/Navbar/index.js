import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Button } from '@mui/material';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  //NavBtn,
  //NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {

    const { logOutUser } = useContext(UserContext);
    // This function is called when the user clicks the "Logout" button.
    const logOut = async () => {
        try {
        // Calling the logOutUser function from the user context.
        const loggedOut = await logOutUser();
        // Now we will refresh the page, and the user will be logged out and
        // redirected to the login page because of the <PrivateRoute /> component.
        if (loggedOut) {
            window.location.reload(true);
        }
        } catch (error) {
        alert(error)
        }
    }

  return (
    <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/homePage' activeStyle>
            Home
          </NavLink>  
          <NavLink to='/addNew' activeStyle>
            Add New Appointment
          </NavLink>
          <NavLink to='/userAppointments' activeStyle>
            My Appointments
          </NavLink>
          <NavLink to='/signupPage' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <Button variant="outlined" size="small" onClick={logOut}>Logout</Button>
      </Nav>
    </>
  );
};
  
export default Navbar;