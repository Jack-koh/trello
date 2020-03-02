import React, { useState } from 'react'
import './LogoLoading.scss'

function LogoLoading() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="logo" />
      {loading && (
        <div className="logo_animation">
          <div className="animation_bar_left" />
          <div className="animation_bar_right" />
        </div>
      )}
    </>
  )
}

export default LogoLoading
