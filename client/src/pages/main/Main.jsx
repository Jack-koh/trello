import React from 'react'
import { Route } from 'react-router-dom'

import SideBar from 'hoc/layout/SideBar'
import Board from 'components/main/board/Board'
import Tamplate from 'components/main/template/Tamplate'
import Home from 'components/main/home/Home'
import './Main.scss'

function Main() {
  return (
    <SideBar>
      <Route path="/main/board" component={Board} />
      <Route path="/main/template" component={Tamplate} />
      <Route path="/main/home" component={Home} />
    </SideBar>
  )
}

export default Main
