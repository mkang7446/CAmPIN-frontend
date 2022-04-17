import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../../assets/logo.jpeg';

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
        <Navbar.Brand href='/'>
          <img className='logo' src={logo} alt='logo' width='230px' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav
            className='me-auto'
            style={{
              fontSize: '20px',
              gap: '20px',
              marginLeft: '30px',
              fontWeight: '600',
            }}
          >
            <LinkContainer to='/campgrounds'>
              <Nav.Link>Campgrounds</Nav.Link>
            </LinkContainer>

            {loggedIn ? (
              <LinkContainer to='/mycampin'>
                <Nav.Link href='mycampin'>My CamPIN</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link
                  onClick={() => {
                    alert('Login required for this service!');
                  }}
                  href='login'
                >
                  My CamPIN
                </Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer to='/posts'>
              <Nav.Link href='posts'>Community</Nav.Link>
            </LinkContainer>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
