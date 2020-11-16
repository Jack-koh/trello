import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import * as actions from 'store/actions'
import './TrelloList.scss'
import TrelloItem from './trelloItem/TrelloItem'

function TrelloList() {
  const dispatch = useDispatch()
  const { list } = useSelector((state) => state.trello)
  const onUpdateCardItemSuccess = (payload) => dispatch(actions.updateCardItem(payload))

  const dragEndHandler = (result) => {
    const { destination, source, draggableId, type } = result
    if (destination && type === 'card') onUpdateCardItemSuccess({ destination, source, draggableId })
  }

  const trelloList = list.map((item, index) => {
    const { trelloNo } = item
    return (
      <Draggable key={trelloNo} index={index} draggableId={trelloNo}>
        {(provided, snapshot) => (
          <article
            className={`trello_list ${snapshot.isDragging ? 'isDragging' : ''}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {/* <TrelloItem dragHandleProps={provided.dragHandleProps} trelloItem={item} cardList={cardList} /> */}
          </article>
        )}
      </Draggable>
    )
  })

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="drop_field_trello" direction="horizontal" type="trello">
        {(provided, snapshot) => (
          <div
            className={`trello_list_wrapper ${snapshot.isDraggingOver ? 'isDraggingOver' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {trelloList}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default TrelloList
