import React, { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup, Row, Col, Card } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar';

function Campgrounds({ loggedIn }) {
  const [campgrounds, setCampgrounds] = useState([]);
  const [error, setError] = useState(false);

  // function handleChange(event) {
  //   // setSearchString(event.target.value());
  //   console.log(event.target.value);
  // }

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
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Search and View Our Campgrounds
      </h1>
      {loggedIn ? (
        <Link to='/campgrounds/new'>
          <Button className='mb-4'>Add a campground</Button>
        </Link>
      ) : (
        <Link to='/login'>
          <Button
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

      <SearchBar data={campgrounds} />
      {/* <div style={{ display: 'flex', marginBottom: '40px', width: '100%' }}>
        <Form.Control
          onChange={handleChange}
          type='text'
          placeholder='Search Your Campgrounds!'
        />
        <Button variant='dark'>Search</Button>{' '}
      </div> */}

      <div>
        {campgrounds.map((campground, idx) => (
          <Card key={idx} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Card.Img
                  variant='left'
                  src={campground.photo}
                  style={{ width: '100%' }}
                />
              </div>
              <Card.Text>
                <Card.Body style={{ marginLeft: '30px' }}>
                  <Card.Title style={{ fontSize: '40px' }}>
                    {campground.name}
                  </Card.Title>
                  <Card.Text>
                    <Card.Text>
                      <Card.Text>{campground.body}</Card.Text>
                      <Card.Text>Location</Card.Text>
                      <Link to={`/campgrounds/${campground.id}`}>
                        <Button variant='dark'>View {campground.name}</Button>
                      </Link>
                    </Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card.Text>
            </div>
          </Card>
        ))}
        ;
        {/* {postings.map((posting, idx) => {
          <Card style={{ width: '18rem' }}>
            <Card.Img variant={posting.photo} src='holder.js/100px180' />
            <Card.Body>
              <Card.Title>{posting.title}</Card.Title>
              <Card.Text>
                <div style={{ marginLeft: '30px' }}>
                  <h3>{posting.body}</h3>
                  <p>Location</p>
                  <Link to={`/campgrounds/${posting.id}`}>
                    <Button variant='dark'>View {posting.title}</Button>{' '}
                  </Link>
                </div>
              </Card.Text>
              <Button variant='primary'>Go somewhere</Button>
            </Card.Body>
          </Card>;
        })} */}
      </div>
      {/* <ListGroup variant='flush'>
        {postings.map((posting, idx) => (
          <Col key={posting.id}>
            <ListGroup.Item style={{ display: 'flex', marginBottom: '30px' }}>
              <img
                src={posting.photo}
                alt='campgroundImg'
                style={{ width: '35%', margin: '0', padding: '0' }}
              />
              <div style={{ marginLeft: '30px' }}>
                <h1>{posting.title}</h1>
                <h3>{posting.body}</h3>
                <p>Location</p>
                <Link to={`/campgrounds/${posting.id}`}>
                  <Button variant='dark'>View {posting.title}</Button>{' '}
                </Link>
              </div>
            </ListGroup.Item>
          </Col>
        ))}
      </ListGroup> */}
    </>
  );
}

export default Campgrounds;
