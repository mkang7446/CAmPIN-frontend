import React from 'react';
import { Link } from 'react-router-dom';

function Community(props) {
  return (
    <div>
      <Link to='/community'>
        <button>All</button>
      </Link>
      <Link to='/talktalk'>
        <button>Talk Talk</button>
      </Link>

      <Link to='/market'>
        <button>Market</button>
      </Link>

      <Link to='/tips'>
        <button>Tips</button>
      </Link>

      <Link to='/qna'>
        <button>Q＆A</button>
      </Link>
    </div>
  );
}

export default Community;
