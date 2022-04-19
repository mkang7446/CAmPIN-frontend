import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API_URL from '../../apiConfig';

import { Row, Col, Button, ListGroup, Card } from 'react-bootstrap';

function CommunityDetail({ userInfo, loggedIn }) {
  const { id } = useParams();
  let navigate = useNavigate();

  const [community, setCommunity] = useState(null);

  const getCommunityDetail = async () => {
    try {
      const response = await fetch(API_URL + `posts/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setCommunity(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommunityDetail();
  }, []);

  const handleCommunityDelete = async (event) => {
    const confirm = window.confirm('Are you sure you want to delete?');
    if (confirm) {
      try {
        const response = await fetch(API_URL + `posts/${id}`, {
          method: 'DELETE',
          headers: {
            AUthorization: `Token ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 204) {
          navigate('/community');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!community) {
    return null;
  }

  return (
    <Row
      style={{
        marginTop: '30px',
        gap: '10px',
        marginLeft: '100px',
        marginRight: '100px',
      }}
    >
      <Col style={{ maxWidth: '50%' }}>
        <Card>
          <Card.Img
            className='campground-photo'
            variant='top'
            src={community.photo}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: '27px', fontWeight: '700' }}>
              {community.name}
            </Card.Title>
            <Card.Text style={{ fontSize: '20px', lineHeight: '1.6rem' }}>
              {community.body}
            </Card.Text>
          </Card.Body>
          <ListGroup variant='flush'>
            <ListGroup.Item
              style={{
                fontSize: '20px',
                color: 'gray',
              }}
            >
              📍 {community.location}
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                fontSize: '17px',
              }}
            >
              Posted by:{' '}
              <span style={{ color: 'white', fontSize: '3px' }}>-_-</span>
              <span style={{ fontSize: '30px', fontWeight: '700' }}>
                {community.owner}
                {''}
              </span>
              <span style={{ color: 'white', fontSize: '7px' }}>-_-</span>on{' '}
              <span style={{ color: 'white', fontSize: '1px' }}>-_-</span>
              {community.date.slice(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>
              {' '}
              {userInfo && userInfo.username === community.owner ? (
                <div>
                  <Link to={`/community/${community.id}/edit`}>
                    <Button variant='dark' style={{ marginRight: '20px' }}>
                      Edit Community
                    </Button>
                  </Link>
                  <Button onClick={handleCommunityDelete} variant='danger'>
                    Delete Community
                  </Button>
                </div>
              ) : userInfo && userInfo.username !== community.owner ? (
                <div>
                  <Button
                    onClick={() => alert('A writer can only edit this post!')}
                    variant='dark'
                    style={{ marginRight: '20px' }}
                  >
                    Edit Community
                  </Button>
                  <Button
                    onClick={() => alert('A writer can only delete this post!')}
                    variant='danger'
                  >
                    Delete Community
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={() => alert('Login required for this service!')}
                    variant='dark'
                    style={{ marginRight: '20px' }}
                  >
                    Edit Community
                  </Button>
                  <Button
                    onClick={() => alert('Login required for this service!')}
                    variant='danger'
                  >
                    Delete Community
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CommunityDetail;
