import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from 'store/actions'
import { MdClose } from 'react-icons/md'
import { Button, Textarea } from 'components/custom/Elements'
import './CreateCard.scss'

function CardAddForm(props) {
  const dispatch = useDispatch()
  const onCreateCard = (payload) => dispatch(actions.createCardStart(payload))

  const { trelloItem, closeHandler, loading } = props
  const [title, setTitle] = useState('')
  const wrapperRef = useRef(null)

  const autoSizeHandler = (e) => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:5.7rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (title.length) {
      onCreateCard({ trelloId: trelloItem._id, title })
      setTitle('')
    }
  }

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (wrapperRef.current.contains(e.target)) return
      closeHandler()
    }

    document.addEventListener('click', clickOutsideHandler)
    return () => document.removeEventListener('click', clickOutsideHandler)
  }, [])

  return (
    <form className="add-card-form-field" ref={wrapperRef} onSubmit={submitHandler}>
      <div className="trello_card_wrapper">
        <Textarea
          className="create_card_title"
          type="text"
          placeholder="Enter a title for this card"
          autoFocus
          onChange={(e) => autoSizeHandler(e)}
        />
      </div>
      <div className="card_add_control">
        <Button className="green_submit" type="submit" text="Add Card" loading={loading} />
        <MdClose onClick={closeHandler} />
      </div>
    </form>
  )
}

export default CardAddForm
