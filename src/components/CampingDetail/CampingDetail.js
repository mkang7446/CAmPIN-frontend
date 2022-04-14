import { React, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';

// import styled from 'styled-components';
import {
  Button,
  ListGroup,
  Card,
  Row,
  Container,
  CardGroup,
  Form,
  Alert,
} from 'react-bootstrap';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
import StarRating from '../StarRating/StarRating';

function CampingDetail({ userInfo, loggedIn }) {
  const initialState = {
    body: '',
    author: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  const { id } = useParams();
  const { campgroundId, reviewId } = useParams();
  const campground = useCampgroundDetail(id);

  const handleCampgroundDelete = async (event) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      try {
        const response = await fetch(API_URL + `campgrounds/${id}`, {
          method: 'DELETE',
          headers: {
            AUthorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 204) {
          navigate('/campgrounds');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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

  if (!campground) {
    return null;
  }

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = { ...formData, campground_id: id };
    console.log(data);
    try {
      const response = await fetch(API_URL + 'reviews/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 201) {
        const data = await response.json();
        window.alert('review posted!');
        navigate(`/campgrounds/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <CardGroup
        style={{
          marginTop: '20px',
          gap: '40px',
          marginLeft: '100px',
          marginRight: '100px',
        }}
      >
        <Card>
          <Card.Img
            className='campground-photo'
            variant='top'
            src={campground.photo}
          />
          <Card.Body>
            <Card.Title>{campground.name}</Card.Title>
            <Card.Text>{campground.body}</Card.Text>
          </Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              Posted by: {campground.owner} - {campground.date.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>📍{campground.location}</ListGroup.Item>
            <ListGroup.Item>Price</ListGroup.Item>
            <ListGroup.Item>
              {' '}
              {userInfo && userInfo.username === campground.owner && (
                <div>
                  <Link
                    to={`/campgrounds/${campground.id}/edit`}
                    className='btn btn-secondary'
                  >
                    Edit
                  </Link>
                  <Button onClick={handleCampgroundDelete} variant='danger'>
                    Delete
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
          {/* <Card.Footer>
            {userInfo && userInfo.username === campground.owner && (
              <div>
                <Link
                  to={`/campgrounds/${campground.id}/edit`}
                  className='btn btn-secondary'
                >
                  Edit
                </Link>
                <Button onClick={handleCampgroundDelete} variant='danger'>
                  Delete
                </Button>
              </div>
            )}
          </Card.Footer> */}
        </Card>
        <Card style={{ border: 'none' }}>
          <Card.Title>
            <h1 style={{ marginLeft: '20px' }}>Leave a Review!</h1>
          </Card.Title>
          <Card.Body>
            <StarRating />
            {/* ###############  ###############  ###############  ############### */}
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
              {/* <Button className='mt-4' type='submit' disabled={error}>
                Submit
              </Button> */}
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
            {/* ###############  ###############  ###############  ############### */}
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

                      // <Container
                      //   className='m-4 p-5 border rounded-3 bg-light'
                      //   // key={review.id}
                      // >
                      //   <p>{review.body}</p>
                      //   <p>
                      //     Posted by: {review.owner} at
                      //     {review.date}
                      //   </p>

                      //   {userInfo && userInfo.username === review.owner && (
                      //     <div>
                      //       <Button variant='secondary' className='m-4'>
                      //         Edit
                      //       </Button>
                      //       <Button onClick={handleReviewDelete} variant='danger'>
                      //         Delete
                      //       </Button>
                      //     </div>
                      //   )}
                      // </Container>
                    );
                  })}
            </ListGroup>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default CampingDetail;
