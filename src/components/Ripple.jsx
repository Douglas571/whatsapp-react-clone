import './IconButton.css'
import { useRef, useEffect } from 'react'

const Ripple = ({position}) => {

  useEffect(() => {
    //console.log({position})
  }, [])

  return (
    <span 
      className="ripple"
      style={position}
    ></span>
  )
}

export default Ripple