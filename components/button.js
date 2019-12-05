import '../css/styles.scss'

const Button = ({
  text,
  icon,
  onClick = () => {},
  name,
  disabled = false,
  className
}) => {
  return (
    <button
      name={name}
      disabled={disabled}
      onClick={e => {
        onClick(e)
      }}
      className={`button ${disabled && 'disabledButton'} ${className}`}
      type="submit"
      id={`btn-${name}`}
    >
      {icon ? <img className="buttonIcon" src={icon} alt={''} /> : text}
    </button>
  )
}

export default Button
