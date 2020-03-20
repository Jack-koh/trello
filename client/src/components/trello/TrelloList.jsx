import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import * as action from 'store/actions'
import './TrelloList.scss'

import TrelloItem from './trelloItem/TrelloItem'

function TrelloList(props) {
  const trelloList = useSelector(state => state.trello.list)
  const dispatch = useDispatch()
  const onGetTelloList = useCallback(boardNo => dispatch(action.getTrelloListStart(boardNo)), [dispatch])
  const onInitTrelloList = useCallback(() => dispatch(action.initTrelloList()), [dispatch])
  const onUpdateCardItem = payload => dispatch(action.updateCardItem(payload))

  const { history } = props
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    trello ? onGetTelloList(trello.boardNo) : history.go(-1)
    return () => onInitTrelloList()
  }, [onGetTelloList, onInitTrelloList, trello, history])

  const dragEndHandler = result => {
    const { destination, source, draggableId, type } = result
    if (!destination) return
    if (type === 'card') {
      onUpdateCardItem({ destination, source, draggableId })
    }
  }

  const trelloListEl = trelloList.map((item, index) => {
    return (
      <Draggable key={item._id} index={index} draggableId={item._id}>
        {(provided, snapshot) => (
          <article
            className={`trello_list ${snapshot.isDragging ? 'isDragging' : ''}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <TrelloItem
              dragHandleProps={provided.dragHandleProps}
              trelloItem={item}
              cardList={item.cardList}
            />
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
            {trelloListEl}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default withRouter(TrelloList)
