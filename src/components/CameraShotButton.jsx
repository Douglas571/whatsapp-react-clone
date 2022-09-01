import './CameraShotButton.css'
import { useState, useEffect, useRef } from 'react'

export default function CameraShotButton(props) {
  let {className = '', onTouch, onHold, onHoldEnd} = props

  let [touching, setTouching] = useState(false)
  let [holding, setHolding] = useState(false)
  let [take, setTake] = useState(false)

  let touchingRef = useRef()
  let timerRef = useRef()

  className += ' camera-shot-button'
  className += take ? ' hold' : ' fold'

  function handleTouch() {
    setTouching(true)
    setTake(true)
  }

  useEffect(() => {
    touchingRef.current = touching
    timerRef.current = setTimeout(handleHold, 500)

  }, [touching])

  function handleHold() {
    if(touchingRef.current) {
      setHolding(true)
      onHold()
    }
  }

  function handleTouchEnd(evt) {
    //console.log({evt})
    setTouching(false)

    if (holding) {
      onHoldEnd()
      setHolding(false)
    } else {
      onTouch()
      clearTimeout(timerRef.current)
    }
    setTake(false)
  }

  return (
    <div className={className}
      onTouchStart={handleTouch}
      
      onTouchEnd={handleTouchEnd}>
      <div>
      </div>
    </div>
    )
}