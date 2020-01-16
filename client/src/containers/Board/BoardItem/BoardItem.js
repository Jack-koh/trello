import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames/bind'
import styles from './BoardItem.scss'
import { MdStarBorder } from "react-icons/md";

const cx = classNames.bind(styles)

const BoardItem = (props) => {
  const iteEl = props.list.map((item, i) => {
    return (
      <li key={i} className={cx('personal-item', item.background)}>
        <div className={cx('personal-item-inner')}>
          <span className={cx('item-title')}>{item.name}</span>
        </div>
        <div className={cx('hover-action')}>
          <div className="back-drop"></div>
          <MdStarBorder />
        </div>
      </li >
    )
  })
  return (
    <ul className={cx('personal-item-section')}>
      {iteEl}
    </ul>
  )
}

BoardItem.propTypes = {
  list: propTypes.array
};

export default BoardItem