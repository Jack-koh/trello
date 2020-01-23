import React from 'react'
import { MdDashboard, MdPoll, MdTimeline } from "react-icons/md";

import NavigationItem from 'hoc/elements/NavigationItem';

import classNames from 'classnames/bind';
import styles from './SideBar.module.scss'
const cx = classNames.bind(styles)


const SideBar = (props) => {
  return (
    <div className={cx('side_bar_layout')}>
      <nav className={cx('side_bar_wrap')}>
        <ul>
          <NavigationItem link="/main/boards" exact >
            <MdPoll /><span>Boards</span>
          </NavigationItem>
          <NavigationItem link="/main/template" exact >
            <MdDashboard />
            <span>Template</span>
          </NavigationItem>
          <NavigationItem link="/main/home" exact >
            <MdTimeline />
            <span>Home</span>
          </NavigationItem>
        </ul>
      </nav >
      {props.children}
    </div>
  )
}

export default SideBar;