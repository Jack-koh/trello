import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as action from 'store/actions'
import { MdMoreHoriz } from 'react-icons/md'
import { utilToggleHandler } from 'shared/utility'
import './TrelloItemHeader.scss'
import { Textarea } from 'components/custom/Elements'
import TrelloPopover from 'components/trello/trelloItem/trelloPopover/TrelloPopover'

function TrelloItemHeader(props) {
  const dispatch = useDispatch()
  const onUpdateTitle = payload => dispatch(action.updateTrelloItemStart(payload))

  const { trelloItem, dragHandleProps } = props
  const [title, setTitle] = useState('')
  const [trelloPopover, setTrelloPopover] = useState(false)
  const updateTitle = () => {
    if (trelloItem.title !== title) onUpdateTitle({ _id: trelloItem._id, updateTitle: title })
  }
  const popoverHandler = () => {
    setTrelloPopover(!trelloPopover)
  }

  const autosizeHandler = e => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:2.8rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  useEffect(() => {
    setTrelloPopover(false)
  }, [trelloItem])

  useEffect(() => {
    setTitle(trelloItem.title)
  }, [trelloItem.title])
  return (
    <div className="trello_list_header" {...dragHandleProps}>
      <Textarea
        className="trello_title"
        type="text"
        value={title}
        onChange={e => autosizeHandler(e)}
        onBlur={updateTitle}
        readonly="true"
      />
      <div className="trello_list_more">
        <div className="trello_popover_wrapper">
          <div className="trello_list_more_icon" onClick={popoverHandler}>
            <MdMoreHoriz />
          </div>
          {trelloPopover && (
            <TrelloPopover
              _id={trelloItem._id}
              title={title}
              utilToggleHandler={() => utilToggleHandler(trelloPopover, setTrelloPopover)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TrelloItemHeader
