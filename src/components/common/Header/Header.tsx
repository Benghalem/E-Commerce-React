import { useEffect } from "react";
import { actGetWishlist } from "@store/wishlist/wishlist";
// handler for logout in account and login 
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { NavLink } from "react-router-dom";
// bootstrap
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
// styles
import tyles from "./styles.module.css"

const { headerConteaner, headerLogo } = tyles;

const Header = () => {
  // set dispatch about login in account
  const dispatch = useAppDispatch()
  const { accessToken, user } = useAppSelector((state) => state.auth)

  // handel wishlist product full info git data and set in store wishlist about user when accessToken is changed
  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("ProductsFullInfo"))
    }
  }, [dispatch, accessToken])

  return (
    <header>
      <div className={headerConteaner}>
          <h1 className= {headerLogo}>
            <span>our</span> <Badge>eCom</Badge>
          </h1>
          <HeaderLeftBar />
      </div>   
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
            <Nav.Link as={NavLink} to="/about-us"> About</Nav.Link>
          </Nav>
          <Nav>
            {/* login in account */}
            {!accessToken ? 
            <>{/* if not access token show login and register */}
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </>: /* if access token show profile */
            <NavDropdown title={`Welcom: ` + user?.firstName + " " + user?.lastName} id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/profile" end > Profaile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/profile/orders" > Oreders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                as={NavLink} 
                to='/' 
                onClick={() => dispatch(authLogout())} 
              >
                  Logout
              </NavDropdown.Item>
            </NavDropdown>
            }           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header