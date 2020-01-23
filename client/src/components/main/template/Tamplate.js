import React from 'react';

import classNames from 'classnames/bind'
import style from './template.module.scss'

const cx = classNames.bind(style)

function Template() {
  return (
    <div className={cx('template-wrap')}>
      <div className={cx('template-inner-area')}>
        Template
      </div>
    </div>
  )
}

export default Template;