import * as Icons from '../../assets/icons/icons'

type IconProps = Icons.Iicon & {
  iconName: string
}

type IconsType = {
  [key: string]: React.FC<IconProps> | undefined
}

const Icon = ({
  iconName,
  width = 24,
  height = 24,
  fillType = 'outline',
  theme = 'dark',
  value,
  style,
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
      style={style}
    />
  )
}

export default Icon
