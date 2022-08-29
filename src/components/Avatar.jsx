import './Avatar.css'
import { useState } from 'react'

const Avatar = (props) => {

  let {src, bubble} = props
  let className = "avatar"

  if (bubble) {
    console.log({bubble})
  }

  className += props.small ? ' small' : ''
  
  return (
    <div className={className}>
      <img
        src={src}
      />
      { bubble ?
        <div className="bubble">{bubble}</div>
        : null
      }
    </div>
  )
}

export default Avatar