import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { boardActions } from 'store/actions';
import { Button } from 'components/custom';
import './Popover_DeleteBoard.scss';

function Popover_DeleteBoard({ boardNo, title }) {
  const loading = useSelector((state) => state.board.deleteLoading);
  const dispatch = useDispatch();
  const onDeleteBoard = (boardNo) => dispatch(boardActions.deleteBoard(boardNo));

  const [onDelete, setOnDelete] = useState(false);
  const [confirmTitle, setConfirmTitle] = useState('');

  const toggleDeleteHandler = () => {
    if (!onDelete) setConfirmTitle('');
    setOnDelete(!onDelete);
  };

  const deleteBoardSubmit = (e) => {
    e.preventDefault();
    onDeleteBoard(boardNo);
  };

  return (
    <div id="delete-bard-popover">
      <div className="trello_popover_inner">
        <div className="trello_popover_title">List Actions</div>
        <nav>
          <ul>
            <li className="line_break">
              <div className="actions_title" onClick={toggleDeleteHandler}>
                Delete Board...
              </div>
              {onDelete && (
                <form className="delete_form_field" onSubmit={deleteBoardSubmit}>
                  <input
                    className="delete_input"
                    type="text"
                    autoFocus
                    placeholder={`Type board name ${title}`}
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
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Popover_DeleteBoard;
