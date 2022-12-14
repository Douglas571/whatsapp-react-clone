import React from 'react'
import Ripple from './Ripple.jsx'
import Icon from './Icon.jsx'

const Tab = React.forwardRef((props, ref) => {
  const {
    children,
    title,
    onClick,
    icon
  } = props

  const [ripples, setRipples] = React.useState([])

  function handleClick(evt) {
    console.log('executing handle click event')
    let { width, x } = evt.target.getBoundingClientRect()
    //console.log(evt.target)
    onClick({
      tabPosition: {
        width, x
      }, 
      title
    })

    /*console.log({timeId});

    console.log('clickeo!');
    setPulse(true)
    setTimeId(setTimeout(() => setPulse(false), 900)) 

    console.log({timeId})
    */
    const button = evt.target
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const r = {
      id: Date.now(),
      position: {
        height: `${diameter}px`, 
        width: `${diameter}px`,
        left: `${event.clientX - button.offsetLeft - radius}px`,
        top: `${event.clientY - button.offsetTop - radius}px`,
      }
    }

    if (ripples[0]) {
      ripples.shift()
    }

    setRipples([...ripples, r])

  }

  return (
    <button 
      ref={ref}
      className="tab"
      onClick={handleClick}>

      { icon
        ? <Icon be={icon}/>
        : title
      }
      {ripples.map( r => <Ripple key={r.id} position={r.position}/>)}
    </button>
  )
})

export default Tab