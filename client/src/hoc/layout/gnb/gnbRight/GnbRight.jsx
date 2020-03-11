import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { MdAdd, MdInfoOutline, MdAddAlert, MdAccountCircle } from 'react-icons/md'
import { utilSetToggle } from 'shared/utility'
import UserPopover from 'components/popover/user/UserPopover'

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
      <div className="user_btn">
        <MdAccountCircle onClick={popoverHandler} />
        {userPopover && (
          <UserPopover utilSetToggle={e => utilSetToggle(e, userPopover, setUserPopover)} />
        )}
      </div>
    </div>
  )
}

export default withRouter(GnbRight)
