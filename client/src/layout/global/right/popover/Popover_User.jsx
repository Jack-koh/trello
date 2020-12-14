import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import './Popover_User.scss';

function Popover_User() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(actions.logout());
  const history = useHistory();

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-data'));
    const { email, name } = userData;
    if (email && name) {
      setUserEmail(email.split('@')[0]);
      setUserName(name);
    }
  }, []);

  const logoutHandler = () => {
    onLogout();
    history.push('/Login');
  };

  return (
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
  );
}

export default Popover_User;
