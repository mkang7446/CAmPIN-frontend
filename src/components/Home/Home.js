import React, { useState, useEffect } from 'react';
import API_URL from '../../apiConfig';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Carousel } from 'react-bootstrap';
import headerImage from '../../assets/imgForJumbo.jpeg';
import lakeSaraIL from '../../assets/lakeSaraIL.jpeg';
import tent from '../../assets/tent.jpg';
import campFire from '../../assets/campFire.jpg';
import styled from 'styled-components';
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';

const Styles = styled.div`
  .headerImage {
    height: 200px;
  }
  #slideImg {
    height: 800px;
  }
  h3 {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

function Home() {
  return (
    <>
      <Styles>
        {/* <Card className='bg-dark text-white'>
          <Card.Img
            className='headerImage'
            src={headerImage}
            alt='headerImage'
          />
          <Card.ImgOverlay>
            <Card.Title>Welcome</Card.Title>
            <Card.Text>
              review campgrounds and communicate with campers!
            </Card.Text>
          </Card.ImgOverlay>
        </Card> */}

        <Carousel>
          <Carousel.Item interval={3000}>
            <img
              id='slideImg'
              className='d-block w-100'
              src={lakeSaraIL}
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              <Link to='/campgrounds'>
                <button>See all camprounds reviews</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={3000}>
            <img
              id='slideImg'
              className='d-block w-100'
              src={tent}
              alt='Second slide'
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <Link to='/campgrounds'>
                <button>See all camprounds reviews</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              id='slideImg'
              className='d-block w-100'
              src={campFire}
              alt='Third slide'
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
              <Link to='/campgrounds'>
                <button>See all camprounds reviews</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Styles>
    </>
  );
}

export default Home;
