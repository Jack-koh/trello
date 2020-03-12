import React from 'react'
import BtnLoading from 'shared/btnLoading/BtnLoading'
import './Elements.scss'

export function Button(props) {
  const { type, text, loading, className, disabled } = props
  return (
    <button className={className} type={type} disabled={disabled}>
      {loading && <BtnLoading />}
      <span className={loading ? 'hide' : ''}>{text}</span>
    </button>
  )
}

export function Textarea(props) {
  const { type, value, placeholder, autoFocus, className, onChange, onBlur } = props
  return (
    <textarea
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      autoFocus={autoFocus}
      spellCheck="false"
    />
  )
}
