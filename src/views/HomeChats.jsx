import './HomeChats.css'
import { useState, forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

import UserChat from '../components/UserChat.jsx'
import RippleBox from '../components/RippleBox.jsx'
import ListItem from '../components/ListItem.jsx'

import Icon from '@/components/Icon.jsx'

const Chats = forwardRef((props, ref) => {
  const navigate = useNavigate()
  const usersChat = [
    { 
      id: 1,
      name: "Baggy", 
      date:"26-8-22", 
      lastMessage: "hola mundo!...",
      avatar: "/avatar.jpg" 
    },
    { 
      id: 2,
      name: "Favian", 
      date:"24-8-22", 
      lastMessage: "el teteo, el teteo!...",
      avatar: "/avatar.jpg" 
    },
  ]

  return (
      <section ref={ref} className="bg-darkest basic-margin">
        <ListItem
          right={<Icon be="archive"/>}
          title={<h2>Archivados</h2>}
        />

        <div>
          { usersChat.map( user => 
            <UserChat 
              key={user.id} 
              user={user}
              onClick={ () => navigate(`/chat/${user.id}`)}/>
            ) 
          }
        </div>
      </section>
    )
})

export default Chats