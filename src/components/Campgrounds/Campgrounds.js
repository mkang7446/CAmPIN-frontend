import React, { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';
import jumboImg from '../../assets/jumbotron.jpg';
import styled from 'styled-components';

const Styles = styled.div`
  #jumbo-button {
    margin-top: 10px;
    background-color: #222222;
    border: 1px solid #222222;
    border-radius: 8px;
    /* box-sizing: border-box; */
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    width: 18%;
  }

  #jumbo-button:hover,
  #jumbo-button:active {
    background-color: initial;
    color: black;
    font-size: 16px;
    font-weight: 800;
    text-align: center;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    width: 18%;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
  }

  #jumbo-button:active {
    opacity: 0.5;
  }

  .card-window {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .campgrounds-list {
    border: 2px solid #e5e5e5;
    margin-top: 20px;
    display: flex;
    width: 85%;
  }

  .campground-img {
    width: 35%;
  }

  .campground-text {
    margin-left: 35px;
    margin-top: 5px;
    width: 100%;
  }

  .detail-button {
    background-color: #222222;
    border: 1px solid #222222;
    border-radius: 8px;
    /* box-sizing: border-box; */
    color: #ffffff;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 600;
    width: auto;
  }
`;

function Campgrounds({ loggedIn }) {
  const [campgrounds, setCampgrounds] = useState([]);
  const [error, setError] = useState(false);

  const getCampgroundsList = async () => {
    try {
      setError(false);

      const response = await fetch(API_URL + 'campgrounds');
      if (response.status === 200) {
        const data = await response.json();
        setCampgrounds(data);
      }
    } catch (error) {
      setError(true);
    }
    return;
  };

  useEffect(() => {
    getCampgroundsList();
  }, []);

  if (!error && !campgrounds.length) {
    return null;
  }

  if (error && !campgrounds.length) {
    return <div>Oops, something went wrong! Please try again later!</div>;
  }

  return (
    <Styles>
      <div>
        <Card
          className='bg-dark text-white'
          style={{
            maxHeight: '200px',
            overflow: 'hidden',
          }}
        >
          <Card.Img
            src={jumboImg}
            alt='Card image'
            style={{
              maxHeight: 'initial',
              marginTop: '-12.5%',
            }}
          />
          <Card.ImgOverlay style={{ textAlign: 'center' }}>
            <Card.Title
              style={{ fontSize: '28px', color: 'black', marginTop: '20px' }}
            >
              you all is a manger to build this website. Please add campgrounds
              as many as you know if there is no search result!
            </Card.Title>
            {loggedIn ? (
              <Link to='/campgrounds/new'>
                <Button id='jumbo-button' variant='dark' className='mb-4'>
                  Add a campground
                </Button>
              </Link>
            ) : (
              <Link to='/login'>
                <Button
                  id='jumbo-button'
                  onClick={() => {
                    alert('Login required for this service!');
                  }}
                  // onClick={alert('Login required for this service!')}
                  className='mb-4'
                >
                  Add a campground
                </Button>
              </Link>
            )}
          </Card.ImgOverlay>
        </Card>

        <SearchBar data={campgrounds} />
        {/* <div style={{ display: 'flex', marginBottom: '40px', width: '100%' }}>
        <Form.Control
          onChange={handleChange}
          type='text'
          placeholder='Search Your Campgrounds!'
        />
        <Button variant='dark'>Search</Button>{' '}
      </div> */}
        <div className='card-window'>
          {campgrounds.map((campground, idx) => (
            <div key={idx} className='campgrounds-list'>
              <div className='campground-img'>
                <Card.Img src={campground.photo} />
              </div>
              <div className='campground-text'>
                <Card.Body>
                  <Card.Title style={{ fontSize: '35px' }}>
                    {campground.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: '22px',
                      wordBreak: 'break-all',
                    }}
                  >
                    {campground.body}
                  </Card.Text>
                  <Card.Text
                    style={{
                      fontSize: '25px',
                      color: 'gray',
                    }}
                  >
                    📍{campground.location}
                  </Card.Text>
                  <Link to={`/campgrounds/${campground.id}`}>
                    <Button className='detail-button' variant='dark'>
                      View {campground.name}
                    </Button>
                  </Link>
                </Card.Body>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Styles>
  );
}

export default Campgrounds;
