import React from 'react';

import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import lake from '../../assets/lake.jpg';
import tent from '../../assets/tent.jpg';
import night from '../../assets/night.jpg';
import styled from 'styled-components';

const Styles = styled.div`
  button {
    font-size: 16px;
    letter-spacing: 2px;
    font-weight: 400 !important;
    background-color: rgb(83, 73, 74);
    color: #fff;
    padding: 23px 50px;
    margin: auto;
    text-align: center;
    display: inline-block !important;
    text-decoration: none;
    border: 0px;
    width: max-content;
    cursor: pointer;
    transition: all 0.3s 0s ease-in-out;
    margin-top: 30px;
  }

  button:hover {
    transform: scale(1.04, 1);
    background-color: rgb(163, 157, 158);
    text-decoration: none;
  }

  img {
    height: 900px;
  }

  h1 {
    font-size: 70px;
    margin-bottom: 30px;
  }
`;

function Home() {
  return (
    <Styles>
      <Carousel fade>
        <Carousel.Item>
          <img className='d-block w-100' src={tent} alt='First slide' />
          <Carousel.Caption style={{ marginBottom: '420px' }}>
            <h1>Welcome to CamPIN</h1>
            <h2>Check out other camper's favorite campsite or share yours.</h2>
            <Link to='/campgrounds'>
              <button>See All Campgrounds</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={night} alt='Second slide' />

          <Carousel.Caption style={{ marginBottom: '420px' }}>
            <h1>Welcome to CamPIN</h1>
            <h2>Check out other camper's favorite campsite or share yours.</h2>
            <Link to='/campgrounds'>
              <button>See All Campgrounds</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={lake} alt='Third slide' />

          <Carousel.Caption style={{ marginBottom: '420px' }}>
            <h1 style={{ color: 'black' }}>Welcome to CamPIN</h1>
            <h2 style={{ color: 'black' }}>
              Check out other camper's favorite campsite or share yours.
            </h2>
            <Link to='/campgrounds'>
              <button>See All Campgrounds</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Styles>
  );
}

export default Home;
