import { Icon, Typography } from '@/src/shared/ui'

type Props = {
  //Button properties
  style: 'primary' | 'secondary' | 'outline' | 'text' | 'default'
  size?: 'small' | 'medium' | 'large'
  label: string
  type?: 'button' | 'submit'
  disable?: boolean
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular_16'
    | 'bold_16'
    | 'regular_14'
    | 'medium_14'
    | 'bold_14'
    | 'small'
    | 'small_semi-bold'
    | 'link_regular'
    | 'link_small'
    | 'error'
  onClick?: () => void
  className?: string
  //Icon properties
  height?: number
  width?: number
  iconName?: string
  iconStyle?: string
  fillType?: 'fill' | 'outline'
  handleFocus?: () => void
}
export const Button = ({
  //Button properties
  style,
  size = 'medium',
  type = 'button',
  disable = false,
  label,
  variant = 'h3',
  //Icon properties
  width = 24,
  height = 24,
  iconName,
  iconStyle,
  fillType,
  className,
  handleFocus,
  ...props
}: Props) => {
  let nameOfClass
  switch (style) {
    case 'primary':
      nameOfClass = ` 
        bg-primary-500 text-light-100 rounded-[2px] border-[1px] border-transparent cursor-pointer 
        active:bg-primary-700 active:text-light-500  
        hover:bg-primary-100 hover:text-light-100
        focus:bg-primary-500 focus:border-2 focus:border-primary-700
        disabled:bg-primary-900 disabled:text-light-900`
      break
    case 'secondary':
      nameOfClass = ` 
    bg-dark-300 text-light-100 rounded-[2px] cursor-pointer border-[1px] border-transparent
    active:bg-[#212121] active:text-light-100  
    hover:bg-dark-100 hover:text-light-100
    focus:bg-dark-300 focus:border-[1px] focus:border-primary-300
    disabled:bg-dark-500 disabled:text-light-900`
      break
    case 'text':
      nameOfClass = `
      bg-none text-primary-500  cursor-pointer border-[1px] border-transparent 
      active:text-primary-700 hover:text-primary-100
      focus:border-[2px] focus:border-primary-700 focus:text-primary-500 focus:rounded-[2px]
      disabled:text-primary-900`
      break
    case 'outline':
      nameOfClass = `  
        bg-none text-primary-500 rounded-[2px] border-[1px] border-primary-500 cursor-pointer 
        active:text-primary-700 active:border-primary-700
        hover:text-primary-100 hover:border-primary-100
        focus:border-[2px] focus:border-primary-700 focus:text-primary-700
        disabled:bg-primary-900 disabled:text-primary-900`
      break
    case 'default':
      nameOfClass = `
            gap-y-[10px]
            bg-none text-light-100  cursor-pointer border-[1px] border-transparent 
            active:text-primary-700 hover:text-primary-100
            focus:text-primary-700 focus:border-[2px] focus:rounded-[2px] focus:border-primary-700 
            disabled:text-dark-100
        `
      break
    default:
      break
  }
  return (
    <button
      type={type}
      className={`group flex  py-[6px] px-[24px] content-center gap-x-[10px] ${nameOfClass} ${className}`}
      disabled={disable}
      {...props}
    >
      <Icon
        iconName={iconName}
        width={24}
        height={24}
        iconStyle={disable ? 'fill-dark-100' : iconStyle}
        fillType={fillType}
        handleFocus={handleFocus}
      />
      <Typography variant={variant} className={className}>
        {label}
      </Typography>
    </button>
  )
}
