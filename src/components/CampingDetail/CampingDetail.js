import { React, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import styled from 'styled-components';
import { Button, ListGroup, Card, Row, Container } from 'react-bootstrap';
import useCampgroundDetail from '../hooks/useCampgroundDetail';
// import Map from '../Map/Map';

const Styles = styled.div`
  .review_container {
    margin-top: 50px;
    margin-left: 50px;
    display: flex;
    justify-content: space-between;
  }

  #detail_cards {
    background-color: aqua;
    margin-left: 70px;
  }

  .campground-photo {
    margin-top: 30px;
  }

  .detail_header {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .mapCard {
    width: 250px;
    height: 400px;
  }

  .reviewCard {
    width: auto;
    max-width: 800px;
    margin-bottom: 100px;
  }
`;

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
    <Styles>
      {/* <Map /> */}
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
            map
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
              <Card.Text>
                <p>{campground.body}</p>
                <Card>
                  <Card.Header>
                    <h2>reviews</h2>
                  </Card.Header>

                  <ListGroup variant='flush'>
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                  </ListGroup>
                </Card>
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Styles>
  );
}

export default CampingDetail;
