import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import { MdClose } from 'react-icons/md'
import { Button, Textarea } from 'components/custom/Elements'
import './CreateCard.scss'

function CardAddForm(props) {
  const { trelloData, utilToggleHandler, onCreateCard } = props
  const addCardRef = useRef(null)
  const [loading] = useState(false)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const clickOutsideHandler = e => {
      if (addCardRef.current.contains(e.target)) return
      utilToggleHandler()
    }
    document.addEventListener('click', clickOutsideHandler)
    return () => {
      document.removeEventListener('click', clickOutsideHandler)
    }
  }, [utilToggleHandler])

  const autosizeHandler = e => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:5.7rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  const createCardSubmit = e => {
    e.preventDefault()
    onCreateCard({
      _id: trelloData._id,
      title
    })
  }

  return (
    <form className="card_form_field" ref={addCardRef} onSubmit={createCardSubmit}>
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
        <Button className="green_submit" type="submit" text="Add Card" loading={loading} />
        <MdClose onClick={utilToggleHandler} />
      </div>
    </form>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateCard: payload => dispatch(action.createCardStart(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardAddForm)
