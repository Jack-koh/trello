import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions";
import "./CreateList.scss";
import { MdAdd, MdClose } from "react-icons/md";
import { utilSetVisible } from "shared/utility";
function AddList(props) {
  console.log("AddList - check");
  const wrapperRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [trelloData] = useState(JSON.parse(localStorage.getItem("trello")));

  useEffect(() => {
    const setVisibility = e => {
      if (wrapperRef.current.contains(e.target)) return;
      utilSetVisible(e, showForm, setShowForm);
    };
    document.addEventListener("click", setVisibility);
    return () => document.removeEventListener("click", setVisibility);
  }, [showForm, trelloData.boardNo]);

  const submitHandler = async e => {
    e.preventDefault();
    const { boardNo, userNo, userEmail, userName } = trelloData;
    const payload = { boardNo, userNo, userEmail, userName, title };
    props.onCreateTrelloList(payload);
  };

  const closeHandler = e => {
    e.stopPropagation();
    setShowForm(false);
  };

  return (
    <article
      ref={wrapperRef}
      className={`add_list ${showForm ? "on" : "off"}`}
      onClick={() => setShowForm(true)}
    >
      <form onSubmit={e => submitHandler(e)}>
        {!showForm ? (
          <div className="place_holder">
            <MdAdd className="add_icon" />
            <span>Add another list</span>
          </div>
        ) : (
          <React.Fragment>
            <input
              type="text"
              placeholder="Enter list title..."
              className="list_name_input"
              onChange={e => setTitle(e.target.value)}
            />
            <div className="list_add_control">
              <button className="submit">Add List</button>
              <MdClose onClick={e => closeHandler(e)} />
            </div>
          </React.Fragment>
        )}
      </form>
    </article>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateTrelloList: payload => dispatch(actions.createTrelloListStart(payload))
  };
};

export default connect(null, mapDispatchToProps)(React.memo(AddList));
