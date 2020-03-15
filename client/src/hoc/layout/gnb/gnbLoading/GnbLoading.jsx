import React from 'react'
import { connect } from 'react-redux'
import './GnbLoading.scss'

function GnbLoading(props) {
  const { loading } = props
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

const mapStateToProps = state => {
  return {
    loading: state.loading.progress
  }
}

export default connect(mapStateToProps)(GnbLoading)
