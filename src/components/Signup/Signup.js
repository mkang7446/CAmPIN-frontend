import { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../../apiConfig';
import signupImg from '../../assets/signup.jpg';

import styled from 'styled-components';

const Styles = styled.div`
  .signup {
    margin-top: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .signup-container {
    border: 2px solid #e5e5e5;
    margin-top: 10px;
    display: flex;
    width: 85%;
    max-height: 800px;
    overflow: hidden;
    border-radius: 10px;
    gap: 50px;
  }
  .signup-img {
    width: 100%;
    max-height: 'initial';
  }
  .signup-form {
    margin-top: 30px;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-left: 45px;
  }

  .signup-title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 30px;
  }
  .signup-button {
    background-color: #001219;
    border: 1px solid #001219;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
    width: 100%;
    height: 50px;
    margin-top: 10px;
  }

  .signup-button:hover {
    background-color: #2a9d8f;
    border: 1px solid #2a9d8f;
    color: #001219;
  }
`;

const Signup = () => {
  const initialFormData = {
    email: '',
    username: '',
    password: '',
    re_password: '',
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [signupErrors, setSignupErrors] = useState([]);

  const handleChange = (event) => {
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(API_URL + 'users/', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setSuccess(true);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.password) {
          setSignupErrors(data.password);
        }
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handlePasswordMatch = (event) => {
    if (formData.password !== formData.re_password) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Styles>
      <div>
        <div className='signup'>
          <div className='signup-container'>
            <div className='signup-form'>
              <Form onSubmit={handleSignup}>
                <Form.Group controlId='username'>
                  <h1 className='signup-title'>Create An Account</h1>
                  <Form.Control
                    required
                    autoFocus
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder='Username'
                    style={{ marginBottom: '30px', height: '3rem' }}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Control
                    required
                    type='email'
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    placeholder='Email Address'
                    style={{ marginBottom: '30px', height: '3rem' }}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a valid email .
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='password'>
                  <Form.Control
                    required
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    style={{ marginBottom: '30px', height: '3rem' }}
                  />
                </Form.Group>
                <Form.Group controlId='re_password'>
                  <Form.Control
                    required
                    type='password'
                    name='re_password'
                    value={formData.re_password}
                    onChange={handleChange}
                    onBlur={handlePasswordMatch}
                    placeholder='Confirm Password'
                    style={{ marginBottom: '30px', height: '3rem' }}
                  />
                </Form.Group>
                <Button
                  className='signup-button'
                  type='submit'
                  disabled={error}
                >
                  Sign up
                </Button>

                {error && <Alert variant='danger'>Passwords must match!</Alert>}
                {success && (
                  <Alert variant='success' className='mt-5'>
                    User successfully created! You will be redirected to log in.
                    If you are not automatically redirected, please click{' '}
                    {<Link to='/login'>here</Link>}.
                  </Alert>
                )}
                {Boolean(signupErrors.length) &&
                  signupErrors.map((error) => {
                    return <Alert variant='danger'>{error}</Alert>;
                  })}
              </Form>
            </div>
            <div className='signup-img'>
              <Card.Img src={signupImg} />
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default Signup;
