import './IconButton.css'

import {useState, useEffect} from 'react'
import styled from 'styled-components'

import Ripple from './Ripple.jsx'
import RippleBox from './RippleBox.jsx'

function IconButton(props) {
  const { onClick } = props

  return (
      <RippleBox inLine
        onClick={onClick}

      >
        <button
          className="icon-button"  
        > 
          {props.children}
        </button>
      </RippleBox>
    )
}
  
const styledIconButton = styled(IconButton)`
`

export default styledIconButton