import React from 'react';
import { Route } from 'react-router-dom';

import MainLayout from 'hoc/layout/main/MainLayout';
import Board from 'components/main/board/Board';
import Tamplate from 'components/main/template/Tamplate';
import Home from 'components/main/home/Home';

function Main() {
  return (
    <MainLayout>
      <Route path="/main/board" component={Board} />
      <Route path="/main/template" component={Tamplate} />
      <Route path="/main/home" component={Home} />
    </MainLayout>
  );
}

export default Main;
