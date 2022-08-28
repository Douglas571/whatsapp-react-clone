import './IconButton.css'

import {useState, useEffect} from 'react'
import styled from 'styled-components'

import Ripple from './Ripple.jsx'

function IconButton(props) {
  let [timeId, setTimeId] = useState(null)
  const [ripples, setRipples] = useState([])

  function handleClick(evt) {
    const button = evt.target
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const r = {
      id: Date.now(),
      position: {
        height: `${diameter}px`, 
        width: `${diameter}px`,
        left: `${event.clientX - button.offsetLeft - radius}px`,
        top: `${event.clientY - button.offsetTop - radius}px`,
      }
    }

    if (ripples[0]) {
      ripples.shift()
    }

    setRipples([...ripples, r])
  }

  return (
      <button
        className="icon-button"
        onClick={handleClick}
      > 

        {props.children}
        {ripples.map( r => <Ripple key={r.id} position={r.position}/>)}
      </button>
    )
}
  
const styledIconButton = styled(IconButton)`
`

export default styledIconButton