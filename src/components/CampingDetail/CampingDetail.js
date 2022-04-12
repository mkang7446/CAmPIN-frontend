import { React, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';
import styled from 'styled-components';
import {
  ListGroup,
  Card,
  Col,
  Row,
  Container,
  Image,
  Button,
} from 'react-bootstrap';
import useCampgroundDetail from '../hooks/useCampgroundDetail';

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

function CampingDetail(props) {
  // let navigate = useNavigate();
  const { id } = useParams();
  // const campground = useCampgroundDetail(id);
  const [campground, setCampground] = useState([null]);

  // const handleDelete = async (event) => {

  //   const confirm = window.confirm('Are you sure you want to delete?');
  //   if (confirm) {
  //     try {
  //       const response = await fetch(API_URL + `campgrounds/${id}`, {
  //         method: 'DELETE',
  //         headers: {
  //           AUthorization: `Token ${localStorage.getItem('token')}`,
  //         },
  //       });

  //       if (response.status === 204) {
  //         navigate('/campgrounds');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // if (!campground) {
  //   return null;
  // }

  const getCampgroundDetail = async () => {
    try {
      const response = await fetch(API_URL + `posts/${id}`);
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

  return (
    <Styles>
      <Container className='review_container'>
        <Row xs={1} md={3} className='g-5'>
          <Card id='detail_cards' className='mapCard'>
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
                    <h2>Comments</h2>
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
