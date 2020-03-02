import React, { useEffect, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import './TrelloPopover.scss'
import { utilSetVisible } from 'shared/utility'

export const utilSetVisibility = utilSetVisible
function TrelloPopover(props) {
  const { setVisibility } = props
  const wrapperRef = useRef(null)

  useEffect(() => {
    // 클릭 아웃사이드 기능 생성 및 제거1
    const clickOutsideHandler = e => {
      if (wrapperRef.current.parentElement.contains(e.target)) return
      setVisibility(e)
    }

    document.addEventListener('click', clickOutsideHandler, true)

    return () => {
      document.removeEventListener('click', clickOutsideHandler, true)
    }
  }, [setVisibility, wrapperRef])

  return (
    <div ref={wrapperRef} className="trello_popover">
      <div className="trello_popover_content">
        <div className="trello_popover_inner">
          <div className="trello_popover_title">List Actions</div>
          <nav>
            <ul>
              <li>
                <div>Add Card...</div>
              </li>
              <li>
                <div>Copy List...</div>
              </li>
              <li>
                <div>Move List...</div>
              </li>
              <li className="line_break">
                <div>Delete List...</div>
              </li>
              <li>
                <div>Move All Cards in This List...</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default withRouter(TrelloPopover)
