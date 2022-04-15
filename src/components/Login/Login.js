import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import loginImg from '../../assets/login.jpg';
import styled from 'styled-components';

const Styles = styled.div`
  .login {
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .login-container {
    border: 2px solid #e5e5e5;
    margin-top: 10px;
    display: flex;
    width: 85%;
    max-height: 800px;
    overflow: hidden;
    border-radius: 10px;
    gap: 50px;
  }
  .login-img {
    margin: 10px;
    width: 100%;
    max-height: 'initial';
    margin-bottom: 30px;
  }
  .login-form {
    margin-top: 40px;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-right: 60px;
  }

  .login-title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 60px;
  }

  .login-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .login-button {
    background-color: #0077b6;
    border: 1px solid #0077b6;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    width: 100%;
  }

  .signup-button {
    background-color: #03045e;
    border: 1px solid #03045e;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    width: 100%;
  }

  .login-button:hover,
  .signup-button:hover {
    background-color: #ffb703;
    border: 1px solid #ffb703;
    color: black;
  }

  .secret {
    color: white;
    border-bottom: 2px solid #bde0fe;
    margin-bottom: 30px;
  }
`;

const Login = ({ handleSetLoggedIn }) => {
  const initialFormData = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.id]: event.target.value };
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(false);
    try {
      const response = await fetch(API_URL + 'token/login/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        handleSetLoggedIn(data.auth_token);
        navigate('/campgrounds');
      } else if (response.status === 400) {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };
  return (
    <Styles>
      <div>
        <div className='login'>
          <div className='login-container'>
            <div className='login-img'>
              <Card.Img src={loginImg} />
            </div>
            <div className='login-form'>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId='email'>
                  <h1 className='login-title'>Log In To Your Account</h1>
                  <Form.Control
                    required
                    autoFocus
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email Address'
                    style={{ marginBottom: '40px', height: '3rem' }}
                  />
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Control
                    required
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    style={{ marginBottom: '40px', height: '3rem' }}
                  />
                </Form.Group>
                <div className='login-buttons'>
                  <div>
                    <Button className='login-button' type='submit'>
                      Login
                    </Button>
                  </div>
                  <div className='secret'>how did you find me?</div>
                  <div>
                    <Link to='/signup'>
                      <Button className='signup-button' variant='dark'>
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default Login;
