import Image from 'next/image'

type Props = {
  className?: string
  type: string
  placeholder?: string
  // iconAlt: string
  // iconsrc: string
  value?: string
  onChangedHandler: (value: string) => void
  onBlurHandler?: () => void
}

const InputContainer = (props: Props) => {
  const {
    className,
    // iconsrc,
    // iconAlt,
    placeholder,
    type,
    value,
    onChangedHandler,
    onBlurHandler,
  } = props

  return (
    <div className="auth__input-container w-full">
      {/* <Image width={25} height={25} src={iconsrc} alt={iconAlt} /> */}
      <input
        type={type}
        value={value}
        className={`auth__input  ${className}`}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        onChange={(e: { target: HTMLInputElement }) =>
          onChangedHandler(e.target?.value)
        }
      />
    </div>
  )
}

export default InputContainer
