import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div
      className='search'
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <div>
        <input
          type='text'
          placeholder='Search your campgrounds!'
          value={wordEntered}
          onChange={handleFilter}
          style={{ width: '500px', height: '40px' }}
        />
        <button style={{ height: '40px' }} onClick={clearInput}>
          search
        </button>
      </div>
      {/* {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )} */}
      {filteredData.length !== 0 && (
        <div className='dataResult'>
          {filteredData.slice(0, 10).map((campground, idx) => {
            return (
              <Link to={`/campgrounds/${campground.id}`} key={idx}>
                <ul>
                  <li> {campground.name}</li>
                </ul>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
