import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import './CreateTrelloItem.scss'
import { MdAdd, MdClose } from 'react-icons/md'
import { utilToggleHandler } from 'shared/utility'

import { Button } from 'components/custom/Elements'

function CreatTrelloItem(props) {
  const { loading, trelloList, onCreateTrelloList } = props
  const wrapperRef = useRef(null)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [trelloData] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    const clickOutsideHandler = e => {
      if (wrapperRef.current.contains(e.target)) return
      utilToggleHandler(showForm, setShowForm)
    }
    document.addEventListener('click', clickOutsideHandler)
    return () => document.removeEventListener('click', clickOutsideHandler)
  }, [showForm, trelloData])

  useEffect(() => {
    setShowForm(false)
  }, [trelloList])

  const closeHandler = e => {
    e.stopPropagation()
    setShowForm(false)
  }

  const createTrelloSubmit = async e => {
    e.preventDefault()
    if (title.length) {
      const { boardNo, userNo } = trelloData
      onCreateTrelloList({ boardNo, userNo, title })
      setTitle('')
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`add_list_wrapper ${showForm ? 'on' : 'off'}`}
      onClick={() => setShowForm(true)}
    >
      <form onSubmit={e => createTrelloSubmit(e)}>
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
              <Button className="green_submit" type="submit" text="Add List" loading={loading} />
              <MdClose onClick={closeHandler} />
            </div>
          </>
        )}
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.trello.loading,
    trelloList: state.trello.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateTrelloList: payload => dispatch(action.createTrelloItemStart(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CreatTrelloItem))
