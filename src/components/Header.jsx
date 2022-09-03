import "./Header.css"

import {useState, useRef, useEffect, forwardRef} from 'react'
import styled from 'styled-components'

import IconButton from '@/components/IconButton'
import Icon from '@/components/Icon.jsx'
import Tab from '@/components/Tab'

let Header = forwardRef((props, ref) => {
  const {currentTab, tabs, tabMovement, onTabChange, style} = props

  useEffect(() => {
    console.log({in_header_currentTab: currentTab})
  }, [currentTab])
  
  const tabRef = useRef()

  const tabReferences = {
    camera: useRef(),
    chats: useRef(),
    states: useRef(),
    calls: useRef()
  }

  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({})
  
  // set initial tab indicator
  useEffect(() => {
    updateTabIndicator(currentTab)
  }, [currentTab])

  const toggleTo = (data) => {
    console.log({t: data.target})
    console.log({toggleTo_data: data})
    const {tabPosition, title} = data
    
    updateTabIndicator(title)

    console.log('fired on tab change')
    onTabChange(title)
  }

  function moveTabIndicator() {
    const {prev, next} = tabs[currentTab]
    const current = tabReferences[currentTab].current
    let to
  
    let percent = tabMovement.percent
    let style = {}
    let move = 0
    let amount = 0

    let {width, startX} = current.getBoundingClientRect()

    if (tabMovement.direction === 'l') {
      to = tabReferences[prev].current
      
    } else {
      to = tabReferences[next].current
    }

    let toWidth =  to.getBoundingClientRect().width

    move = to.getBoundingClientRect().x
    

    amount = ((100 - percent) * 100) / toWidth

    if (tabMovement.direction === 'l') {
      
      //move -= amount  
      console.log('left ', move)
    } else {
      //move += amount
      console.log('right ', move)
    }

    console.log({move})

    style = {
      width: toWidth +'px', 
      transform: "translate(" + move + "px)"
    }

    


    //const move = -contBound.x + x
    
    setTabIndicatorStyle(style)
  }


  /*
      10% "r"
  

      w        c
      100px => 100%
        x   => 10%

      move = (p * 100) / w
    */


  function updateTabIndicator(tab) {
    const element = tabReferences[tab].current

    const {width, x} = element.getBoundingClientRect()

    const style = {
      width: width +'px', 
      transform: "translate(" + x + "px)"
    }
    setTabIndicatorStyle(style)
  }

  const tabsHtml = Object.keys(tabs).map( title => {
    const properties = {
      title,
      key: title,
      icon: tabs[title].icon,
      onClick: toggleTo,
      ref: tabReferences[title]

    }

    return <Tab {...properties}/>
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