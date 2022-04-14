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
} from 'react-bootstrap';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
import StarRating from '../StarRating/StarRating';

// const Styles = styled.div`
//   .review_container {
//     margin-top: 50px;
//     margin-left: 50px;
//     display: flex;
//     justify-content: space-between;
//   }

//   #detail_cards {
//     background-color: aqua;
//     margin-left: 70px;
//   }

//   .campground-photo {
//     margin-top: 30px;
//   }

//   .detail_header {
//     display: flex;
//     justify-content: space-between;
//     margin-top: 10px;
//   }

//   .mapCard {
//     width: 250px;
//     height: 400px;
//   }

//   .reviewCard {
//     width: auto;
//     max-width: 800px;
//     margin-bottom: 100px;
//   }
// `;

function CampingDetail({ userInfo, loggedIn }) {
  let navigate = useNavigate();
  const { id } = useParams();
  const campground = useCampgroundDetail(id);

  const handleDelete = async (event) => {
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

  if (!campground) {
    return null;
  }

  return (
    // <Styles>
    <div>
      <CardGroup>
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
          </ListGroup>
          <Card.Footer>
            {userInfo && userInfo.username === campground.owner && (
              <div>
                <Link
                  to={`/campgrounds/${campground.id}/edit`}
                  className='btn btn-secondary'
                >
                  Edit
                </Link>
                <Button onClick={handleDelete} variant='danger'>
                  Delete
                </Button>
              </div>
            )}
          </Card.Footer>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Leave a Review!</Card.Title>
            <StarRating />
            <Card.Text>Review</Card.Text>
            {/* ###############  ###############  ###############  ############### */}
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Body</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Form>
            {/* ###############  ###############  ###############  ############### */}
          </Card.Body>
          <Card.Footer>
            <small className='text-muted'>Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <Container className='review_container'>
        <Row xs={1} md={3} className='g-5'>
          <Card id='detail_cards' className='mapCard'>
            {userInfo && userInfo.username === campground.owner && (
              <div>
                <Link
                  to={`/campgrounds/${campground.id}/edit`}
                  className='btn btn-secondary'
                >
                  Edit
                </Link>
                <Button onClick={handleDelete} variant='danger'>
                  Delete
                </Button>
              </div>
            )}
          </Card>
          <Card id='detail_cards' className='reviewCard'>
            <div className='detail_header'>
              <div>
                <h1>{campground.title}</h1>
              </div>
              <div>
                <h3>posted by '{campground.owner}'</h3>
                <h5>{campground.date}</h5>
              </div>
            </div>
            <Card.Img
              className='campground-photo'
              variant='top'
              src={campground.photo}
            />
            <Card.Body>
              <Card.Text>{campground.body}</Card.Text>
              <Card>
                <Card.Header>
                  <h2>reviews</h2>
                  {!campground.reviews.length && <p>No reviews yet!</p>}
                  <StarRating />
                  {loggedIn && (
                    <Link to={`/campgrounds/${campground.id}/reviews/new`}>
                      <Button className='mb-5'>Write a review</Button>
                    </Link>
                  )}
                  {campground.reviews.length > 0 &&
                    campground.reviews.map((review) => {
                      console.log(review);
                      console.log(review.owner);
                      return (
                        <Container
                          className='m-4 p-5 border rounded-3 bg-light'
                          // key={review.id}
                        >
                          <p>{review.body}</p>
                          <p>
                            Posted by: {review.owner} at
                            {review.date}
                          </p>

                          {userInfo && userInfo.username === review.owner && (
                            <div>
                              <Button variant='secondary' className='m-4'>
                                Edit
                              </Button>
                              <Button variant='danger'>Delete</Button>
                            </div>
                          )}
                        </Container>
                      );
                    })}
                </Card.Header>

                <ListGroup variant='flush'>
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
              </Card>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
    // </Styles>
  );
}

export default CampingDetail;
