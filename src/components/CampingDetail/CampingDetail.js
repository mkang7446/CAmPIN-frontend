import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
import StarRating from '../StarRating/StarRating';
import { FaStar } from 'react-icons/fa';

import {
  Button,
  ListGroup,
  Card,
  CardGroup,
  Form,
  Alert,
} from 'react-bootstrap';

function CampingDetail({ userInfo, loggedIn }) {
  const { id } = useParams();
  let navigate = useNavigate();

  const [campground, setCampground] = useState(null);

  const getCampgroundDetail = async () => {
    try {
      const response = await fetch(API_URL + `campgrounds/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setCampground(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCampgroundDetail();
  }, []);

  const [rating, setRating] = useState(null);
  const getRating = (rating) => {
    setRating(rating);
  };
  console.log(rating);

  const initialState = {
    body: '',
    rating: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);

  const { campgroundId, reviewId } = useParams();
  // const campground = useCampgroundDetail(id);

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

  const handleReviewDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      try {
        // const response = await fetch(API_URL + `reviews/${reviewId}`, {
        const response = await fetch(API_URL + `reviews/${id}`, {
          method: 'DELETE',
          headers: {
            AUthorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 204) {
          // window.alert('review deleted!');
          getCampgroundDetail();
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
    const data = { ...formData, campground_id: id, rating };
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
        // window.alert('review posted!');
        getCampgroundDetail();
        navigate(`/campgrounds/${id}`);
        setRating(null);
        setFormData(initialState);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <CardGroup
        style={{
          marginTop: '30px',
          gap: '40px',
          marginLeft: '150px',
          marginRight: '150px',
        }}
      >
        <Card
          style={{
            height: '70%',
          }}
        >
          <Card.Img
            className='campground-photo'
            variant='top'
            src={campground.photo}
            // style={{ width: '80%' }}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: '35px', marginBottom: '20px' }}>
              {campground.name}
            </Card.Title>
            <Card.Text style={{ fontSize: '20px', marginBottom: '20px' }}>
              {campground.body}
            </Card.Text>
          </Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item
              style={{ fontSize: '15px', margin: '10px', color: 'gray' }}
            >
              📍{campground.location}
            </ListGroup.Item>
            <ListGroup.Item>
              Posted by: {campground.owner} - {campground.date.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              {userInfo && userInfo.username === campground.owner ? (
                <div>
                  <Link to={`/campgrounds/${campground.id}/edit`}>
                    <Button variant='dark' style={{ marginRight: '20px' }}>
                      Edit Campground
                    </Button>
                  </Link>
                  <Button onClick={handleCampgroundDelete} variant='danger'>
                    Delete Campground
                  </Button>
                </div>
              ) : userInfo && userInfo.username !== campground.owner ? (
                <div>
                  <Button
                    onClick={() => alert('A writer can only edit this post!')}
                    variant='dark'
                    style={{ marginRight: '20px' }}
                  >
                    Edit Campground
                  </Button>
                  <Button
                    onClick={() => alert('A writer can only delete this post!')}
                    variant='danger'
                  >
                    Delete Campground
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => alert('Login required for this service!')}
                    variant='dark'
                    style={{ marginRight: '20px' }}
                  >
                    Edit Campground
                  </Button>
                  <Button
                    onClick={() => alert('Login required for this service!')}
                    variant='danger'
                  >
                    Delete Campground
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Card style={{ border: 'none' }}>
          <Card.Title>
            <h1 style={{ marginLeft: '20px' }}>Leave a Review!</h1>
          </Card.Title>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='body'>
                <Form.Label style={{ marginTop: '10px', marginBottom: '30px' }}>
                  <StarRating rating={rating} getRating={getRating} />
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
              {loggedIn ? (
                <Button type='submit' className='mb-5'>
                  Submit
                </Button>
              ) : (
                <Link to='/login'>
                  <Button
                    type='submit'
                    className='mb-5'
                    onClick={() => {
                      alert('Login required for this service!');
                    }}
                  >
                    Submit
                  </Button>
                </Link>
              )}
              {!campground.reviews.length && (
                <p style={{ fontSize: '30px' }}> No reviews yet!</p>
              )}
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
                          marginBottom: '15px',
                          border: '1px solid #D4D2CF',
                          borderRadius: '10px',
                        }}
                      >
                        <Card.Text>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            <h4
                              style={{
                                margin: '2px',
                                marginBottom: '15px',
                                fontSize: '28px',
                              }}
                            >
                              {review.owner}{' '}
                            </h4>
                            <span
                              style={{
                                marginLeft: '320px',
                                fontSize: '20px',
                                fontWeight: 'normal',
                              }}
                            >
                              {review.date.slice(0, 10)}
                            </span>{' '}
                          </div>
                          {review.length === 0 && <div>''</div>}
                          {review.rating === 1 && (
                            <div>
                              <FaStar size={50} color={'#ffc107'} />
                            </div>
                          )}
                          {review.rating === 2 && (
                            <div>
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                            </div>
                          )}
                          {review.rating === 3 && (
                            <div>
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                            </div>
                          )}
                          {review.rating === 4 && (
                            <div>
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                            </div>
                          )}
                          {review.rating === 5 && (
                            <div>
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                              <FaStar size={50} color={'#ffc107'} />
                            </div>
                          )}

                          <p
                            style={{
                              margin: '2px',
                              marginTop: '15px',
                              marginBottom: '15px',
                              fontSize: '20px',
                            }}
                          >
                            {review.body}
                          </p>
                          {userInfo && userInfo.username === review.owner && (
                            <Button
                              onClick={
                                () => handleReviewDelete(review.id)
                                // handleReviewDelete
                              }
                              variant='danger'
                            >
                              Delete
                            </Button>
                          )}
                        </Card.Text>
                      </ListGroup.Item>
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
