import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Styles = styled.div`
  #post-button {
    margin-top: 30px;
    background-color: #222222;
    border: 1px solid #222222;
    border-radius: 8px;
    color: #ffffff;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-bottom: 40px;
    font-weight: 600;
    width: 40vh;
  }
`;

function Community({ loggedIn }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const getPostsList = async () => {
    try {
      setError(false);

      const response = await fetch(API_URL + 'posts');
      if (response.status === 200) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      setError(true);
    }
    return;
  };

  useEffect(() => {
    getPostsList();
  }, []);

  if (!error && !posts.length) {
    return null;
  }

  if (error && !posts.length) {
    return <div>Oops, something went wrong! Please try again later!</div>;
  }

  return (
    <Styles>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          {loggedIn ? (
            <Link to='/posts/new'>
              <Button id='post-button' variant='dark' className='mb-4'>
                Add a Post
              </Button>
            </Link>
          ) : (
            <Link to='/login'>
              <Button
                id='post-button'
                onClick={() => {
                  alert('Login required for this service!');
                }}
                className='mb-4'
              >
                Add a Post
              </Button>
            </Link>
          )}
        </div>

        <div>
          {posts.map((post, idx) => (
            <Card key={idx}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '15%' }}>
                  <Card.Img
                    variant='left'
                    src={post.photo}
                    style={{ width: '75%' }}
                  />
                </div>
                <Card.Body style={{ marginLeft: '10px' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <Card.Title style={{ fontSize: '30px' }}>
                        {post.title}
                      </Card.Title>
                    </div>
                    <div>
                      <Card.Text style={{ fontSize: '25px' }}>
                        {post.category}
                      </Card.Text>
                    </div>
                  </div>
                  <Link to={`/posts/${post.id}`}>
                    <Button style={{ marginTop: '17px' }} variant='dark'>
                      View Detail
                    </Button>
                  </Link>
                </Card.Body>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Styles>
  );
}

export default Community;
