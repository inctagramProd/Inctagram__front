import { Icon } from '@/src/shared/ui'

type PostIconButtonProps = {
  iconName: string
  logMessage: string
}

export const PostIconButton = ({ iconName, logMessage }: PostIconButtonProps) => {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        console.log(logMessage)
      }}
    >
      <Icon
        iconName={iconName}
        iconStyle="fill-light-100 transition duration-700 ease-in-out hover:fill-primary-100"
      />
    </div>
  )
}
