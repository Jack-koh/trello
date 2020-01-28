import React from 'react';

import classNames from 'classnames/bind'
import style from './Home.module.scss'

const cx = classNames.bind(style)

function Home() {
  console.log("Home - check");
  return (
    <div className={cx('home-wrap')}>
      <div className={cx('home-inner-area')} >
        Home
      </div>
    </div>
  )
}

export default Home;