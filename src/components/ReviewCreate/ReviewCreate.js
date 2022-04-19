import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import StarRating from '../StarRating/StarRating';
import useCampgroundDetail from '../hooks/useCampgroundDetail';

import { Button, ListGroup, Card, Form, Alert } from 'react-bootstrap';

function ReviewCreate(userInfo, loggedIn) {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialState = {
    body: '',
    author: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);

  const { reviewId } = useParams();
  const campground = useCampgroundDetail(id);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { ...formData, campground_id: id };
    try {
      const response = await fetch(API_URL + 'reviews/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        const data = await response.json();
        window.alert('review posted!');
        navigate(`/campgrounds/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleReviewDelete = async (event) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      try {
        const response = await fetch(API_URL + `reviews/${reviewId}`, {
          method: 'DELETE',
          headers: {
            AUthorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 204) {
          navigate(`/campgrounds/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Card style={{ border: 'none' }}>
      <Card.Title>
        <h1 style={{ marginLeft: '20px' }}>Leave a Review!</h1>
      </Card.Title>
      <Card.Body>
        <StarRating />
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='body'>
            <Form.Label style={{ marginTop: '30px' }}>
              <h2>Review</h2>
            </Form.Label>
            <Form.Control
              required
              as='textarea'
              rows={5}
              value={formData.body}
              onChange={handleChange}
              name='body'
            />
          </Form.Group>
          <Form.Group
            className='mb-3'
            controlId='formBasicCheckbox'
          ></Form.Group>
          {loggedIn && (
            <Button type='submit' className='mb-5'>
              Submit
            </Button>
          )}
          {!campground.reviews.length && <p>No reviews yet!</p>}
          {error && (
            <Alert variant='danger'>
              Oops, something went wrong! Please try again!
            </Alert>
          )}
        </Form>
        <ListGroup variant='flush'>
          {campground.reviews.length > 0 &&
            campground.reviews
              .slice(0)
              .reverse()
              .map((review) => {
                return (
                  <ListGroup.Item
                    style={{
                      marginTop: '25px',
                      border: '1px solid #D4D2CF',
                      borderRadius: '10px',
                    }}
                  >
                    <Card.Text>
                      <div>
                        <h2 style={{ margin: '2px', marginBottom: '15px' }}>
                          {review.owner}{' '}
                          <span
                            style={{
                              marginLeft: '320px',
                              fontSize: '25px',
                            }}
                          >
                            {review.date.slice(0, 10)}
                          </span>{' '}
                        </h2>
                      </div>
                      <StarRating />

                      <h3
                        style={{
                          margin: '2px',
                          marginTop: '15px',
                          marginBottom: '15px',
                        }}
                      >
                        {review.body}
                      </h3>
                      <Button onClick={handleReviewDelete} variant='danger'>
                        Delete
                      </Button>
                    </Card.Text>
                  </ListGroup.Item>
                );
              })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default ReviewCreate;
