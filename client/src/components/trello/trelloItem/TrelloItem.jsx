import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import { MdAdd, MdEdit } from 'react-icons/md'
import './TrelloItem.scss'
import { utilToggleHandler } from 'shared/utility'

import TrelloItemHeader from './trelloItemHeader/TrelloItemHeader'
import CardAddForm from './createCard/CreateCard'

function TrelloItem(props) {
  const { trelloData } = props
  const [addCardStatus, setAddCardStatus] = useState(false)

  const cardList = trelloData.cardList.map((item, i) => {
    return (
      <div className="trello_card_item_wrapper" key={i}>
        <span>{item.title}</span>
        <div className="card_edit">
          <MdEdit />
        </div>
      </div>
    )
  })

  return (
    <div className="trello_list_content">
      <TrelloItemHeader trelloData={trelloData} />
      <div className="trello_card_list_wrapper">{cardList}</div>
      {addCardStatus ? (
        <CardAddForm
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
    onUpdateTitle: payload => dispatch(action.updateTrelloItemStart(payload))
  }
}

export default connect(null, mapDispatchToProps)(TrelloItem)
