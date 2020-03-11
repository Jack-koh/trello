import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import './TrelloItem.scss'

import TrelloPopover, { utilSetVisibility } from 'components/popover/trello/TrelloPopover'

function TrelloItem(props) {
  const { listData, onUpdateTitle } = props
  const addCardRef = useRef('')
  const [title, setTitle] = useState('')
  const [trelloPopover, setTrelloPopover] = useState(false)
  const [toggleAddCard, setToggleAddCard] = useState(false)

  useEffect(() => {
    setTitle(listData.title)
  }, [listData.title])

  useEffect(() => {
    setTrelloPopover(false)
  }, [listData])

  const autosizeHandler = e => {
    const obj = e.target
    setTitle(obj.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    obj.style.cssText = 'height:2.8rem; padding: 0'
    obj.style.cssText = `height: ${obj.scrollHeight / 10}rem`
  }

  const updateTitle = () => {
    if (listData.title !== title) onUpdateTitle({ _id: listData._id, updateTitle: title })
  }

  const toggleAddCardFormHandler = e => {
    const clickOutsideHandler = () => {
      if (addCardRef.current.contains(e.target)) console.log('chceck')
    }

    document.removeEventListener('click', clickOutsideHandler)
    document.addEventListener('click', clickOutsideHandler, true)
    // console.log()
    // if (addCardRef.current.contains(e.target)) {
    //   console.log(`1${  toggleAddCard}`)
    // } else {
    //   setToggleAddCard(!toggleAddCard)
    //   console.log(`2${  toggleAddCard}`)

    // };
  }

  const popoverHandler = () => {
    setTrelloPopover(!trelloPopover)
  }

  return (
    <div className="trello_list_content">
      <div className="trello_list_header">
        <textarea
          type="text"
          spellCheck="false"
          value={title}
          onChange={e => autosizeHandler(e)}
          onBlur={updateTitle}
        />
        <div className="trello_list_more">
          <div className="trello_popover_wrapper">
            <div className="trello_list_more_icon" onClick={popoverHandler}>
              <MdMoreHoriz />
            </div>
            {trelloPopover && (
              <TrelloPopover
                _id={listData._id}
                title={title}
                setVisibility={e => utilSetVisibility(e, trelloPopover, setTrelloPopover)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="trello_list_cards" />
      <div className="trello_list_composer">
        <form onClick={toggleAddCardFormHandler} ref={addCardRef}>
          <div className="trello_list_add_card">
            <MdAdd />
            Add a card
          </div>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTitle: payload => dispatch(actions.updateTrelloItemStart(payload))
  }
}

export default connect(null, mapDispatchToProps)(TrelloItem)
