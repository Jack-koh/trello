import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import * as actions from 'store/actions';
import _ from 'shared/commonFunc';
import { Modal, Popover } from 'components/custom';
import { Button, TextArea } from 'components/custom';
import { MdClose, MdDeleteForever, MdSubject, MdAdd, MdCreditCard } from 'react-icons/md';
import './CardItem.scss';

const CardItem = ({ item, provided, snapshot, getStyle }) => {
  const dispatch = useDispatch();
  const onUpdateCard = (payload) => dispatch(actions.updateCardStart(payload));
  const onDeleteCard = () => dispatch(actions.deleteCardItemStart({ trelloNo: item.trelloNo, cardNo: item.cardNo })); // prettier-ignore
  const [card, setCard] = useState(item);

  const submitHandler = () => {
    const isEqual = _.isEqual(card, item);
    if (!isEqual) onUpdateCard(card);
  };

  return (
    <div className="card-item-wrapper">
      <Modal
        content={({ closeHandler }) => (
          <CardModalContent
            card={card}
            setCard={setCard}
            closeHandler={closeHandler}
            submitHandler={submitHandler}
          />
        )}
      >
        <li
          className={classNames('card-item', { isDragging: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
        >
          {item.label && <div className={classNames('label', { [item.label]: item.label })} />}
          <span>{item.title}</span>
          {item.description && (
            <div className="description-exsist">
              <MdSubject />
            </div>
          )}
        </li>
      </Modal>

      <Popover
        className="card-delete-popover"
        position="bottom right"
        gap={0}
        clickOutside
        content={
          <div className="check-delete" onClick={onDeleteCard}>
            Are you sure you want to delete?
          </div>
        }
      >
        <div className="card-edit">
          <MdDeleteForever />
        </div>
      </Popover>
    </div>
  );
};

export default CardItem;

const CardModalContent = ({ card, setCard, closeHandler, submitHandler }) => {
  const [descriptFocus, setDescriptFocus] = useState(false);
  const [defaultCard] = useState(card);
  const descriptionRef = useRef();
  const editRef = useRef();

  const { title, label, description } = card;

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (descriptionRef.current.contains(e.target) || editRef.current.contains(e.target)) return;
      setDescriptFocus(false);
    };
    if (descriptFocus) document.addEventListener('mousedown', clickOutsideHandler);
    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [descriptFocus]);

  const cancelHandler = () => {
    closeHandler();
    setCard(defaultCard);
  };

  const titleHanlder = (e) => setCard({ ...card, title: e.target.value });
  const descriptionHandler = (e) => setCard({ ...card, description: e.target.value });

  const labelElement = label ? (
    <i className={classNames('label', { [label]: label })} />
  ) : (
    <div className="rectangle-btn">
      <MdAdd />
    </div>
  );

  return (
    <div id="card-item-modal">
      <MdClose className="close-button" onClick={cancelHandler} />
      <div className="card-title-textarea-wrapper">
        <MdCreditCard />
        <TextArea className="card-title" value={title} textHiehgt={28} onChange={titleHanlder} />
      </div>
      <div className="card-title-label-wrapper">
        <h4>LABEL</h4>
        <div className="label-box-field">
          <Popover
            className="label-choice-popover"
            position="right top"
            clickOutside
            content={<PopoverContent card={card} setCard={setCard} />}
          >
            {labelElement}
          </Popover>
        </div>
      </div>
      <div className="card-title-description-wrapper">
        <div className="description-title">
          <MdSubject />
          <h3>Description</h3>
        </div>
        <TextArea
          innerRef={descriptionRef}
          className="description-text-area"
          textHiehgt={28}
          value={description}
          placeholder="Add a more detailed description..."
          onClick={() => setDescriptFocus(true)}
          onChange={descriptionHandler}
        />
        {descriptFocus && (
          <div ref={editRef} className="edit-button-field">
            <div className="edit-submit" onClick={() => setDescriptFocus(false)}>
              Save
            </div>
            <MdClose className="close-descript-button" onClick={() => setDescriptFocus(false)} />
          </div>
        )}
      </div>
      <div className="card-util-wrapper">
        <Button className="cancel" text="Cancel" onClick={cancelHandler} />
        <Button
          className="green_submit"
          type="submit"
          text="Save"
          onClick={() => {
            submitHandler();
            closeHandler();
          }}
        />
      </div>
    </div>
  );
};

const PopoverContent = ({ card, setCard }) => {
  const { label } = card;
  return (
    <div className="label-choice-content">
      <h4>LABELS</h4>
      {['green', 'blue', 'orange', 'yellow', 'red'].map((color) => {
        return (
          <div
            key={color}
            className={classNames('label-choice-box', { [color]: color, active: color === label })}
            onClick={() => setCard({ ...card, label: color })}
          />
        );
      })}
    </div>
  );
};
