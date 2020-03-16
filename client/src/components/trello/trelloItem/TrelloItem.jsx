import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import { MdAdd, MdEdit } from 'react-icons/md'
import './TrelloItem.scss'
import { utilToggleHandler } from 'shared/utility'

import TrelloItemHeader from './trelloItemHeader/TrelloItemHeader'
import CreateCard from './createCard/CreateCard'

function TrelloItem(props) {
  const { trelloData, cardList, onRemoveCardItem } = props
  const [addCardStatus, setAddCardStatus] = useState(false)

  const dragStartHandler = (e, item) => {
    console.log(e.target.clientHeight)
    onRemoveCardItem(item)
  }

  const dropHandler = e => {
    console.log(e.target)
  }

  const cardListEl = cardList.map((item, i) => {
    return (
      <li
        className="trello_card_item_wrapper"
        key={i}
        draggable="true"
        onDragStart={e => dragStartHandler(e, item)}
      >
        <span>{item.title}</span>
        <div className="card_edit">
          <MdEdit />
        </div>
      </li>
    )
  })

  return (
    <div className="trello_list_content">
      <TrelloItemHeader trelloData={trelloData} />
      <ul className="trello_card_list_wrapper" onDragEnd={e => dropHandler(e)}>
        {cardListEl}
      </ul>
      {addCardStatus ? (
        <CreateCard
          trelloData={trelloData}
          utilToggleHandler={() => utilToggleHandler(addCardStatus, setAddCardStatus)}
        />
      ) : (
        <div className="card_form_button" onClick={() => setAddCardStatus(true)}>
          <MdAdd />
          {cardList.length > 0 ? 'Add another card' : 'Add a card'}
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTitle: payload => dispatch(action.updateTrelloItemStart(payload)),
    onRemoveCardItem: cardItem => dispatch(action.removeCardItem(cardItem))
  }
}

export default connect(null, mapDispatchToProps)(TrelloItem)
