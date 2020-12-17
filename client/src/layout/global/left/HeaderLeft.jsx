import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdPoll, MdSearch } from 'react-icons/md';

function HeaderLeft() {
  return (
    <div className="gnb_left">
      <Link to="/main/board" className="rectangle-btn">
        <MdHome />
      </Link>
      <div className="board-btn">
        <MdPoll />
        Boards
      </div>
      <div className="search-input-wrap">
        <input className="search-input" spellCheck="false" />
        <MdSearch />
      </div>
    </div>
  );
}

export default HeaderLeft;
