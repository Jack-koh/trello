import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdAdd, MdInfoOutline, MdAddAlert, MdAccountCircle } from 'react-icons/md';

import { Popover } from 'components/custom';
import Popover_User from './popover/Popover_User';

function GnbRight() {
  return (
    <div className="gnb_right">
      <div className="rectangle-btn">
        <MdAdd />
      </div>
      <div className="rectangle-btn">
        <MdInfoOutline />
      </div>
      <div className="rectangle-btn">
        <MdAddAlert />
      </div>
      <Popover
        position="bottom right"
        clickOutside
        content={({ closeHandler }) => <Popover_User closeHandler={closeHandler} />}
      >
        <div className="user_btn">
          <MdAccountCircle />
        </div>
      </Popover>
    </div>
  );
}

export default withRouter(GnbRight);
