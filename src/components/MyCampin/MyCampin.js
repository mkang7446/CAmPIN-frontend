import React from 'react';

import Map from '../Map/Map';

import { Card } from 'react-bootstrap';

function MyCampin({ userInfo, loggedIn }) {
  return (
    <>
      <Card
        className='bg-dark text-white'
        style={{
          maxHeight: '200px',
          overflow: 'hidden',
        }}
      >
        <Card.Img
          src='https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?cs=srgb&dl=pexels-catarina-sousa-68704.jpg&fm=jpg'
          alt='Card image'
          style={{
            maxHeight: 'initial',
            marginTop: '-9.5%',
          }}
        />
        <Card.ImgOverlay style={{ textAlign: 'center' }}>
          <Card.Title
            style={{
              fontSize: '33px',
              color: '#001219',
              marginTop: '30px',
              fontWeight: '600',
            }}
          >
            <p>Search a campground where you've been and add to your log.</p>{' '}
            <p>You can also click and place pin on the map.</p>
          </Card.Title>
        </Card.ImgOverlay>
      </Card>

      <Map userInfo={userInfo} loggedIn={loggedIn} />
    </>
  );
}

export default MyCampin;
