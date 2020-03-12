import React from 'react'
import { connect } from 'react-redux'
import './TrelloList.scss'

import TrelloItem from './trelloItem/TrelloItem'

function TrelloList(props) {
  const { trelloList } = props
  const trelloListEl = trelloList.map((trelloData, i) => {
    return (
      <article key={i} className="trello_list_wrapper">
        <TrelloItem trelloData={trelloData} />
      </article>
    )
  })

  return trelloListEl
}

const mapStateToProps = state => {
  return {
    trelloList: state.trello.list
  }
}

export default connect(mapStateToProps)(TrelloList)
