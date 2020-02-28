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

  const onDialogHandler = e => {
    e.preventDefault()
    setUserPopover(!userPopover)
  }

  const toHomeHandler = e => {
    e.preventDefault()
    if (location.pathname === '/main/boards') return
    history.push('/main/boards')
  }

  return (
    <>
      <header className="gnb_wrap" style={background}>
        <div className="gnb_left">
          <a href="#" className="rectangle_btn" onClick={toHomeHandler}>
            <MdHome />
          </a>
          <a href="#" className="board_btn">
            <MdPoll />
            Boards
          </a>
          <div className="search_input_wrap">
            <input className="search_input" />
            <MdSearch />
          </div>
        </div>
        <div className="logo" />
        <div className="gnb_right">
          <a href="#" className="rectangle_btn">
            <MdAdd />
          </a>
          <a href="#" className="rectangle_btn">
            <MdInfoOutline />
          </a>
          <a href="#" className="rectangle_btn">
            <MdAddAlert />
          </a>
          <a href="#" className="circle_btn" onClick={onDialogHandler}>
            <MdAccountCircle />
            {userPopover && (
              <UserPopover setVisibility={e => utilSetVisibility(e, userPopover, setUserPopover)} />
            )}
          </a>
        </div>
      </header>
      {children}
    </>
  )
}

export default withRouter(Gnb)
