import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { MdAdd, MdEdit } from 'react-icons/md'
import './TrelloItem.scss'
import { utilToggleHandler } from 'shared/utility'

import TrelloItemHeader from './trelloItemHeader/TrelloItemHeader'
import CreateCard from './createCard/CreateCard'

function TrelloItem(props) {
  const { trelloItem, cardList, dragHandleProps, onRemoveCardItem } = props
  const [addCardStatus, setAddCardStatus] = useState(false)

  const cardListEl = cardList.map((item, index) => {
    const uniqueKey = `card_${item.cardNo}`
    return (
      <Draggable key={uniqueKey} index={index} draggableId={uniqueKey}>
        {provided => (
          <li
            className="trello_card_item_wrapper"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>{item.title}</span>
            <div className="card_edit">
              <MdEdit />
            </div>
          </li>
        )}
      </Draggable>
    )
  })

  return (
    <Droppable droppableId={`trello_${trelloItem.trelloNo}`} type="card">
      {provided => (
        <div className="card_list_wrapper" ref={provided.innerRef} {...provided.droppableProps}>
          <div className="card_list">
            <TrelloItemHeader dragHandleProps={dragHandleProps} trelloItem={trelloItem} />
            <ul>
              {cardListEl}
              {provided.placeholder}
            </ul>
            {addCardStatus ? (
              <CreateCard
                trelloItem={trelloItem}
                utilToggleHandler={() => utilToggleHandler(addCardStatus, setAddCardStatus)}
              />
            ) : (
              <div className="card_form_button" onClick={() => setAddCardStatus(true)}>
                <MdAdd />
                {cardList.length > 0 ? 'Add another card' : 'Add a card'}
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTitle: payload => dispatch(action.updateTrelloItemStart(payload)),
    onRemoveCardItem: cardItem => dispatch(action.removeCardItem(cardItem))
  }
}

export default connect(null, mapDispatchToProps)(TrelloItem)
