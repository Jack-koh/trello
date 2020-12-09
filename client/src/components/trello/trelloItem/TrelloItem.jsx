import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import TrelloHeader from './header/TrelloHeader';
import CreateCard from './createCard/CreateCard';
import CardItem from './cardItem/CardItem';
import './TrelloItem.scss';

function TrelloItem({ getStyle, trello, cardList, dragHandleProps, dragStartHandler }) {
  const [add, setAdd] = useState(false);
  const { loading } = useSelector((state) => state.card);

  useEffect(() => {
    if (!loading) setAdd(false);
  }, [loading]);

  const cardEl = cardList.map((item, index) => {
    const { cardNo, title } = item;
    return (
      <Draggable key={`card-${cardNo}-${index}`} index={index} draggableId={`card-${cardNo}`}>
        {(provided, snapshot) => (
          <CardItem provided={provided} snapshot={snapshot} getStyle={getStyle} item={item} />
        )}
      </Draggable>
    );
  });

  return (
    <div className="trello-item-wrapper" onDragStart={(e) => dragStartHandler(e, trelloNo)}>
      <div className="trello-item">
        <TrelloHeader dragHandleProps={dragHandleProps} trello={trello} />
        <Droppable droppableId={`${trello.trelloNo}`} type="card">
          {(provided, snapshot) => {
            return (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {cardEl}
                {provided.placeholder}
              </ul>
            );
          }}
        </Droppable>
        {add ? (
          <CreateCard trello={trello} closeHandler={() => setAdd(false)} loading={loading} />
        ) : (
          <div className="card-form-button" onClick={() => setAdd(true)}>
            <MdAdd />
            {cardList.length ? 'Add another card' : 'Add a card'}
          </div>
        )}
      </div>
    </div>
  );
}

export default TrelloItem;
