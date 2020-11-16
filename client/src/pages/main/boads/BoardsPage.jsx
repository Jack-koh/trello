import React, { useState } from 'react'
import GlobalLayout from 'layout/global/GlobalLayout'
import BoardsContent from 'components/main/boards/BoardsContent'
import './BoardsPage.scss'

function BoardsPage() {
  return (
    <GlobalLayout mode="main">
      <BoardsContent />
    </GlobalLayout>
  )
}

export default BoardsPage
