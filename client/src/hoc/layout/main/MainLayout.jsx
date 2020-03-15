import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdPoll, MdTimeline } from 'react-icons/md'

import './MainLayout.scss'

const SideBar = props => {
  const { children } = props
  return (
    <main className="main_screen">
      <nav className="side_bar_wrap">
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
      {children}
    </main>
  )
}

export default SideBar
