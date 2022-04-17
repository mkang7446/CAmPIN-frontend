import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';

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
    <>
      {loggedIn ? (
        <Link to='/posts/new'>
          <Button id='jumbo-button' variant='dark' className='mb-4'>
            Add a Post
          </Button>
        </Link>
      ) : (
        <Link to='/login'>
          <Button
            id='jumbo-button'
            onClick={() => {
              alert('Login required for this service!');
            }}
            // onClick={alert('Login required for this service!')}
            className='mb-4'
          >
            Add a Post
          </Button>
        </Link>
      )}
      <div>
        {posts.map((post, idx) => (
          <Card key={idx} style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '15%' }}>
                <Card.Img
                  variant='left'
                  src={post.photo}
                  style={{ width: '100%' }}
                />
              </div>
              <Card.Text>
                <Card.Body style={{ marginLeft: '30px' }}>
                  <Card.Title style={{ fontSize: '40px' }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text>
                    <Card.Text>
                      <Card.Text>{post.body}</Card.Text>
                      <Card.Text>{post.date}</Card.Text>
                      <Link to={`/posts/${post.id}`}>
                        <Button variant='dark'>View Detail</Button>
                      </Link>
                    </Card.Text>
                  </Card.Text>
                </Card.Body>
              </Card.Text>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Community;
