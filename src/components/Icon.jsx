export default function Icon(props) {
  let { className = '' } = props

  className += ' icon material-icons-round'
  return (
    <span 
      className={className}>{props.be}</span>
    )
}