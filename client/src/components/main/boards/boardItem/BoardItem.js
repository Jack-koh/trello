import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import propTypes from 'prop-types';
import classNames from 'classnames/bind'
import styles from './BoardItem.module.scss'
import { MdStarBorder } from "react-icons/md";

import CreateBoardModal from 'components/modal/createBoard/CreateBoardModal'

const cx = classNames.bind(styles)

const BoardItem = (props) => {
  console.log("BoardItem - check");

  const onCreateModalHandler = () => {
    props.onSetModal('modal-create-board')
  }

  const itemEl = props.list.map((item, i) => {
    return item.name === '_create' ? (
      <li key={i} className={cx('board-item', item.background)} onClick={onCreateModalHandler}>
        <div className={cx('board-item-inner', 'create')}>
          <span className={cx('create-item-title')}>Create new board</span>
        </div>
        <div className={cx('create-hover-action')}>
          <div className="back-drop"></div>
        </div>
      </li >
    ) : (
        <li key={i} className={cx('board-item', item.background)}>
          <div className={cx('board-item-inner')}>
            <span className={cx('item-title')}>{item.name}</span>
          </div>
          <div className={cx('board-hover-action')}>
            <div className="back-drop"></div>
            <MdStarBorder />
          </div>
        </li >
      )
  })
  return (
    <Fragment>
      <ul className={cx('board-item-section')} >
        {itemEl}
      </ul >
      {props.modalName === 'modal-create-board' && <CreateBoardModal />}
    </Fragment>
  )
}

BoardItem.propTypes = {
  list: propTypes.array
};

const mapStateToProps = state => {
  return {
    modalName: state.modal.name
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onSetModal: name => dispatch(actions.setModal(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(BoardItem);