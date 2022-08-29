import './Chat.css'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import RippleBox from '@/components/RippleBox.jsx'
import IconButton from '@/components/IconButton.jsx'
import Icon from '@/components/Icon.jsx'
import Avatar from '@/components/Avatar.jsx'
//import Message from '@/components/Message.jsx'
//{ message.map( msg => <Message data={msg}/>) }

const pageTransition = {
  type: "Spring ",
  ease: "anticipate",
  duration: 0.2
}

const pageVariants = {
  initial: {
    y: "100vh",
  },
  in: {
    y: 0,
  },
  out: {
    y: "100vh",
  }
}

export default function Chat(props) {
  const navigate = useNavigate()
  const {id} = useParams()

  const [messages, setMessages] = useState([])

  return (
    <motion.div id="chat"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <nav>
        <IconButton onClick={()=> navigate('..')}>
          <Icon be="arrow_back"/>
        </IconButton>
        <Avatar src="/avatar.jpg" small/>
        <h1>user #{id}</h1>
        <IconButton><Icon be="videocam"/></IconButton>
        <IconButton><Icon be="call"/></IconButton>
        <IconButton><Icon be="more_vert"/></IconButton>
      </nav>

      <section id="messages">

      </section>

      <footer>
        <div id="message-input">
          <IconButton><Icon be="emoji_emotions"/></IconButton>

          <input type="text" placeholder="Message"/>

          <IconButton>
            <span className="material-icons">attach_file</span></IconButton>
          <IconButton>
            <span className="material-icons">camera_alt</span>
          </IconButton>
        </div>
        <RippleBox id="audio-record-button">
          <IconButton><Icon be="keyboard_voice"/></IconButton>
        </RippleBox>
      </footer>
    </motion.div>
  )
}