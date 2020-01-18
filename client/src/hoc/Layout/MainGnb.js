import React, { Fragment } from 'react'
import { MdHome, MdPoll, MdSearch, MdAdd, MdInfoOutline, MdAddAlert } from "react-icons/md";

import classNames from 'classnames/bind';
import styles from './MainGnb.module.scss'
const cx = classNames.bind(styles)

const Layout = (props) => {
  return (
    <Fragment>
      <div className={cx('gnb_wrap')}>
        <div className={cx('gnb_left')}>
          <div className={cx('rectangle_btn', 'common_btn')}>
            <MdHome /> 
          </div>
          <div className={cx('board_btn', 'common_btn')} >
            <MdPoll />
            Boards
          </div>
          <div className={cx('search_input_wrap')}>
            <input className={cx('search_input')} />
            <MdSearch />
          </div>
        </div>
        <div className={cx('logo')}>

        </div>
        <div className={cx('gnb_right')}>
          <div className={cx('rectangle_btn', 'common_btn')}>
            <MdAdd />
          </div>
          <div className={cx('rectangle_btn', 'common_btn')}>
            <MdInfoOutline />
          </div>
          <div className={cx('rectangle_btn', 'common_btn')}>
            <MdAddAlert />
          </div>
        </div>
      </div>
      {props.children}
    </Fragment >
  )
}

export default Layout;