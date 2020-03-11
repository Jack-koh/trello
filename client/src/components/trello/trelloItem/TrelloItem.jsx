import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { MdMoreHoriz, MdAdd, MdClose } from 'react-icons/md'
import './TrelloItem.scss'
import { utilSetToggle } from 'shared/utility'
import TrelloPopover from 'components/popover/trello/TrelloPopover'

import BtnLoading from 'shared/btnLoading/BtnLoading'

function TrelloItem(props) {
  const { listData, onUpdateTitle } = props
  const addCardRef = useRef(null)
  const [title, setTitle] = useState('')
  const [trelloPopover, setTrelloPopover] = useState(false)
  const [toggleAddCard, setToggleAddCard] = useState(false)
  const [loading] = useState(false)

  useEffect(() => {
    setTitle(listData.title)
  }, [listData.title])

  useEffect(() => {
    setTrelloPopover(false)
  }, [listData])

  useEffect(() => {
    const clickOutsideHandler = e => {
      if (addCardRef.current.contains(e.target)) return
      setToggleAddCard(false)
    }
    document.addEventListener('click', clickOutsideHandler)
    return () => document.removeEventListener('click', clickOutsideHandler)
  }, [toggleAddCard])

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
                utilSetToggle={e => utilSetToggle(e, trelloPopover, setTrelloPopover)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="trello_cards_wrapper" />
      <div className="trello_card_composer">
        <form onClick={() => setToggleAddCard(true)} ref={addCardRef}>
          <div className="open_card_form">
            <MdAdd />
            Add a card
          </div>
          <div className="util_card_form">
            <div className="trello_card">
              <textarea />
            </div>
            <div className="card_add_control">
              <button className="green_submit" type="submit">
                {loading ? <BtnLoading /> : 'Add Card'}
              </button>
              <MdClose onClick={() => setToggleAddCard(false)} />
            </div>
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
