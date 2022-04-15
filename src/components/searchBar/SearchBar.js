import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button } from 'react-bootstrap';

const Styles = styled.div`
  .search-title {
    font-size: 55px;
    margin: 20px;
  }
  .search-form {
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  }
  .search-bar {
    display: flex;
    width: 85%;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 10px;
  }

  Button {
    background-color: #ffffff;
    border: 1px solid #222222;
    border-radius: 5px;
    box-sizing: border-box;
    color: #222222;
    cursor: pointer;
    display: inline-block;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto,
      'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 10px;
    margin: 0;
    outline: none;
    padding: 13px 23px;
    position: relative;
    text-align: center;
    text-decoration: none;
    touch-action: manipulation;
    transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
      transform 0.1s;
    user-select: none;
    -webkit-user-select: none;
    width: auto;
  }

  Button:focus-visible {
    box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
    transition: box-shadow 0.2s;
  }

  Button:active {
    background-color: #f7f7f7;
    border-color: #000000;
    transform: scale(0.96);
  }

  Button:disabled {
    border-color: #dddddd;
    color: #dddddd;
    cursor: not-allowed;
    opacity: 1;
  }
  .search-list {
    font-size: 40px;
    text-align: left;
  }
  .search-list:hover {
    color: white;
  }
`;

function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((campground) => {
      return campground.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <Styles>
      <Form
        className='search-form'
        style={{
          textAlign: 'center',
          display: 'flex',
          displayDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form.Label className='search-title'>
          Search and View Our Campgrounds
        </Form.Label>
        <div className='search-bar'>
          <Form.Control
            type='text'
            placeholder='Search your campgrounds!'
            value={wordEntered}
            onChange={handleFilter}
          />
          <Button onClick={clearInput}>Search</Button>
        </div>
        {filteredData.length !== 0 && (
          <div className='search-list'>
            {filteredData.slice(0, 10).map((campground, idx) => {
              return (
                <Link to={`/campgrounds/${campground.id}`} key={idx}>
                  <p className='result'>🏕{campground.name}</p>
                </Link>
              );
            })}
          </div>
        )}
      </Form>
    </Styles>
  );
}

export default SearchBar;
