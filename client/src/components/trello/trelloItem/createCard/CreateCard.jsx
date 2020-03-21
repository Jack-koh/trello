import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as action from 'store/actions'
import { MdClose } from 'react-icons/md'
import { Button, Textarea, ClickOutside } from 'components/custom/Elements'
import './CreateCard.scss'

function CardAddForm(props) {
  const card = useSelector(state => state.card)
  const dispatch = useDispatch()
  const onCreateCard = payload => dispatch(action.createCardStart(payload))

  const { trelloItem, closeHandler } = props
  const [title, setTitle] = useState('')

  const autosizeHandler = e => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:5.7rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  const createCardSubmit = e => {
    e.preventDefault()
    if (title.length) {
      onCreateCard({ trelloId: trelloItem._id, title })
      setTitle('')
    }
  }

  return (
    <ClickOutside className="card_form_field" close={closeHandler}>
      <form onSubmit={createCardSubmit}>
        <div className="trello_card_wrapper">
          <Textarea
            className="create_card_title"
            type="text"
            placeholder="Enter a title for this card"
            autoFocus
            onChange={e => autosizeHandler(e)}
          />
        </div>
        <div className="card_add_control">
          <Button className="green_submit" type="submit" text="Add Card" loading={card.loading} />
          <MdClose onClick={closeHandler} />
        </div>
      </form>
    </ClickOutside>
  )
}

export default CardAddForm
