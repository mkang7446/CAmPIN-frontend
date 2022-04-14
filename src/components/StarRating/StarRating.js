import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import styled from 'styled-components';

const Styles = styled.div`
  input[type='radio'] {
    display: none;
  }
  .star {
    cursor: pointer;
    transition: color 200ms;
  }
`;

function StarRating({ rating, getRating }) {
  //   const [rating, setRating] = useState(null);
  console.log(rating);
  const [hover, setHover] = useState(null);

  const sendRating = (v) => {
    getRating(v);
  };

  return (
    <Styles>
      <div>
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;

          return (
            <label>
              <input
                type='radio'
                name='rating'
                value={ratingValue}
                // onClick={() => setRating(ratingValue)}
                onClick={() => sendRating(ratingValue)}
              />
              <FaStar
                className='star'
                color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </Styles>
  );
}

export default StarRating;
