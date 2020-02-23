import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./CreateList.scss";
import { MdAdd, MdClose } from "react-icons/md";
import { utilSetVisible } from "shared/utility";
function AddList() {
  console.log("AddList - check");
  const wrapperRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [trelloData, setTrelloData] = useState(
    JSON.parse(localStorage.getItem("trello"))
  );
  useEffect(() => {
    const getTrello = async () => {
      const respData = await axios.get("trello/get", {
        params: { boardNo: trelloData.boardNo }
      });
      console.log(respData);
    };
    getTrello();

    const setVisibility = e => {
      if (wrapperRef.current.contains(e.target)) return;
      utilSetVisible(e, showForm, setShowForm);
    };
    document.addEventListener("click", setVisibility);
    return () => document.removeEventListener("click", setVisibility);
  }, [showForm]);

  const submitHandler = async e => {
    e.preventDefault();
    const { boardNo, userNo, userEmail, userName } = trelloData;
    const payload = { boardNo, userNo, userEmail, userName, title };
    const respData = await axios.post("trello/create", payload);
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

export default AddList;
