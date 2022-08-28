import './ListItem.css'

import RippleBox from '../components/RippleBox.jsx'

export default function ListItem(props) {
  let {
    right,
    title,
    text,
    left
  } = props

  return (
    <RippleBox>
      <div className="list-item">
        { (right) ? 
          <div className="right">{right}</div>
          : null
        }

        <div className="center">
          <div className="title">
            {title}
          </div>

          { (text) ? 
            <div className="text">{text}</div>
            : null
          }
        </div>

        { (left) ? 
          <div className="left">{left}</div>
          : null
        }

      </div>
    </RippleBox>
    )
}