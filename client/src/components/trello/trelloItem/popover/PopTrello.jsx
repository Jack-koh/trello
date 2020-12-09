import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import './PopTrello.scss';
import { Button, Popover } from 'components/custom/Elements';

function PopTrello(props) {
  const loading = useSelector((state) => state.trello.loading);
  const dispatch = useDispatch();
  const onDeleteItemHandler = (params) => dispatch(actions.deleteTrelloItemStart(params));

  const { trelloNo, boardNo, title, closeHandler } = props;
  const [onDelete, setOnDelete] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');

  const toggleDeleteHandler = () => {
    if (!onDelete) setConfirmTitle('');
    setOnDelete(!onDelete);
  };

  const deleteTrelloSubmit = (e) => {
    e.preventDefault();
    onDeleteItemHandler({ trelloNo, boardNo });
  };

  return (
    <Popover className="trello_popover" clickOutside close={closeHandler}>
      <div className="trello_popover_content">
        <div className="trello_popover_inner">
          <div className="trello_popover_title">List Actions</div>
          <nav>
            <ul>
              <li>
                <div className="actions_title">Add Card...</div>
              </li>
              <li>
                <div className="actions_title">Copy List...</div>
              </li>
              <li>
                <div className="actions_title">Move List...</div>
              </li>
              <li className="line_break">
                <div className="actions_title" onClick={toggleDeleteHandler}>
                  Delete List...
                </div>
                {onDelete && (
                  <form className="delete_form_field" onSubmit={(e) => deleteTrelloSubmit(e)}>
                    <input
                      className="delete_input"
                      type="text"
                      autoFocus
                      placeholder={`Type list name ${title}`}
                      onChange={(e) => setConfirmTitle(e.target.value)}
                    />
                    <Button
                      className="red_submit"
                      type="submit"
                      text="Delete"
                      loading={loading}
                      disabled={title !== confirmTitle}
                    />
                  </form>
                )}
              </li>
              <li>
                <div className="actions_title">Move All Cards in This List...</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Popover>
  );
}

export default withRouter(PopTrello);
