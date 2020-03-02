import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { MdAdd, MdInfoOutline, MdAddAlert, MdAccountCircle } from 'react-icons/md'

import UserPopover, { utilSetVisibility } from 'components/popover/user/UserPopover'

function GnbRight() {
  const [userPopover, setUserPopover] = useState(false)

  const popoverHandler = () => {
    setUserPopover(!userPopover)
  }

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
      <div className="circle_btn">
        <MdAccountCircle onClick={popoverHandler} />
        {userPopover && (
          <UserPopover setVisibility={e => utilSetVisibility(e, userPopover, setUserPopover)} />
        )}
      </div>
    </div>
  )
}

export default withRouter(GnbRight)
