import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import { MdMoreHoriz, MdAdd } from 'react-icons/md'
import './TrelloItem.scss'
import { utilToggleHandler } from 'shared/utility'

import TrelloPopover from 'components/trello/trelloItem/trelloPopover/TrelloPopover'
import { Textarea } from 'components/custom/Elements'
import CardAddForm from './createCard/CreateCard'

function TrelloItem(props) {
  const { trelloData, onUpdateTitle } = props
  const [title, setTitle] = useState('')
  const [trelloPopover, setTrelloPopover] = useState(false)
  const [addCardStatus, setAddCardStatus] = useState(false)

  useEffect(() => {
    setTitle(trelloData.title)
  }, [trelloData.title])

  useEffect(() => {
    setTrelloPopover(false)
  }, [trelloData])

  const autosizeHandler = e => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:2.8rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  const updateTitle = () => {
    if (trelloData.title !== title) onUpdateTitle({ _id: trelloData._id, updateTitle: title })
  }

  const popoverHandler = () => {
    setTrelloPopover(!trelloPopover)
  }

  return (
    <div className="trello_list_content">
      <div className="trello_list_header">
        <Textarea
          className="trello_title"
          type="text"
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
                _id={trelloData._id}
                title={title}
                utilToggleHandler={() => utilToggleHandler(trelloPopover, setTrelloPopover)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="trello_cards_wrapper" />
      {addCardStatus ? (
        <CardAddForm
          trelloData={trelloData}
          utilToggleHandler={() => utilToggleHandler(addCardStatus, setAddCardStatus)}
        />
      ) : (
        <div className="card_form_button" onClick={() => setAddCardStatus(true)}>
          <MdAdd />
          Add a card
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTitle: payload => dispatch(action.updateTrelloItemStart(payload))
  }
}

export default connect(null, mapDispatchToProps)(TrelloItem)
