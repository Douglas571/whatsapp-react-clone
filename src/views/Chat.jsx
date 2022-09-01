import './Chat.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import RippleBox from '@/components/RippleBox.jsx'
import IconButton from '@/components/IconButton.jsx'
import Icon from '@/components/Icon.jsx'
import Avatar from '@/components/Avatar.jsx'
import Message from '@/components/Message.jsx'
import DropDown from '@/components/DropDown.jsx'
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
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()

  const status = ['waiting', 'send', 'recived', 'readed']

  const [messages, setMessages] = useState([
    {
      text: 'Hellooo',
      me: true,
      date: '10:30 a.m',
      status: status[3],
    },
    {
      text: 'Hi!',
      date: '10:31 a.m',
      status: status[3],
    },
    {
      text: 'How are you?',
      me: true,
      date: '10:32 a.m',
      status: status[3],
    },
    {
      text: 'fine! and you?',
      date: '10:33 a.m',
      status: status[3],
    },
    {
      text: 'fine',
      me: true,
      date: '10:34 a.m',
      status: status[1],
    },

  ])

  let more_more_options = [
    { text: 'Reportar', onClick: () => { console.log('reportando...')}},
    { text: 'Bloquear' },
    { text: 'Vaciar chat' },
    { text: 'Crear acceso directo' },
  ]

  let more_options = [
    { text: 'Ver contacto', onClick: () => { console.log('abriendo contacto...')} },
    { text: 'Buscar' },
    { text: 'Silenciar notificaciones'},
    { text: 'Mensajes temporales' },
    { text: 'Fondo de pantalla' },
    { text: 'Más', content: more_more_options },
  ]

  useEffect(() => {
    console.log({showMoreOptions})
  }, [showMoreOptions])

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
        
        <RippleBox className="grow fullh">
          <Avatar src="/avatar.jpg" small/>
          <h1>user #{id}</h1>
        </RippleBox>
        <div style={{display: 'flex', gap: '5px'}}>
          <IconButton><Icon be="videocam"/></IconButton>
          <IconButton><Icon be="call"/></IconButton>
          <IconButton
            onClick={() => setShowMoreOptions(true)}
          >
            <Icon be="more_vert"/>
          </IconButton>
        </div>
        <DropDown
          content={more_options}
          show={showMoreOptions}
          onExit={() => {
            console.log('toggle show more options')
            setShowMoreOptions(!showMoreOptions)
          }}
        />
          
      </nav>
      <section id="messages">
        { messages.map( (msg, i) => <Message key={i} data={msg}/> )}
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