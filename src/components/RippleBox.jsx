import './RippleBox.css'
import { useState, useRef, useEffect } from 'react'

import Ripple from './Ripple.jsx'

const RippleBox = (props) => {

  const containerRef = useRef()
  const [ripples, setRipples] = useState([])

  let {children, position, onClick, inLine, className, id} = props

  function addRipple(evt) {
    console.log('Adding ripple!...')
    const container = containerRef.current
    const button = evt.target
    const diameter = Math.max(container.clientWidth, container.clientHeight);
    const radius = diameter / 2;

    console.log({x: event.clientX, y: event.clientY})
    console.log({c: container.getBoundingClientRect()});

    const cl = container.getBoundingClientRect().left
    const ct = container.getBoundingClientRect().top

    const newRipple = {
      id: Date.now(),
      position: {
        height: `${diameter}px`, 
        width: `${diameter}px`,
        left: `${event.clientX - cl- radius}px`,
        top: `${event.clientY - ct - radius}px`,
      }
    }

    console.log(newRipple.position);

    if (ripples[0]) {
      ripples.shift()
    }

    setRipples([...ripples, newRipple])
  }

  useEffect(() => {
    if (onClick) onClick()
  }, [ripples])

  className += ' ripple-box'
  className += inLine ? ' inline-block' : ''

  return (
    <div 
      id={id}
      ref={containerRef}
      className={className}
      onClick={addRipple}>
      {children}
      { ripples.map( r => <Ripple key={r.id} position={r.position}/>)}
    </div>
  )
}

export default RippleBox