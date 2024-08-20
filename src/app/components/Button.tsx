import React from 'react'

export default function Button(props:any) {
  return (
    <button className="button-50" role="button" onClick={props.onClick}>{props.buttonText}</button>
  )
}
