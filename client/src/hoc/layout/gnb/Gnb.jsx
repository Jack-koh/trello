import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './Gnb.scss'

import GnbLoading from './gnbLoading/GnbLoading'
import GnbLeft from './gnbLeft/GnbLeft'
import GnbRight from './gnbRight/GnbRight'

const Gnb = props => {
  const { location, children } = props
  const [background, setBackground] = useState({ background: '#026aa7' })

  useEffect(() => {
    const main = location.pathname.substring(1).split('/')[0]
    main !== 'main'
      ? setBackground({ background: 'rgba(0,0,0,.15)' })
      : setBackground({ background: '#026aa7' })
  }, [location])

  return (
    <>
      <header className="gnb_wrap" style={background}>
        <GnbLeft />
        <GnbLoading />
        <GnbRight />
      </header>
      {children}
    </>
  )
}

export default withRouter(Gnb)
