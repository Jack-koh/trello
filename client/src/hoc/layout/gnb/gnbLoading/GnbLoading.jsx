import React from 'react'
import { useSelector } from 'react-redux'
import './GnbLoading.scss'

function GnbLoading() {
  const loading = useSelector(state => state.loading.progress)
  return (
    <>
      {loading ? (
        <div className="logo_animation_wrapper">
          <div className="logo_animation">
            <div className="animation_bar_left" />
            <div className="middle_bar" />
            <div className="animation_bar_right" />
          </div>
          <div className="text_logo" />
        </div>
      ) : (
        <div className="logo" />
      )}
    </>
  )
}

export default GnbLoading
