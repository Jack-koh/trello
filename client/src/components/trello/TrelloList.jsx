import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as actions from 'store/actions';
import './TrelloList.scss';
import TrelloItem from './trelloItem/TrelloItem';

function TrelloList() {
  const dispatch = useDispatch();
  const {
    trello: { list: trelloList },
    card: { list: cardList },
  } = useSelector((state) => state);

  const onDragTrello = (payload) => dispatch(actions.dragTrelloEnd(payload));
  const ondragCardEnd = (payload) => dispatch(actions.dragCardEnd(payload));

  const dragEndHandler = (result) => {
    const { destination, source, draggableId, type } = result;

    if (type === 'trello' && destination) {
      const item = trelloList[source.index];
      if (source.index !== destination.index)
        onDragTrello({ item, sourceIndex: source.index, destIndex: destination.index });
    }

    if (type === 'card' && destination) {
      const cardNo = draggableId.split('-')[1];
      const trelloCard = cardList.find((item) => item.trelloNo === +source.droppableId);
      const item = trelloCard.list.find((card) => card.cardNo === +cardNo);

      if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
        ondragCardEnd({
          item,
          source: { trelloNo: +source.droppableId, index: source.index },
          destination: { trelloNo: +destination.droppableId, index: destination.index },
        });
      }
    }
  };

  function getStyle(style, snapshot) {
    if (snapshot.isDragging && !snapshot.isDropAnimating) {
      return { ...style, transform: `${style.transform} rotate(3deg)` };
    } else {
      return style;
    }
  }

  const trelloEl = trelloList.map((trello, index) => {
    const { trelloNo } = trello;
    const find = cardList.find((card) => card.trelloNo === trello.trelloNo);
    return (
      <Draggable
        key={`trello-${trelloNo}-${index}`}
        index={index}
        draggableId={`trello-${trelloNo}`}
      >
        {(provided, snapshot) => (
          <article
            className="trello-list"
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <TrelloItem
              getStyle={getStyle}
              dragHandleProps={provided.dragHandleProps}
              trello={trello}
              cardList={find ? find.list : []}
            />
          </article>
        )}
      </Draggable>
    );
  });

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="drop-field-trello" direction="horizontal" type="trello">
        {(provided, snapshot) => (
          <div
            className="trello-list-wrapper "
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {trelloEl}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TrelloList;
