import React from 'react';
import SideBar from 'components/main/sideBar/SideBar';
import './MainLayout.scss';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <main className="main_screen">
      <SideBar className="side_bar_wrap" />
      <section className="content-wrap">{children}</section>
    </main>
  );
};

export default MainLayout;
