import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import './TrelloItem.scss'

import TrelloPopover, { utilSetVisibility } from 'components/popover/trello/TrelloPopover'

function TrelloItem(props) {
  const { listData, onUpdateTitle } = props
  const [text, setText] = useState('text')
  const [trelloPopover, setTrelloPopover] = useState(false)

  useEffect(() => {
    setText(listData.title)
  }, [listData.title])

  useEffect(() => {
    setTrelloPopover(false)
  }, [listData])

  const autosizeHandler = e => {
    const obj = e.target
    setText(obj.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    obj.style.cssText = 'height:20px; padding: 0'
    obj.style.cssText = `height: ${obj.scrollHeight}px`
  }

  const updateTitle = () => {
    if (listData.title !== text) onUpdateTitle({ _id: listData._id, title: text })
  }

  const test = e => {
    e.preventDefault()
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
          value={text}
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
                listId={listData._id}
                setVisibility={e => utilSetVisibility(e, trelloPopover, setTrelloPopover)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="trello_list_cards" />
      <div className="trello_list_composer">
        <div className="trello_list_add_card" onClick={e => test(e)}>
          <MdAdd />
          Add a card
        </div>
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
