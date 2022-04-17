import React, { useState, useEffect } from 'react';

import Map from '../Map/Map';
import styled from 'styled-components';
import API_URL from '../../apiConfig';

import { Container, Row, Col, Card } from 'react-bootstrap';

const Styles = styled.div`
  .myCampin-container {
    display: flex;
  }
  @media only screen and (max-width: 1000px) {
    .myCampin-container {
      display: grid;
    }
  }

  .mySites {
    width: 30%;
    margin-left: 30px;
    margin-top: 50px;
  }
`;

function MyCampin({ loggedIn }) {
  // const [mycampin, setMycampin] = useState([]);
  // const [error, setError] = useState(false);

  // const getMycampinList = async () => {
  //   try {
  //     setError(false);

  //     const response = await fetch(API_URL + 'mycampins');
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setMycampin(data);
  //     }
  //   } catch (error) {
  //     setError(true);
  //   }
  //   return;
  // };

  // useEffect(() => {
  //   getMycampinList();
  // }, []);

  // if (!error && !mycampin.length) {
  //   return null;
  // }

  // if (error && !mycampin.length) {
  //   return <div>Oops, something went wrong! Please try again later!</div>;
  // }

  return (
    <>
      <h1>
        Campgrounds{'  '}
        <span role='img' aria-label='tent'>
          ⛺️
        </span>
      </h1>
      <Map />
    </>
    // <Styles>
    //   <div className='myCampin-container'>
    //     {' '}
    //     <div className='myCampin-map'>

    // </div>
    //   <div className='mySites'>
    //     <Card>
    //       <Card.Body>My Sites</Card.Body>
    //     </Card>
    //     {mycampin.map((mycampin, idx) => (
    //       <Card>
    //         <Card.Body>{mycampin.body}</Card.Body>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
    // </Styles>
  );
}

export default MyCampin;
