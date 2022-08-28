import './Chats.css'
import { useState, forwardRef } from 'react'

import UserChat from '../components/UserChat.jsx'
import RippleBox from '../components/RippleBox.jsx'
import ListItem from '../components/ListItem.jsx'

const Chats = forwardRef((props, ref) => {
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
          right={<div>icono archivados</div>}
          title={<h2>Archivados</h2>}
        />

        <div>
          { usersChat.map( user => <UserChat key={user.id} user={user}/>) }
        </div>
      </section>
    )
})

export default Chats