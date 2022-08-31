import { useState, forwardRef } from 'react'

import Avatar from '../components/Avatar.jsx'
import ListItem from '../components/ListItem.jsx'

const States = forwardRef((props, ref) => {
  let [recents, setRecents] = useState([
    {
      id: 1,
      name: 'Carlitos',
      lastStatus: {
        date: '2:20 pm',
        miniature: '/avatar.jpg'
      }
    },
    {
      id: 2,
      name: 'Maggy',
      lastStatus: {
        date: '12:30 am',
        miniature: '/avatar.jpg'
      }
    },
    {
      id: 3,
      name: 'Joaquin',
      lastStatus: {
        date: 'yesterday',
        miniature: '/avatar.jpg'
      }
    },
  ])

  let [seen, setSeen] = useState([])
  let [silenced, setSilenced] = useState([])

  let recentElements = recents.map( user => 
    (<ListItem
      key={user.id}
      right={
        <Avatar 
          src={user.lastStatus.miniature}
        />

      }
      title={user.name}
      text={user.lastStatus.date}
    />)
  )

  let seenElements = seen.map( user => 
    (<ListItem
      right={
        <Avatar 
          src={user.lastStatus.miniature}
        />

      }
      title={user.name}
      text={user.lastStatus.date}
    />)
  )

  let silencedElements = silenced.map( user => 
    (<ListItem
      right={
        <Avatar 
          src={user.lastStatus.miniature}
        />

      }
      title={user.name}
      text={user.lastStatus.date}
    />)
  )

  return (
      <section ref={ref} className="bg-darkest">

        <ListItem
          right={
            <Avatar 
              src="/avatar.jpg"
              bubble="+"/>

          }
          title="My State"
          text="Add your state"
        />
        {
          recents.length ?
            <section>
              <h2 className="pl">Recent</h2>
              {recentElements}
            </section>
          : null
        }
        
        {
          seen.length ?
            <section>
              <h2 className="pl">Seen</h2>
              {seenElements}
            </section>
          : null
        }

        {
          silenced.length ?
            <section>
              <h2 className="pl">Silenced</h2>
              {silencedElements}
            </section>
          : null
        }

      </section>
    )
})

export default States