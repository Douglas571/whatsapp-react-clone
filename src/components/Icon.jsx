export default function Icon(props) {
  let { className = '' } = props

  className += ' material-icons-round'

  return (
    <span 
      className={className}>{props.be}</span>
    )
}