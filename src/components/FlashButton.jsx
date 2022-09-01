import './FlashButton.css'
import { useState, useEffect, useRef } from 'react'

import IconButton from './IconButton.jsx'
import Icon from './Icon.jsx'
import RippleBox from './RippleBox.jsx'


// TO-DO: Add the animation of moving down.

const flash = {
  on: 'flash_on',
  off: 'flash_off',
  auto: 'flash_auto',
}

export default function FlashButton(props) {

  let { onChange } = props
  let [currentState, setCurrentState] = useState('off')
  let [stack, setStack] = useState(
    [
      {
        id: 1,
        state: 'on',
        icon: flash['on'],
      },
      {
        id: 2,
        state: 'off',
        icon: flash['off'],
      },
      {
        id: 3,
        state: 'auto',
        icon: flash['auto'],
      }
    ]  
  )

  function updateFlash(evt) {
    let newStack = [...stack]

    // put last state on the top
    let last = newStack.pop()
    newStack = [last, ...newStack]

    // take the middle state
    let newCurrentState = newStack[1].state

    // update currentState and stack  
    setCurrentState(newCurrentState)
    setStack([...newStack])

    onChange(newCurrentState)
  }

  return (
      <RippleBox 
        className="flash-button" 
        onClick={updateFlash}
      >
        <div className="scroll">
          { stack.map( item => <Icon be={item.icon} key={item.id}/>)}        
        </div>
      </RippleBox>
    )
}