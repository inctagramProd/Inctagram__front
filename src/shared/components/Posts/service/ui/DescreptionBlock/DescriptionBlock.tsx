import { Typography } from '@/src/shared/ui'
import { Dispatch, SetStateAction, useState } from 'react'

type Props = {
  visibleDescription: boolean
  postDescreption: string | null
  setVisibleDescription: Dispatch<SetStateAction<boolean>>
}
const DescriptionBlock = ({
  setVisibleDescription,
  postDescreption,
  visibleDescription,
}: Props) => {
  return (
    <div>
      {' '}
      <div>
        <Typography
          variant="regular_14"
          className={`h-${visibleDescription ? 'auto' : '10'} overflow-hidden`}
        >
          {postDescreption}{' '}
        </Typography>
        <Typography
          variant="small"
          className={
            'text-dark-100 cursor-pointer italic hover:text-dark-300 transition duration-300 ease-in-out'
          }
          onClick={() => setVisibleDescription(!visibleDescription)}
        >
          {visibleDescription ? 'свернуть' : 'еще'}
        </Typography>
      </div>
    </div>
  )
}
export default DescriptionBlock
