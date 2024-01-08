import * as Icons from '../../assets/icons/icons'

type Props = Icons.IconProps & {
  iconName: string
  iconStyle?: string
}

type IconComponent = {
  [key: string]: React.FC<Props> | undefined
}

const Icon = ({
  iconName,
  width = 24,
  height = 24,
  fillType = 'outline',
  theme = 'dark',
  value,
  iconStyle = 'fill-light-100',
  handleFocus,
}: Props) => {
  const IconComponent = (Icons as IconComponent)[iconName]
  if (!IconComponent) {
    return null
  }

  return (
    <IconComponent
      width={width}
      height={height}
      fillType={fillType}
      theme={theme}
      value={value}
      iconName={iconName}
      iconStyle={iconStyle}
      handleFocus={handleFocus}
    />
  )
}

export default Icon
