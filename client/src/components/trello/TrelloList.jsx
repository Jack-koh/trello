import React, { useState } from 'react';
import './TrelloList.scss';

function TrelloList() {
  const [text, setText] = useState('');
  const textAreaHandler = e => {
    const obj = e.target;
    setText(obj.value);
    obj.style.height = '0';
    obj.style.height = 20 + obj.scrollHeight + 'px';
  };
  return (
    <article className="trello_list_wrapper">
      <div className="trello_list_content">
        <div className="trello_list_header">
          <textarea
            type="text"
            value={text}
            onChange={e => textAreaHandler(e)}
          />
        </div>
        <div className="trello_list_cards"></div>
        <div className="trello_list_composer">다시만나요</div>
      </div>
    </article>
  );
}

export default TrelloList;
