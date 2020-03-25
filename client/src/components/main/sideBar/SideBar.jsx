import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdPoll, MdTimeline } from 'react-icons/md';
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
          <NavLink to="/main/template" exact activeClassName="active">
            <MdDashboard />
            <span>Template</span>
          </NavLink>
        </li>
        <li className="navigation_item">
          <NavLink to="/main/Home" exact activeClassName="active">
            <MdTimeline />
            <span>Home</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default sideBar;
