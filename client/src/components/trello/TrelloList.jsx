import React, { useState } from 'react';
import { MdMoreHoriz, MdAdd } from 'react-icons/md';
import './TrelloList.scss';

function TrelloList() {
  const [text, setText] = useState('text');
  const autosizeHandler = e => {
    const obj = e.target;
    setText(obj.value);
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    obj.style.cssText = 'height:20px; padding: 0';
    obj.style.cssText = `height: ${obj.scrollHeight}px`;
  };

  const test = e => {
    e.preventDefault();
  };
  return (
    <article className="trello_list_wrapper">
      <div className="trello_list_content">
        <div className="trello_list_header">
          <textarea
            type="text"
            value={text}
            onChange={e => autosizeHandler(e)}
          />
          <div className="trello_list_more">
            <MdMoreHoriz />
          </div>
        </div>
        <div className="trello_list_cards" />
        <div className="trello_list_composer">
          <div className="trello_list_add_card" onClick={e => test(e)}>
            <MdAdd />
            Add a card
          </div>
        </div>
      </div>
    </article>
  );
}

export default TrelloList;
