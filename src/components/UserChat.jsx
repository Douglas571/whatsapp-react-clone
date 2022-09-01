import { useState, useRef, useEffect } from 'react'

import Avatar from './Avatar.jsx'
import RippleBox from './RippleBox.jsx'

import ListItem from './ListItem.jsx'

function UserChat(props) {
  const { name, date, lastMessage, avatar } = props.user
  const { onClick } = props

  const containerRef = useRef()

  return (
    <ListItem
      right={<Avatar src={avatar}/>}
      title={name}
      text={lastMessage}
      left={<div>{date}</div>}
      onClick={onClick}
    />      
  )
}

/*

  <RippleBox>
      <article className="user-chat">
        <Avatar src={avatar}/>
        <div className="info">
          <header>
            <h2>{name}</h2>
            <span>{date}</span>
          </header>
          <p>{lastMessage}</p>
        </div>
      </article>
      { ripples.map( r => <Ripple key={r.id} position={r.position}/>)}
    </RippleBox>
*/

export default UserChat