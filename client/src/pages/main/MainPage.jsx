import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MainLayout from 'hoc/layout/main/MainLayout';
import Board from 'components/main/board/Board';
import Tamplate from 'components/main/template/Tamplate';
import Home from 'components/main/home/Home';
import GnbLayout from 'hoc/layout/gnb/GnbLayout';

function Main() {
  return (
    <GnbLayout>
      <MainLayout>
        <Route path="/main/board" component={Board} />
        <Route path="/main/template" component={Tamplate} />
        <Route path="/main/home" component={Home} />
        <Redirect to="/main/board" />
      </MainLayout>
    </GnbLayout>
  );
}

export default Main;
