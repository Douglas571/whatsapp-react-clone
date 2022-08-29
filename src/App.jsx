import { useState, useEffect, useRef, createRef } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import Home from '@/views/Home.jsx'
import Config from '@/views/Config.jsx'

import Chat from '@/views/Chat.jsx'
//<Route path="/chat" element={<Chat/>}/>

const App = () => {
  const location = useLocation()
  return (
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat/:id" element={<Chat/>}/>
          
        </Routes>      
      </AnimatePresence>
    )
}

export default App
