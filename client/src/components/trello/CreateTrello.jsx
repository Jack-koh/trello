import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from 'store/actions'
import './CreateTrello.scss'
import { MdAdd, MdClose } from 'react-icons/md'
import { Button } from 'components/custom/Elements'

function CreateTrello() {
  const loading = useSelector((state) => state.trello.loading)
  const trelloList = useSelector((state) => state.trello.list)
  const dispatch = useDispatch()
  const onCreateTrello = (payload) => dispatch(actions.createTrelloStart(payload))

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [trelloData] = useState(JSON.parse(localStorage.getItem('trello')))
  const wrapperRef = useRef(null)

  useEffect(() => {
    setShowForm(false)
  }, [trelloList])

  const closeHandler = (e) => {
    e.stopPropagation()
    setShowForm(false)
  }

  const createTrelloSubmit = async (e) => {
    e.preventDefault()
    if (title.length) {
      const { boardNo } = trelloData
      onCreateTrello({ boardNo, title })
      setTitle('')
    }
  }
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (wrapperRef.current.contains(e.target)) return
      setShowForm(false)
    }
    if (showForm) document.addEventListener('click', clickOutsideHandler)
    return () => document.removeEventListener('click', clickOutsideHandler)
  }, [showForm])

  const form = (
    <>
      <input
        type="text"
        placeholder="Enter list title..."
        className="list_name_input"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
      />
      <div className="list_add_control">
        <Button className="green_submit" type="submit" text="Add List" loading={loading} />
        <MdClose onClick={closeHandler} />
      </div>
    </>
  )

  const placeholder = (
    <div className="place_holder">
      <MdAdd className="add_icon" />
      <span>Add another list</span>
    </div>
  )

  return (
    <div ref={wrapperRef} className={`add_list_wrapper ${showForm ? 'on' : 'off'}`} onClick={() => setShowForm(true)}>
      <form onSubmit={(e) => createTrelloSubmit(e)}>{showForm ? form : placeholder}</form>
    </div>
  )
}

export default CreateTrello
