import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import * as action from 'store/actions'
import './TrelloList.scss'

import TrelloItem from './trelloItem/TrelloItem'
import TrelloItemHeader from './trelloItem/trelloItemHeader/TrelloItemHeader'

function TrelloList(props) {
  const {
    onGetTelloList,
    onInitTrelloList,
    onGetCardList,
    onInitCardList,
    trelloList,
    cardList,
    history
  } = props
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    if (trello) {
      const { boardNo } = trello
      onGetTelloList(boardNo)
      onGetCardList(boardNo)
    } else {
      history.go(-1)
    }

    return () => {
      onInitTrelloList()
      onInitCardList()
    }
  }, [onGetTelloList, onInitTrelloList, onGetCardList, onInitCardList, trello, history])

  const dragEndHandler = result => {
    const { destination, source, draggableId, type } = result
    console.log(result)
    // if (!destination) {
    //   return
    // }

    // if (
    //   destination.droppabledId === source.droppabledId &&
    //   destination.index === source.index
    // ) {

    // }
  }

  const trelloListEl = trelloList.map((item, index) => {
    const uniqueKey = `trello_${item.trelloNo}`
    return (
      <Draggable key={uniqueKey} index={index} draggableId={uniqueKey}>
        {(provided, snapshot) => (
          <article
            key={uniqueKey}
            className={`trello_list ${snapshot.isDragging ? 'isDragging' : ''}`}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <TrelloItem
              dragHandleProps={provided.dragHandleProps}
              trelloItem={item}
              cardList={cardList.filter(el => el.trelloNo === item.trelloNo)}
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

const mapStateToProps = state => {
  return {
    trelloList: state.trello.list,
    cardList: state.card.list
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onGetTelloList: boardNo => dispatch(action.getTrelloListStart(boardNo)),
    onInitTrelloList: () => dispatch(action.initTrelloList()),
    onGetCardList: boardNo => dispatch(action.getCardListStart(boardNo)),
    onInitCardList: () => dispatch(action.initCardList())
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(withRouter(TrelloList))
