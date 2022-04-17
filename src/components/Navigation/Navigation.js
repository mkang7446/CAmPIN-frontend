import React from 'react';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.png';
// import styled from 'styled-components';

// const Styles = styled.div`
//   img {
//     width: 100px;
//   }
// `;

function Navigation({ loggedIn, handleLogout, userInfo }) {
  return (
    <Navbar
      fixed={'top'}
      className={'position-sticky ps-0'}
      collapseOnSelect
      expand='lg'
      bg='dark'
      variant='dark'
    >
      <Container>
        <Navbar.Brand
          href='/'
          style={{ fontSize: '40px', marginRight: '50px' }}
        >
          CamPIN
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            className='me-auto'
            style={{
              fontSize: '20px',
              gap: '20px',
              marginLeft: '50px',
              fontWeight: '600',
            }}
          >
            <LinkContainer to='/campgrounds'>
              <Nav.Link>Campgrounds</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/mycampin'>
              <Nav.Link href='mycampin'>My CamPIN</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/posts'>
              <Nav.Link href='posts'>Community</Nav.Link>
            </LinkContainer>
            {/* <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {userInfo && (
              <Navbar.Text
                style={{
                  fontSize: '17px',
                  marginRight: '10px',
                  color: 'white',
                }}
                className='justify-content-end'
              >
                Hi, {userInfo.username}!
              </Navbar.Text>
            )}
            {loggedIn ? (
              <>
                <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to='/signup'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </>
            )}
            {/* <Nav.Link href='#deets'>Register</Nav.Link>
            <Nav.Link eventKey={2} href='#memes'>
              Login
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
