import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/actions';
import { Input } from 'components/custom';
import classNames from 'classnames';
import _ from 'shared/commonFunc';
import { MdHome, MdSearch, MdClose } from 'react-icons/md';

function HeaderLeft() {
  const history = useHistory();
  const location = history.location.pathname;

  return (
    <div className="gnb_left">
      <Link to="/main/board" className="rectangle-btn">
        <MdHome />
      </Link>
      {location.includes('/main/trello') ? <TrelloSearchInput /> : <BoardSearchInput />}
    </div>
  );
}

export default HeaderLeft;

const BoardSearchInput = () => {
  const dispatch = useDispatch();
  const onGetboardList = () => dispatch(actions.getBoardListStart());
  const onSetSearchText = (searchText) => dispatch(actions.setBoardSearchText(searchText));
  const searchText = useSelector((state) => state.board.searchText);
  const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  const [inputText, setInputText] = useState(searchText);

  const searchHandler = () => {
    onSetSearchText(inputText);
    onGetboardList();
    const delayBlur = _.debounce(() => inputRef.current.blur(), 0);
    delayBlur();
  };

  const resetSearchHandler = () => {
    onSetSearchText('');
    setInputText('');
    onGetboardList();
    setFocus(false);
  };

  useEffect(() => {
    return () => onSetSearchText('');
  }, []);

  return (
    <div className="search-input-wrap">
      <Input
        innerRef={inputRef}
        onClick={() => setFocus(true)}
        className={classNames('search-input', { active: !!searchText })}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyEnter={searchHandler}
        onFocus={() => inputRef.current.setSelectionRange(0, inputText.length)}
        onBlur={() => {
          setInputText(searchText);
          setFocus(false);
        }}
      />
      {!!searchText && <MdClose className="close-icon" onClick={resetSearchHandler} />}
      {!searchText && !focus && <MdSearch className="search-icon" />}
    </div>
  );
};

const TrelloSearchInput = () => {
  const dispatch = useDispatch();
  const onGetTrelloList = (boardNo) => dispatch(actions.getTrelloListStart(boardNo));
  const onSetSearchText = (searchText) => dispatch(actions.setTrelloSearchText(searchText));
  const searchText = useSelector((state) => state.trello.searchText);
  const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  const [inputText, setInputText] = useState(searchText);

  const trelloStorage = JSON.parse(localStorage.getItem('trello'));

  const searchHandler = () => {
    onSetSearchText(inputText);
    onGetTrelloList(trelloStorage.boardNo);
    const delayBlur = _.debounce(() => inputRef.current.blur(), 0);
    delayBlur();
  };

  const resetSearchHandler = () => {
    onSetSearchText('');
    setInputText('');
    onGetTrelloList(trelloStorage.boardNo);
    setFocus(false);
  };

  useEffect(() => {
    return () => onSetSearchText('');
  }, []);

  return (
    <div className="search-input-wrap">
      <Input
        innerRef={inputRef}
        onClick={() => setFocus(true)}
        className={classNames('search-input', { active: !!searchText })}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyEnter={searchHandler}
        onFocus={() => inputRef.current.setSelectionRange(0, inputText.length)}
        onBlur={() => {
          setInputText(searchText);
          setFocus(false);
        }}
      />
      {!!searchText && <MdClose className="close-icon" onClick={resetSearchHandler} />}
      {!searchText && !focus && <MdSearch className="search-icon" />}
    </div>
  );
};
