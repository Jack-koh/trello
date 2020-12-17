import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import { MdMoreHoriz } from 'react-icons/md';
import { Popover, TextArea } from 'components/custom';
import Popover_Trello from 'components/trello/trelloItem/popover/Popover_Trello';
import './TrelloHeader.scss';

function TrelloHeader({ trello, dragHandleProps }) {
  const dispatch = useDispatch();
  const onUpdateTitle = (payload) => dispatch(actions.updateTrelloItemStart(payload));
  const onSetTitle = (payload) => dispatch(actions.setTrelloItemTitle(payload));

  const { trelloNo, boardNo, title } = trello;
  const textAreaRef = useRef();

  return (
    <div className="trello-list-header" {...dragHandleProps}>
      <div className="textarea-wrapper">
        <div
          className="preventer"
          onClick={() => {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(
              textAreaRef.current.value.length,
              textAreaRef.current.value.length
            );
          }}
        />
        <TextArea
          innerRef={textAreaRef}
          className="textarea-title"
          textHeight={28}
          value={title}
          onChange={(e) => onSetTitle({ trelloNo, title: e.target.value })}
          onBlur={(e) => {
            if (e.target.value !== title) onUpdateTitle({ trelloNo, title: e.target.value });
          }}
        />
      </div>
      <div className="trello-list-more">
        <Popover
          position="bottom left"
          clickOutside
          content={<Popover_Trello trelloNo={trelloNo} boardNo={boardNo} title={title} />}
        >
          <div className="more-icon">
            <MdMoreHoriz />
          </div>
        </Popover>
      </div>
    </div>
  );
}

export default TrelloHeader;
