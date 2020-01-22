import React from 'react'
import classNames from 'classnames/bind';
import style from './Spinner.module.scss'

const cx = classNames.bind(style)

function Spinner() {
    return (
        <div className={cx('spinner-wrap')}>
            <div className={cx("spinner")}>
                <div className={cx("rect1")}></div>
                <div className={cx("rect2")}></div>
                <div className={cx("rect3")}></div>
                <div className={cx("rect4")}></div>
                <div className={cx("rect5")}></div>
            </div>
        </div>
    )
}

export default Spinner;