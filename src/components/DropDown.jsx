import './DropDown.css'
import { useState } from 'react'

import RippleBox from './RippleBox.jsx'

export default function DropDown (props) {
  let { content, show, onExit } = props

  let [subList, setSubList] = useState(false)

  function closeDropDown(evt) {
    console.log(evt.target)
    if (evt.target.id === 'ddb') {
      console.log('closing drop down...')
      setSubList([])
      onExit(evt)
    }
  }

  const visibility = show ? 'visible' : 'hidden'
  
  let styles = { 
      position: 'fixed', 
      top: '0',
      left: '0',
      background: 'none', 
      width: '100vw',
      height: '100vh',
      zIndex: '1000',
      visibility
    }

  //console.log({show, visibility, styles})
  return (
    <div 
    id="ddb"
    style={{...styles}}
    onClick={closeDropDown}>

      { subList.length
        ? <DropDownList content={subList} show={show}/>
        : <DropDownList content={content} show={show}
            onDisplaySubList={
            (c) => {
              console.log('asigned a sub list')
              console.log({c})
              setSubList(c)
            }
          }/>
      }
      
    </div>
      
  )
}

function DropDownList (props) {
  let { content, show, onDisplaySubList } = props

  let items = content.map((it, i) => {
    
    let onClick
    if (it.content) {
      //console.log({itemSubList: it})

       onClick = (evt) => {
        console.log(evt.target)
        
        console.log('on Click fired!')
        
        
        if (it.onClick) it.onClick(evt)
        onDisplaySubList(it.content)
        evt.nativeEvent.stopImmediatePropagation();
      }
      
    }


    let props = {...it, onClick}

    return (<DropDownItem key={i} {...props}/>)

  })

  //console.log('exit the function map')

  let className = "drop-down-list"
  className += show ? ' u-visible' : ''

  return (
    <div style={{
      position: "absolute",
      border: '1px solid red',
      right: '4px',
      top: '4px',
    }}
      className={className}
    >
      <ul>
        {items}
      </ul>
    </div>
  )
}

function DropDownItem(props) {
  let { text, content, onClick } = props
  return (
    <RippleBox onClick={onClick}> 
      <li style={{padding: '10px'}}>{text}</li>
    </RippleBox>
  )
}