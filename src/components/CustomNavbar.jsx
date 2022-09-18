import { useEffect } from "react";
import { useState } from "react";
import { Link,NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "../auth";
import logo from './blogging.png'

const CustomNavbar = () => {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrentUserDetail());
  }, [login]);

  

  const logout = () => {
    doLogout(() => {
      //logged out
      setLogin(false);
      navigate("/");
      console.log("logout called")
      location.reload();
    });
  };

  return (
    <div>
      <Navbar color="warning" light expand="md"  className=" shadow py-0 fluid " fixed="top">
      <Link style={{ textDecoration: "none" }} tag={ReactLink} to="/">
      &nbsp;
      <img
            alt="logo"
            src={logo}
            style={{
              height: 30,
              width: 30,
            }}
          />
          </Link>
        <NavbarBrand tag={ReactLink} to="/">
          
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blogs4U
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
              &nbsp;&nbsp; Recent Posts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">
              Contact Us
              </NavLink>
            </NavItem>

            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/services">
                  Git-Hub
                </DropdownItem>
                <DropdownItem>Linked-In</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>FaceBook</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem>Youtube</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    New Post
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile-info">
                    {user.email}
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
              </>
            )}

            {!login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
