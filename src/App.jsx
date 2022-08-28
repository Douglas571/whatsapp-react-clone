import { useState, useEffect, useRef, createRef } from 'react';

import Header from '@/components/Header'
//import MainLayout from '@/layouts/MainLayout'

import Camera from '@/views/Camera.jsx'
import Chats from '@/views/Chats.jsx'
import States from '@/views/States.jsx'
import Calls from '@/views/Calls.jsx'

const App = () => {
  const [currentTab, setCurrentTab] = useState('CHATS')
  const scrollContainer = useRef()

  const relations = {
    _camera_: [null, 'CHATS'],
    CHATS: ['_camera_', 'STATES'],
    STATES: ['CHATS', 'CALLS'],
    CALLS: ['STATES', null]
  }

  const references = {
    _camera_: createRef(),
    CHATS: createRef(),
    STATES: createRef(),
    CALLS: createRef()
  }

  const elements = {
    _camera_: 0,
    CHATS: 1,
    STATES: 2,
    CALLS: 3
  }

  function handleTabChange(tab) {
    setCurrentTab(tab)
  }

  function scrollTo(tab) {
    // determinate the selected section
    let sectionX = references[tab].current.getBoundingClientRect().left
    console.log({sectionX})
    console.log({rect: references[tab].current})

    // move to the position
    
    let currentScroll = scrollContainer.current.scrollLeft
    let totalScroll = currentScroll + sectionX
    scrollContainer.current.scrollTo({left: totalScroll, behavior: 'smooth'})
    console.log({left: scrollContainer.current.scrollLeft})

  }

  useEffect(() => {
    console.log({new_currentTab: currentTab})
    scrollTo(currentTab)
  }, [currentTab])

  function handleScroll(evt) {
    // calculate the scrolled distance
      // get current secction
      const sectionX = references[currentTab].current.getBoundingClientRect().x
      const ww = window.innerWidth
      
      let difference
      let percent

      let direction
      let moveTo

      
      if (sectionX < 0) {
        console.log('it moves to the left')
        difference = ww + sectionX
        direction = 'r'
      } else {
        console.log('it moves to the rigth')
        difference = ww - sectionX
        direction = 'l'
      }

      percent = 100 - ((difference * 100) / ww)
      console.log({
        sectionX, 
        ww, 
        difference, 
        percent, 
        direction, 
        currentTab,
        relactions: relations[currentTab],
      })


      if (direction === 'l') {
        moveTo = relations[currentTab][0]
      } else {
        moveTo = relations[currentTab][1]
      }

      // if the scroll is less of the 70% of view widht, return
      if ((percent < 60) || (!moveTo)) {

        console.log('move canceled')
        console.log({moveTo})
        scrollTo(currentTab)
        return
      }

      setCurrentTab(moveTo)

  }


  

//          onScroll={handleScroll}

  let [draging, setDraging] = useState(false)
  function determinateTabPosition(evt) {
    if (draging) {
      console.log('end of drag!')
      setDraging(false)
      handleScroll(evt)      
    }
  }

  return (
      <div>
        <Header onTabChange={handleTabChange} currentTab={currentTab}/>
        <div 
          className="window-size"
          ref={scrollContainer}
          onTouchMove={() => setDraging(true)}
          onTouchEnd={determinateTabPosition}
          >
          <main id="content">
            <Camera ref={references['_camera_']}></Camera>
            <Chats ref={references['CHATS']}></Chats>
            <States ref={references['STATES']}></States>
            <Calls ref={references['CALLS']}></Calls>
          </main>  
        </div>
      </div>
    )
}

export default App
