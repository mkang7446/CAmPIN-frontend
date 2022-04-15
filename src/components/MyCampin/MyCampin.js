import React from 'react';
import Map from '../Map/Map';
import styled from 'styled-components';

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

function MyCampin(props) {
  return (
    <Styles>
      <div className='myCampin-container'>
        {' '}
        <div className='myCampin-map'>
          <Map />
        </div>
        <div className='mySites'>
          <Card>
            <Card.Body>My Sites</Card.Body>
          </Card>
        </div>
      </div>
    </Styles>
  );
}

export default MyCampin;
