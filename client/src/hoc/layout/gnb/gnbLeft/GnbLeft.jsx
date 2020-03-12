import React from 'react'
import { withRouter } from 'react-router-dom'
import { MdHome, MdPoll, MdSearch } from 'react-icons/md'

function GnbRight(props) {
  const { location, history } = props
  const toHomeHandler = () => {
    if (location.pathname === '/main/board') return
    history.push('/main/board')
  }
  return (
    <div className="gnb_left">
      <div className="rectangle_btn" onClick={toHomeHandler}>
        <MdHome />
      </div>
      <div className="board_btn">
        <MdPoll />
        Boards
      </div>
      <div className="search_input_wrap">
        <input className="search_input" />
        <MdSearch />
      </div>
    </div>
  )
}

export default withRouter(GnbRight)
