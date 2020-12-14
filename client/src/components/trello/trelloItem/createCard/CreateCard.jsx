import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from 'store/actions';
import { MdClose } from 'react-icons/md';
import { Button, TextArea } from 'components/custom';
import './CreateCard.scss';

function CreateCard({ trello, closeHandler, loading }) {
  const dispatch = useDispatch();
  const onCreateCard = (payload) => dispatch(actions.createCardStart(payload));

  const { trelloNo } = trello;
  const [title, setTitle] = useState('');
  const wrapperRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.length) {
      onCreateCard({ trelloNo: trelloNo, title });
      setTitle('');
    }
  };

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (wrapperRef.current.contains(e.target)) return;
      closeHandler();
    };

    document.addEventListener('click', clickOutsideHandler);
    return () => document.removeEventListener('click', clickOutsideHandler);
  }, []);

  return (
    <form className="add-card-form-field" ref={wrapperRef} onSubmit={submitHandler}>
      <div className="trello_card_wrapper">
        <TextArea
          className="create_card_title"
          placeholder="Enter a title for this card"
          textHeight={57}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="card_add_control">
        <Button className="green_submit" type="submit" text="Add Card" loading={loading} />
        <MdClose onClick={closeHandler} />
      </div>
    </form>
  );
}

export default CreateCard;
