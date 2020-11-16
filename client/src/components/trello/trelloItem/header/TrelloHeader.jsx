import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from 'store/actions'
import { MdMoreHoriz } from 'react-icons/md'
import './TrelloHeader.scss'
import { Textarea, PopContainer } from 'components/custom/Elements'
import PopTrello from 'components/trello/trelloItem/popover/PopTrello'

function TrelloHeader(props) {
  const dispatch = useDispatch()
  const onUpdateTitle = (payload) => dispatch(actions.updateTrelloItemStart(payload))

  const { trelloItem, dragHandleProps } = props
  const [title, setTitle] = useState('')
  const [popover, setPopover] = useState(false)
  const updateTitle = () => {
    if (trelloItem.title !== title) onUpdateTitle({ _id: trelloItem._id, updateTitle: title })
  }

  const autosizeHandler = (e) => {
    setTitle(e.target.value)
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:2.8rem;'
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`
  }

  useEffect(() => {
    setPopover(false)
  }, [trelloItem])

  useEffect(() => {
    setTitle(trelloItem.title)
  }, [trelloItem.title])
  return (
    <div className="trello_list_header" {...dragHandleProps}>
      <Textarea
        className="trello-title"
        type="text"
        value={title}
        onChange={(e) => autosizeHandler(e)}
        onBlur={updateTitle}
        readonly="true"
      />
      <div className="trello_list_more">
        <PopContainer>
          <div className="more_icon" onClick={() => setPopover(!popover)}>
            <MdMoreHoriz />
          </div>
          {popover && <PopTrello _id={trelloItem._id} title={title} closeHandler={() => setPopover(false)} />}
        </PopContainer>
      </div>
    </div>
  )
}

export default TrelloHeader
