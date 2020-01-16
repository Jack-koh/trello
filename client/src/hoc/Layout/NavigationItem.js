import React from 'react'
import { NavLink } from 'react-router-dom'

import classNames from 'classnames/bind'
import style from './NavigationItem.module.scss'
const cx = classNames.bind(style)

const NavigationItem = (props) => {
  return (
    <li className={cx('NavigationItem')}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={cx('active')}>
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavigationItem;