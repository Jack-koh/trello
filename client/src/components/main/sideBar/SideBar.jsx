import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdStar, MdPoll } from 'react-icons/md';
import './SideBar.scss';

function sideBar({ className }) {
  return (
    <nav className={className}>
      <ul>
        <li className="navigation_item">
          <NavLink to="/main/board" exact activeClassName="active">
            <MdPoll />
            <span>Boards</span>
          </NavLink>
        </li>
        <li className="navigation_item">
          <NavLink to="/main/favorite" exact activeClassName="active">
            <MdStar />
            <span>Favoirte</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default sideBar;
