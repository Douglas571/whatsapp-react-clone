import Icon from '@/components/Icon.jsx'

const icon_status = {
  waiting: null,
  send: 'done',
  recived: 'done_all',
  readed: 'done_all'
}

export default function Message(props) {
  let { className = '' } = props
  let { text, me, date, status } = props.data

  className += ' msg'
  className += !me ? ' other' : ''

  return (
    <article className={className}>
      <div className="content">
        { text 
          ? <span>{text}</span> 
          : <span>'Error: Nothing to say.'</span>
        }
        <div className="info">
          <span className="date">{date}</span>
          
          { me 
            ? <Icon be={icon_status[status]} className={status}/>
            : null
          }
            
            
        </div>
      </div>
    </article>
  )
}