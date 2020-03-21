import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as action from 'store/actions'
import './CreateTrelloItem.scss'
import { MdAdd, MdClose } from 'react-icons/md'
import { Button, ClickOutside } from 'components/custom/Elements'

function CreatTrelloItem() {
  const loading = useSelector(state => state.trello.loading)
  const trelloList = useSelector(state => state.trello.list)
  const dispatch = useDispatch()
  const onCreateTrelloList = payload => dispatch(action.createTrelloItemStart(payload))

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [trelloData] = useState(JSON.parse(localStorage.getItem('trello')))

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
    <ClickOutside className={`add_list_wrapper ${showForm ? 'on' : 'off'}`} close={() => setShowForm(false)}>
      <form onSubmit={e => createTrelloSubmit(e)} onClick={() => setShowForm(true)}>
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
    </ClickOutside>
  )
}

export default React.memo(CreatTrelloItem)
