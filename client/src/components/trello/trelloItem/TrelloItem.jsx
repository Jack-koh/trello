import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as action from 'store/actions'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { MdAdd, MdEdit } from 'react-icons/md'
import './TrelloItem.scss'
import { utilToggleHandler } from 'shared/utility'

import TrelloItemHeader from './trelloItemHeader/TrelloItemHeader'
import CreateCard from './createCard/CreateCard'

function TrelloItem(props) {
  const dispatch = useDispatch()
  const onRemoveCardItem = cardItem => dispatch(action.removeCardItem(cardItem))

  const { trelloItem, cardList, dragHandleProps } = props
  const [addCardStatus, setAddCardStatus] = useState(false)

  const cardListEl = cardList.map((item, index) => {
    return (
      <Draggable key={item._id} index={index} draggableId={item._id}>
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
    <Droppable droppableId={trelloItem._id} type="card">
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
                {cardList && cardList.length > 0 ? 'Add another card' : 'Add a card'}
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default TrelloItem
