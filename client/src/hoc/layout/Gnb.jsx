import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {
  MdHome,
  MdPoll,
  MdSearch,
  MdAdd,
  MdInfoOutline,
  MdAddAlert,
  MdAccountCircle
} from 'react-icons/md'
import UserPopover, { utilSetVisibility } from 'components/popover/user/UserPopover'
import './Gnb.scss'

const Gnb = props => {
  console.log('Gnb - check')
  const { children, location, history } = props
  const [userPopover, setUserPopover] = useState(false)
  const [background, setBackground] = useState({ background: '#026aa7' })

  useEffect(() => {
    const main = location.pathname.substring(1).split('/')[0]
    main !== 'main'
      ? setBackground({ background: 'rgba(0,0,0,.15)' })
      : setBackground({ background: '#026aa7' })
  }, [location])

  const popoverHandler = () => {
    setUserPopover(!userPopover)
  }

  const toHomeHandler = () => {
    if (location.pathname === '/main/boards') return
    history.push('/main/boards')
  }

  return (
    <>
      <header className="gnb_wrap" style={background}>
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
        <div className="logo" />
        <div className="gnb_right">
          <div className="rectangle_btn">
            <MdAdd />
          </div>
          <div className="rectangle_btn">
            <MdInfoOutline />
          </div>
          <div className="rectangle_btn">
            <MdAddAlert />
          </div>
          <div className="circle_btn">
            <MdAccountCircle onClick={popoverHandler} />
            {userPopover && (
              <UserPopover setVisibility={e => utilSetVisibility(e, userPopover, setUserPopover)} />
            )}
          </div>
        </div>
      </header>
      {children}
    </>
  )
}

export default withRouter(Gnb)
