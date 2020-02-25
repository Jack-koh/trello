import React from 'react';
import { MdDashboard, MdPoll, MdTimeline } from 'react-icons/md';

import NavigationItem from 'hoc/elements/NavigationItem';
import './SideBar.scss';

const SideBar = props => {
  console.log('SideBar - check');
  const { children } = props;
  return (
    <main className="main_screen">
      <nav className="side_bar_wrap">
        <ul>
          <NavigationItem link="/main/boards" exact>
            <MdPoll />
            <span>Boards</span>
          </NavigationItem>
          <NavigationItem link="/main/template" exact>
            <MdDashboard />
            <span>Template</span>
          </NavigationItem>
          <NavigationItem link="/main/home" exact>
            <MdTimeline />
            <span>Home</span>
          </NavigationItem>
        </ul>
      </nav>
      {children}
    </main>
  );
};

export default SideBar;
