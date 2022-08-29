import { useState, useRef, useEffect } from 'react'

import Avatar from './Avatar.jsx'
import RippleBox from './RippleBox.jsx'

import ListItem from './ListItem.jsx'

function UserChat(props) {
  const { name, date, lastMessage, avatar } = props.user
  const { onClick } = props

  const containerRef = useRef()
  const [ripples, setRipples] = useState([])

  useEffect(() => console.log({ripples}), [ripples])

  function addRipple(evt) {
    console.log('Adding ripple!...')
    const container = containerRef.current
    const button = evt.target
    const diameter = Math.max(container.clientWidth, container.clientHeight);
    const radius = diameter / 2;

    console.log({x: event.clientX, y: event.clientY})
    console.log({c: container.getBoundingClientRect()});

    const cl = container.getBoundingClientRect().left
    const ct = container.getBoundingClientRect().top

    const newRipple = {
      id: Date.now(),
      position: {
        height: `${diameter}px`, 
        width: `${diameter}px`,
        left: `${event.clientX - cl- radius}px`,
        top: `${event.clientY - ct - radius}px`,
      }
    }

    console.log(newRipple.position);

    if (ripples[0]) {
      ripples.shift()
    }

    setRipples([...ripples, newRipple])
  }

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