import './Avatar.css'
import { useState } from 'react'

const Avatar = (props) => {

  let {src, bubble} = props
  if (bubble) {
    console.log({bubble})
  }
  return (
    <div className="avatar">
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