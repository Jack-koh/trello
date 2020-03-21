import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './PopUser.scss'
import { useDispatch } from 'react-redux'
import * as action from 'store/actions'
import { Popover } from 'components/custom/Elements'

function PopUser(props) {
  const dispatch = useDispatch()
  const onLogout = () => dispatch(action.logout())

  const { history, closeHandler } = props
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-data'))
    const { email, name } = userData
    if (email && name) {
      setUserEmail(email.split('@')[0])
      setUserName(name)
    }
  }, [])

  const logoutHandler = () => {
    onLogout()
    history.push('/Login')
  }

  return (
    <Popover className="user_popover" clickOutside close={closeHandler}>
      <div className="user_popover_content">
        <div className="user_popover_inner">
          <div className="user_popover_title">{`${userEmail} (${userName})`}</div>
          <nav>
            <ul>
              <li>
                <div>Profile and Visibility</div>
              </li>
              <li>
                <div>Activity</div>
              </li>
              <li>
                <div>Cards</div>
              </li>
              <li className="line_break">
                <div>Settings</div>
              </li>
              <li>
                <div>Help</div>
              </li>
              <li className="line_break">
                <div>Shortcuts</div>
              </li>
              <li onClick={logoutHandler}>
                <div>Log Out</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Popover>
  )
}

export default withRouter(PopUser)
