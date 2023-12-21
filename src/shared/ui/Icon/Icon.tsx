import * as Icons from '../../assets/icons/icons'

type IconProps = {
  iconName: string
  width?: number
  height?: number
  fillType?: 'fill' | 'outline'
  theme?: 'light' | 'dark'
  value?: number
}

type SvgIconComponent = React.FC<IconProps>

type IconsType = {
  [key: string]: SvgIconComponent | undefined
}

const Icon = ({
  iconName,
  width = 24,
  height = 24,
  fillType = 'outline',
  theme = 'dark',
  value,
}: IconProps) => {
  const IconComponent = (Icons as IconsType)[iconName]
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
    />
  )
}

export default Icon
