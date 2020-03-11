import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import './CreateTrelloItem.scss'
import { MdAdd, MdClose } from 'react-icons/md'
import { utilSetVisible } from 'shared/utility'

import BtnLoading from 'shared/btnLoading/BtnLoading'

function AddList(props) {
  const { loading, trelloList } = props
  const wrapperRef = useRef(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [trelloData] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    const setVisibility = e => {
      if (wrapperRef.current.contains(e.target)) return
      utilSetVisible(e, showForm, setShowForm)
    }
    document.addEventListener('click', setVisibility)
    return () => document.removeEventListener('click', setVisibility)
  }, [showForm, trelloData.boardNo])

  useEffect(() => {
    setShowForm(false)
  }, [trelloList])

  const submitHandler = async e => {
    e.preventDefault()
    if (title.length > 0) {
      const { boardNo, userNo, userEmail, userName } = trelloData
      const payload = { boardNo, userNo, userEmail, userName, title }
      props.onCreateTrelloList(payload)
    }
    setTitle('')
  }

  const closeHandler = e => {
    e.stopPropagation()
    setShowForm(false)
  }

  return (
    <article
      ref={wrapperRef}
      className={`add_list_wrapper ${showForm ? 'on' : 'off'}`}
      onClick={() => setShowForm(true)}
    >
      <form onSubmit={e => submitHandler(e)}>
        {!showForm ? (
          <div className="place_holder">
            <MdAdd className="add_icon" />
            <span>Add another list</span>
          </div>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter list title..."
              className="list_name_input"
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
            <div className="list_add_control">
              <button type="submit" className="submit">
                {loading ? <BtnLoading /> : 'Add List'}
              </button>
              <MdClose onClick={e => closeHandler(e)} />
            </div>
          </>
        )}
      </form>
    </article>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.trellos.loading,
    trelloList: state.trellos.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateTrelloList: payload => dispatch(actions.createTrelloItemStart(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AddList))
