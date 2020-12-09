import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import { MdMoreHoriz } from 'react-icons/md';
import './TrelloHeader.scss';
import { Textarea, PopContainer } from 'components/custom/Elements';
import PopTrello from 'components/trello/trelloItem/popover/PopTrello';

function TrelloHeader({ trello, dragHandleProps }) {
  const dispatch = useDispatch();
  const onUpdateTitle = (payload) => dispatch(actions.updateTrelloItemStart(payload));

  const { trelloNo, boardNo, title: propsTitle } = trello;
  const [title, setTitle] = useState('');
  const [popover, setPopover] = useState(false);
  const textAreaRef = useRef();
  const preventerRef = useRef();
  const updateTitle = () => {
    if (propsTitle !== title) onUpdateTitle({ trelloNo, title });
  };

  const autosizeHandler = (e) => {
    setTitle(e.target.value);
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:2.8rem;';
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`;
  };

  useEffect(() => {
    setPopover(false);
  }, [trello]);

  useEffect(() => {
    setTitle(propsTitle);
  }, [propsTitle]);

  return (
    <div
      className="trello-list-header"
      {...dragHandleProps}
      onClick={(e) => {
        e.target === preventerRef.current
          ? textAreaRef.current.focus()
          : textAreaRef.current.blur();
      }}
    >
      <div className="textarea-wrapper">
        <div ref={preventerRef} className="preventer" />
        <Textarea
          className="textarea-title"
          type="text"
          value={title}
          onChange={(e) => autosizeHandler(e)}
          onBlur={updateTitle}
          innerRef={textAreaRef}
        />
      </div>
      <div className="trello-list-more">
        <PopContainer>
          <div className="more-icon" onClick={() => setPopover(!popover)}>
            <MdMoreHoriz />
          </div>
          {popover && (
            <PopTrello
              trelloNo={trelloNo}
              boardNo={boardNo}
              title={title}
              closeHandler={() => setPopover(false)}
            />
          )}
        </PopContainer>
      </div>
    </div>
  );
}

export default TrelloHeader;
