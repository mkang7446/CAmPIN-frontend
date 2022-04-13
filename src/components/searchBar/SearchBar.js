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
    <div className='search'>
      <div className='searchInputs'>
        <input
          type='text'
          placeholder='Search your campgrounds!'
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className='searchIcon'>
          <button onClick={clearInput}>search</button>
          {/* {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )} */}
        </div>
      </div>
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
