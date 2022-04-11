import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import headerImage from '../../assets/imgForJumbo.jpeg';

const Styles = styled.div`
  .headerImage {
    height: 300px;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

function Jumbotron(props) {
  return (
    <Styles>
      <Container>
        <img className='headerImage' src={headerImage} alt='headerImage' />
        <p>hello from jumbotron</p>
      </Container>
    </Styles>
  );
}

export default Jumbotron;
