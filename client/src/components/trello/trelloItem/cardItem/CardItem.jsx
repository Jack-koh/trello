import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import classNames from 'classnames';
import { Modal } from 'components/custom/Elements';
import * as actions from 'store/actions';
import { PopContainer, Popover } from 'components/custom/Elements';
import { MdClose, MdSubject, MdAdd, MdCreditCard } from 'react-icons/md';
import './CardItem.scss';

const CardItem = ({ item, provided, snapshot, getStyle }) => {
  const [dialog, setDialog] = useState(false);
  const [localTitle, setLocalTitle] = useState('');

  const { title, label } = item;

  useEffect(() => {
    if (!dialog) setLocalTitle(title);
  }, [dialog]);

  return (
    <Modal
      content={<CardModalContent item={item} closeHandler={() => setDialog(false)} />}
      closeOutside={() => setDialog(false)}
      open={dialog}
    >
      <li
        className={classNames('card-item-wrapper', { isDragging: snapshot.isDragging })}
        onClick={() => setDialog(!dialog)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getStyle(provided.draggableProps.style, snapshot)}
      >
        {label && <div className={classNames('label', { [label]: label })} />}
        <span>{localTitle}</span>
        <div className="card-edit">
          <MdEdit />
        </div>
      </li>
    </Modal>
  );
};

export default CardItem;

const CardModalContent = ({ item, closeHandler }) => {
  const dispatch = useDispatch();
  const onSetCard = (payload) => dispatch(actions.setCard(payload));
  const onUpdateCard = (payload) => dispatch(actions.updateCardStart(payload));
  const [descriptFocus, setDescriptFocus] = useState(false);
  const [popover, setPopover] = useState(false);
  const descriptionRef = useRef();
  const editRef = useRef();

  const { trelloNo, cardNo, title, label, description } = item;

  const autosizeHandler = (e) => {
    // setTitle(e.target.value);
    // 스크롤 높이값만큼 오브젝트 높이를 맞춰준다.
    e.target.style.cssText = 'height:2.8rem;';
    e.target.style.cssText = `height: ${e.target.scrollHeight / 10}rem`;
  };

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
        <textarea
          type="text"
          className="textarea-title"
          value={title}
          onChange={(e) => {
            autosizeHandler(e);
            onSetCard({ trelloNo, cardNo, name: 'title', value: e.target.value });
          }}
          spellCheck="false"
          onBlur={() => onUpdateCard(item)}
        />
      </div>
      <div className="card-title-label-wrapper">
        <h4>LABELS</h4>
        <div className="label-box-field">
          <PopContainer>
            {label ? (
              <i
                className={classNames('label', { [label]: label })}
                onClick={() => setPopover(!popover)}
              />
            ) : (
              <div className="rectangle-btn" onClick={() => setPopover(!popover)}>
                <MdAdd />
              </div>
            )}
            {popover && (
              <Popover
                clickOutside
                close={() => {
                  setPopover(false);
                  onUpdateCard(item);
                }}
              >
                <h4>LABELS</h4>
                {['green', 'blue', 'orange', 'yellow', 'red'].map((color) => {
                  return (
                    <div
                      key={color}
                      className={classNames('label-choice-box', {
                        [color]: color,
                        active: color === label,
                      })}
                      onClick={() => {
                        onSetCard({ trelloNo, cardNo, name: 'label', value: color });
                      }}
                    />
                  );
                })}
              </Popover>
            )}
          </PopContainer>
        </div>
      </div>
      <div className="card-title-description-wrapper">
        <div className="description-title">
          <MdSubject />
          <h3>Description</h3>
        </div>
        <textarea
          ref={descriptionRef}
          onClick={() => setDescriptFocus(true)}
          value={description ? description : ''}
          type="text"
          className="textarea-title description-text-area"
          onChange={(e) => {
            autosizeHandler(e);
            onSetCard({ trelloNo, cardNo, name: 'description', value: e.target.value });
          }}
          placeholder="Add a more detailed description..."
          spellCheck="false"
          onBlur={() => onUpdateCard(item)}
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
