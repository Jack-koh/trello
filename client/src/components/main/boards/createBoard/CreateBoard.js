import React, { useState } from "react";
import DialogCreateBoard, {
  setVisibility
} from "components/dialog/createBoard/Dialog_create_board";
import "./CreateBoard.scss";

function CreateBoard(props) {
  console.log("CreateBoard - check");
  const [dialog, setDialog] = useState(false);
  const onCreateDialogHandler = () => {
    setDialog(!dialog);
  };
  return (
    <React.Fragment>
      <li className="create_board bg_gray" onClick={onCreateDialogHandler}>
        <div className="create_board_inner">
          <span className="create_item_title">Create new board</span>
        </div>
        <div className="create_hover_action"></div>
      </li>
      {dialog && (
        <DialogCreateBoard
          closeDialog={() => setDialog(false)}
          setVisibility={e => setVisibility(e, dialog, setDialog)}
        />
      )}
    </React.Fragment>
  );
}

export default CreateBoard;
