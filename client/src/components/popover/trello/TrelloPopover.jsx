import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import './TrelloPopover.scss'
import BtnLoading from 'shared/btnLoading/BtnLoading'

function TrelloPopover(props) {
  const { loading, _id, title, utilSetToggle, onDeleteItemHandler } = props
  const wrapperRef = useRef(null)
  const [onDelete, setOnDelete] = useState(false)
  const [confirmTitle, setConfirmTitle] = useState('')

  useEffect(() => {
    // 클릭 아웃사이드 기능 생성 및 제거1
    const clickOutsideHandler = e => {
      if (wrapperRef.current.parentElement.contains(e.target)) return
      utilSetToggle(e)
    }

    document.addEventListener('click', clickOutsideHandler, true)

    return () => {
      document.removeEventListener('click', clickOutsideHandler, true)
    }
  }, [utilSetToggle, wrapperRef])

  const toggleDeleteHandler = () => {
    setOnDelete(!onDelete)
  }

  const submitdeleteHandler = e => {
    e.preventDefault()
    onDeleteItemHandler({ confirmTitle, _id })
  }

  return (
    <div ref={wrapperRef} className="trello_popover">
      <div className="trello_popover_content">
        <div className="trello_popover_inner">
          <div className="trello_popover_title">List Actions</div>
          <nav>
            <ul>
              <li>
                <div className="actions_title">Add Card...</div>
              </li>
              <li>
                <div className="actions_title">Copy List...</div>
              </li>
              <li>
                <div className="actions_title">Move List...</div>
              </li>
              <li className="line_break">
                <div className="actions_title" onClick={toggleDeleteHandler}>
                  Delete List...
                </div>
                {onDelete && (
                  <form className="delete_form_field" onSubmit={e => submitdeleteHandler(e)}>
                    <input
                      className="delete_input"
                      type="text"
                      autoFocus
                      placeholder={`Type list name ${title}`}
                      onChange={e => setConfirmTitle(e.target.value)}
                    />
                    <button className="red_submit" disabled={title !== confirmTitle} type="submit">
                      {loading ? <BtnLoading /> : 'Delete Trello'}
                    </button>
                  </form>
                )}
              </li>
              <li>
                <div className="actions_title">Move All Cards in This List...</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.trellos.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItemHandler: params => dispatch(actions.deleteTrelloItemStart(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TrelloPopover))
