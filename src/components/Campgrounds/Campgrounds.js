import React, { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';

function Campgrounds(props) {
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState(false);

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
    <main>
      <Row xs={1} md={3} className='g-5'>
        {postings.map((posting, idx) => (
          <Col key={posting.id}>
            <Link to={`/campgrounds/${posting.id}`}>
              <Card>
                <Card.Img variant='top' src={posting.photo} />
                <Card.Body>
                  <Card.Title>{posting.title}</Card.Title>
                  <Card.Text>{posting.body}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </main>
  );
}

export default Campgrounds;
