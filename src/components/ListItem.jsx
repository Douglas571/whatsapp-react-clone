import './ListItem.css'

import RippleBox from '../components/RippleBox.jsx'

export default function ListItem(props) {
  let {
    right,
    title,
    text,
    left,
    onClick,
  } = props

  return (
    <RippleBox onClick={onClick}>
      <div className="list-item u-alg-start">
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