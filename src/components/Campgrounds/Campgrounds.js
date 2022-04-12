import React, { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup, Row, Col, Card } from 'react-bootstrap';
import SearchBar from '../searchBar/SearchBar';

function Campgrounds(props) {
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState(false);

  // function handleChange(event) {
  //   // setSearchString(event.target.value());
  //   console.log(event.target.value);
  // }

  const getPostingList = async () => {
    try {
      setError(false);

      const response = await fetch(API_URL + 'posts');
      if (response.status === 200) {
        const data = await response.json();
        setPostings(data);
      }
    } catch (error) {
      setError(true);
    }
    return;
  };

  useEffect(() => {
    getPostingList();
  }, []);

  if (!error && !postings.length) {
    return null;
  }

  if (error && !postings.length) {
    return <div>Oops, something went wrong! Please try again later!</div>;
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
        Search and View Our Campgrounds
      </h1>
      <SearchBar data={postings} />
      {/* <div style={{ display: 'flex', marginBottom: '40px', width: '100%' }}>
        <Form.Control
          onChange={handleChange}
          type='text'
          placeholder='Search Your Campgrounds!'
        />
        <Button variant='dark'>Search</Button>{' '}
      </div> */}

      <div>
        {postings.map((posting, idx) => (
          <Card key={idx} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '33%' }}>
                <Card.Img
                  variant='left'
                  src={posting.photo}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <Card.Body style={{ marginLeft: '30px' }}>
                  <Card.Title style={{ fontSize: '40px' }}>
                    {posting.title}
                  </Card.Title>
                  <Card.Text>
                    <div>
                      <div>{posting.body}</div>
                      <div>Location</div>
                      <Link to={`/campgrounds/${posting.id}`}>
                        <Button variant='dark'>View {posting.title}</Button>
                      </Link>
                    </div>
                  </Card.Text>
                </Card.Body>
              </div>
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
