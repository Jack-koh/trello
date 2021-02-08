import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { trelloActions } from 'store/actions';
import { MdMoreHoriz } from 'react-icons/md';
import { Popover, TextArea } from 'components/custom';
import Popover_Trello from 'components/trello/trelloItem/popover/Popover_Trello';
import './TrelloHeader.scss';

function TrelloHeader({ trello, dragHandleProps }) {
  const dispatch = useDispatch();
  const onUpdateTitle = (payload) => dispatch(trelloActions.update(payload));
  const onSetTitle = (payload) => dispatch(trelloActions.setTitle(payload));

  const { trelloNo, boardNo, title } = trello;
  const textAreaRef = useRef();
  const [defaultTitle, setDefaultTitle] = useState(title);

  return (
    <div className="trello-list-header" {...dragHandleProps}>
      <div className="textarea-wrapper">
        <div
          className="preventer"
          onClick={() => {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(0, textAreaRef.current.value.length);
          }}
        />
        <TextArea
          innerRef={textAreaRef}
          className="textarea-title"
          textHeight={28}
          value={title}
          onChange={(e) => onSetTitle({ trelloNo, title: e.target.value })}
          onBlur={(e) => {
            if (e.target.value !== defaultTitle) {
              onUpdateTitle({ trelloNo, title: e.target.value });
              setDefaultTitle(e.target.value);
            }
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
