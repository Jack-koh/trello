import React, { useState } from 'react'
import DialogCreateBoard, {
  utilSetVisibility
} from 'components/dialog/createBoard/Dialog_create_board'
import './CreateBoard.scss'

function CreateBoard() {
  const [dialog, setDialog] = useState(false)
  const onCreateDialogHandler = () => {
    setDialog(!dialog)
  }
  return (
    <>
      <li className="create_board bg_gray">
        <div onClick={onCreateDialogHandler}>
          <div className="create_board_inner">
            <span className="create_item_title">Create new board</span>
          </div>
          <div className="create_hover_action" />
        </div>
      </li>
      {dialog && (
        <DialogCreateBoard
          closeDialog={() => setDialog(false)}
          setVisibility={e => utilSetVisibility(e, dialog, setDialog)}
        />
      )}
    </>
  )
}

export default CreateBoard
