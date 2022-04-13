import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';

function Community(props) {
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
    <div>
      <Link to='/community'>
        <button>All</button>
      </Link>
      <Link to='/talktalk'>
        <button>Talk Talk</button>
      </Link>

      <Link to='/market'>
        <button>Market</button>
      </Link>

      <Link to='/tips'>
        <button>Tips</button>
      </Link>

      <Link to='/qna'>
        <button>Q＆A</button>
      </Link>

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
    </div>
  );
}

export default Community;
