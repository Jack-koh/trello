import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { MdAdd, MdInfoOutline, MdAddAlert, MdAccountCircle } from 'react-icons/md';

import { PopContainer } from 'components/custom/Elements';
import PopUser from './popover/PopUser';

function GnbRight() {
  const [popover, setPopover] = useState(false);

  return (
    <div className="gnb_right">
      <div className="rectangle_btn">
        <MdAdd />
      </div>
      <div className="rectangle_btn">
        <MdInfoOutline />
      </div>
      <div className="rectangle_btn">
        <MdAddAlert />
      </div>
      <div className="user_btn">
        <PopContainer>
          <MdAccountCircle onClick={() => setPopover(!popover)} />
          {popover && <PopUser closeHandler={() => setPopover(false)} />}
        </PopContainer>
      </div>
    </div>
  );
}

export default withRouter(GnbRight);
