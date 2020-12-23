import React from 'react';
import SideBar from 'components/main/sideBar/SideBar';
import './GlobalLayout.scss';

import GlobalLoading from './loading/GlobalLoading';
import HeaderLeft from './left/HeaderLeft';
import HeaderRight from './right/HeaderRight';

const GlobalLayout = ({ children, mode }) => {
  return (
    <>
      <header
        className="header-wrapper"
        style={{ backgroundColor: mode === 'main' ? '#026aa7' : 'rgba(0,0,0,.15)' }}
      >
        <HeaderLeft />
        <GlobalLoading />
        <HeaderRight />
      </header>
      {mode === 'main' ? (
        <div className="main-screen">
          <SideBar className="side-bar-wrap" />
          <section className="content-wrap">{children}</section>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default GlobalLayout;
