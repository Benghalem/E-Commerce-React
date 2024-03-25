
import { NavLink } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap"
import HeaderLeftBar from "./HeaderLeftBar/headerLeftBar";
// styles
import tyles from "./styles.module.css"

const { headerConteaner, headerLogo } = tyles;


const Header = () => {
  
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
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header