import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import classNames from 'classnames';
import * as actions from 'store/actions';
import _ from 'shared/commonFunc';
import { Modal, Popover } from 'components/custom';
import { TextArea } from 'components/custom';
import { MdClose, MdSubject, MdAdd, MdCreditCard } from 'react-icons/md';
import './CardItem.scss';

const CardItem = ({ item, provided, snapshot, getStyle }) => {
  const dispatch = useDispatch();
  const onUpdateCard = (payload) => dispatch(actions.updateCardStart(payload));
  const [card, setCard] = useState(item);

  return (
    <Modal
      clickOutside={() => {
        const isEqual = _.isEqual(card, item);
        if (!isEqual) onUpdateCard(card);
      }}
      content={({ closeHandler }) => (
        <CardModalContent card={card} closeHandler={closeHandler} setCard={setCard} />
      )}
    >
      <li
        className={classNames('card-item-wrapper', { isDragging: snapshot.isDragging })}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided.draggableProps.style, snapshot)}
      >
        {item.label && <div className={classNames('label', { [item.label]: item.label })} />}
        <span>{item.title}</span>
        <div className="card-edit">
          <MdEdit />
        </div>
      </li>
    </Modal>
  );
};

export default CardItem;

const CardModalContent = ({ card, closeHandler, setCard }) => {
  const [descriptFocus, setDescriptFocus] = useState(false);
  const descriptionRef = useRef();
  const editRef = useRef();

  const { title, label, description } = card;

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (descriptionRef.current.contains(e.target) || editRef.current.contains(e.target)) return;
      setDescriptFocus(false);
    };
    if (descriptFocus) {
      document.addEventListener('mousedown', clickOutsideHandler);
    }

    return () => document.removeEventListener('mousedown', clickOutsideHandler);
  }, [descriptFocus]);

  return (
    <div id="card-item-modal">
      <MdClose className="close-button" onClick={closeHandler} />
      <div className="card-title-textarea-wrapper">
        <MdCreditCard />
        <TextArea
          className="card-title"
          value={title}
          textHiehgt={28}
          onChange={(e) => {
            const title = e.target.value;
            setCard((prevState) => {
              return { ...prevState, title };
            });
          }}
        />
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
            {label ? (
              <i className={classNames('label', { [label]: label })} />
            ) : (
              <div className="rectangle-btn">
                <MdAdd />
              </div>
            )}
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
          onChange={(e) => {
            const description = e.target.value;
            setCard((prevState) => {
              return { ...prevState, description };
            });
          }}
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
            onClick={() =>
              setCard((prevState) => {
                return { ...prevState, label: color };
              })
            }
          />
        );
      })}
    </div>
  );
};
