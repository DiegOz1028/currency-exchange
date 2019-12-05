import '../css/styles.scss'

const Input = ({
  name,
  id,
  type = 'text',
  onChange = () => {},
  value,
  className,
  maxlength,
  disabled,
  placeholder
}) => {
  return (
    <input
      name={name}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      maxlength={maxlength}
      disabled={disabled}
      placeholder={placeholder}
    ></input>
  )
}

export default Input
