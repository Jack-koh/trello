import React, { Fragment, useState } from "react";
import "./AddList.scss";
import { MdAdd, MdClose } from "react-icons/md";

function AddList() {
  const [showForm, setShowForm] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
  };

  const closeHandler = e => {
    e.stopPropagation();
    setShowForm(false);
  };

  return (
    <article
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
          <Fragment>
            <input
              type="text"
              placeholder="Enter list title..."
              className="list_name_input"
            />
            <div className="list_add_control">
              <button className="submit">Add List</button>
              <MdClose onClick={e => closeHandler(e)} />
            </div>
          </Fragment>
        )}
      </form>
    </article>
  );
}

export default AddList;
