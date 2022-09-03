import { useState, useEffect, useRef, createRef } from 'react';

import {
  useNavigate,
} from 'react-router-dom'

import { motion } from 'framer-motion'

import Header from '@/components/Header'
//import MainLayout from '@/layouts/MainLayout'

import Camera from '@/views/Camera.jsx'
import HomeChats from '@/views/HomeChats.jsx'
import States from '@/views/States.jsx'
import Calls from '@/views/Calls.jsx'

let tabs = {
  camera: {
    prev: 'calls',
    next: 'chats',
    icon: 'camera_alt'
  },
  chats: {
    prev: 'camera',
    next: 'states',
  },
  states: {
    prev: 'chats',
    next: 'calls',
  },
  calls: {
    prev: 'states',
    next: 'camera',
  }
}

const Home = () => {
  // Third party hooks
  const navigate = useNavigate()

  // ---- //
  const [currentTab, setCurrentTab] = useState('chats')
  let [draging, setDraging] = useState(false)
  let [tabMovement, setTabMovement] = useState()

  const scrollContainer = useRef()
  const headerRef = useRef()

  const references = {
    camera: useRef(),
    chats: useRef(),
    states: useRef(),
    calls: useRef()
  }

  function handleTabChange(tab) {
    setCurrentTab(tab)
  }

  function scrollTo(tab) {
    let element = references[tab].current

    let sectionX = element.getBoundingClientRect().x

    let currentScroll = scrollContainer.current.scrollLeft
    let totalScroll = currentScroll + sectionX

    scrollContainer.current.scrollTo({left: totalScroll, behavior: 'smooth'})
  }

  function handleScroll(evt) {
    // TO-DO: research for some way to improve this handleScroll method

    // get current secction
    console.log('touch end!')
    const element = references[currentTab].current

    //console.log({element, currentTab})

    const sectionX = element.getBoundingClientRect().x
    const ww = window.innerWidth
    
    let difference
    let percent
    let direction
    let moveTo

    
    if (sectionX < 0) {
      //console.log('it moves to the left')
      difference = ww + sectionX
      direction = 'r'
    } else {
      //console.log('it moves to the rigth')
      difference = ww - sectionX
      direction = 'l'
    }

    percent = 100 - ((difference * 100) / ww)
    /*console.log({
      sectionX, 
      ww, 
      difference, 
      percent, 
      direction, 
      currentTab,
      relactions: tabs[currentTab],
    })
    */


    if (direction === 'l') {
      moveTo = tabs[currentTab].prev
    } else {
      moveTo = tabs[currentTab].next
    }

    // if the scroll is less of the 70% of view widht, return
    if ((percent < 60) || (!moveTo)) {

      //console.log('move canceled')
      //console.log({moveTo})
      scrollTo(currentTab)
      return
    }

    setCurrentTab(moveTo)
  }

  function determinateTabPosition(evt) {
    console.log({left: scrollContainer.current.scrollLeft})
    if (draging) {
      setDraging(false)

      handleScroll(evt)      
    }
    
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  }

  const pageVariants = {
    initial: {
      opacity: 0
    },
    in: {
      opacity: 1
    },
    out: {
      opacity: 0
    }
  }


  let globalStyles
  if(currentTab === 'camara') {
    console.log({new_currentTab: currentTab})
    let height = headerRef.current.clientHeight
    globalStyles = {transform: `translateY(-${height + 1}px)`}
  } else {
    globalStyles = {}
  }

  useEffect(() => {
    scrollTo(currentTab)
  }, [currentTab])

  function updateTabIndicator(evt) {
    //const touch = evt.touches[0]
    //console.log({touch})
    //console.log({cont: scrollContainer.current.scrollLeft})

    //console.log(`cx: ${touch.clientX} cy: ${touch.clientY}, px: ${touch.pageX} py: ${touch.pageY}`)

    const element = references[currentTab].current

    //console.log({element, currentTab})
    const sectionX = element.getBoundingClientRect().x
    console.log({sectionX})
    const ww = window.innerWidth
    
    let difference = 0
    let percent = 0
    let direction = ''
    let moveTo
    
    if (sectionX < 0) {
      //console.log('it moves to the left')
      difference = ww + sectionX
      direction = 'r'
    } else {
      //console.log('it moves to the rigth')
      difference = ww - sectionX
      direction = 'l'
    }

    percent = 100 - ((difference * 100) / ww) 

    if (direction === 'l') {
      moveTo = tabs[currentTab].prev
    } else {
      moveTo = tabs[currentTab].next
    }

    setTabMovement({
      state: 'moving',
      to: moveTo,
      percent,
      direction
    })
  }


  return (
      <motion.div
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
        style={globalStyles}
      >

        <Header 
          ref={headerRef}
          onTabChange={handleTabChange} 
          currentTab={currentTab}
          tabs={tabs}

          tabMovement={tabMovement}
        />
        <div 
          className="window-size"
          ref={scrollContainer}
          onTouchStart={() => setDraging(true)}
          onScroll={updateTabIndicator}
          onTouchEnd={determinateTabPosition}
          >
          <main id="content">
            <Camera ref={references.camera}></Camera>
            <HomeChats ref={references.chats}></HomeChats>
            <States ref={references.states}></States>
            <Calls ref={references.calls}></Calls>
          </main>  
        </div>
      </motion.div>      
    )
}

export default Home