import "./Header.css"

import {useState, useRef, useEffect, forwardRef} from 'react'
import styled from 'styled-components'

import IconButton from '@/components/IconButton'
import Icon from '@/components/Icon.jsx'
import Tab from '@/components/Tab'

let Header = forwardRef((props, ref) => {

  const {onTabChange, currentTab, style} = props

  const tabs = ['_camera_', 'CHATS', 'STATES', 'CALLS']
  
  const tabRef = useRef()
  const currentTabRef = useRef(null)

  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({})
  
  // set initial tab indicator
  useEffect(() => {
    //console.log(currentTabRef)
    currentTabRef.current.click()  
    
  }, [])

  const toggleTo = (data) => {
    console.log({t: data.target})
    console.log({toggleTo_data: data})
    const {tabPosition, title} = data
    const {width, x} = tabPosition

    const contBound = tabRef.current.getBoundingClientRect()

    const move = -contBound.x + x
    const style = {
      width: width +'px', 
      transform: "translate(" + move + "px)"
    }
    //console.log(style)
    setTabIndicatorStyle(style)
    onTabChange(title)
  }


  const tabsHtml = tabs.map((t, i) => {
    const p = {
        key: i,
        title: t,
        onClick: toggleTo
    }

    if(tabs[i] == currentTab){
      
      p.ref = currentTabRef
    }

    if (t == "_camera_") {
      return <Tab {...p}><Icon be="camera_alt"/></Tab>
    }

    return (
      <Tab {...p}/>
    )
  })

  return (
    <div 
      ref={ref}
      className="header"
      style={style}>
      <div className="header-top">
        <h1>WhatsApp</h1>

        <IconButton>
          <Icon be="search"/>
        </IconButton>
        <IconButton>
          <Icon be="more_vert"/>
        </IconButton>
      </div>

      <div 
        className="header-down"
        >
        <div ref={tabRef} className="tabs">
          {tabsHtml}
        </div>
        <div className="tab-indicator" 
          style={tabIndicatorStyle}>
        </div>

      </div>
    </div>
  )
})

export default Header