import './DropDown.css'
import { useState } from 'react'

import RippleBox from './RippleBox.jsx'

export default function DropDown (props) {
  let { content, show, onExit } = props

  let [subList, setSubList] = useState(false)

  function closeDropDown(evt) {
    console.log(evt.target)
    if (evt.target.id === 'ddb') {
      setSubList([])
      onExit(evt)
    }
  }

  let className = 'drop-down'
  className += show ? ' u-visible' : ' u-hide'

  return (
    <div 
    id="ddb"
    onClick={closeDropDown}
    className={className}>


      { subList.length
        ? <DropDownList content={subList} onExit={onExit}/>
        : <DropDownList content={content} onExit={onExit}
            onDisplaySubList={(sub) => setSubList(sub)}/>
      }
      
    </div>
      
  )
}

function DropDownList (props) {
  let { content, show, onDisplaySubList } = props

  let items = content.map((it, i) => {
    
    let onClick
    let itemProps

    if (it.content) {

       onClick = (evt) => {
        if (it.onClick) 
          it.onClick(evt)
        
        onDisplaySubList(it.content)
      }
      
      itemProps = {...it, onClick}  
      return (<DropDownItem key={i} {...itemProps}/>)
    }

    if (it.onClick) {
      onClick = (evt) => {
        onClick(evt)
        onExit(evt)
      }

      itemProps = {...it, onClick}  
      return (<DropDownItem key={i} {...itemProps}/>) 
    }

    itemProps = {...it}  
    return (<DropDownItem key={i} {...itemProps}/>)
  })

  return (
    <div className='drop-down-list'>
      <ul>
        {items}
      </ul>
    </div>
  )
}

function DropDownItem(props) {
  let { text, content, onClick } = props
  console.log(props)
  return (
    <RippleBox onClick={onClick}> 
      <li style={{padding: '10px'}}>{text}</li>
    </RippleBox>
  )
}