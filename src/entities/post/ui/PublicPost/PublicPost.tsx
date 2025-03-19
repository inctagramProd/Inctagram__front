import { PublicPostType } from '@/src/features/post/types/publicPostTypes'
import React, { useState } from 'react'
import { SlickSlider } from '@/src/shared/ui/Slider/Slider'
import Image from 'next/image'
import { getTimeAgo } from '@/src/shared/helpers/getTimeAgo'

type Props = {
  post: PublicPostType
}

export const PublicPost = ({ post }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const toggleExpand = () => setExpanded(!expanded)
  console.log(post)

  return (
    <div className={'max-w-[234px] w-full'}>
      <div>
        <SlickSlider>
          {post.images.map((image, index) => (
            <Image
              src={image.url}
              key={index}
              alt={image.uploadId}
              width={234}
              height={240}
              priority={true}
              className={'w-[234px] h-[240px]'}
            />
          ))}
        </SlickSlider>
      </div>
      <div className="flex items-center mt-4">
        <img
          src={post.avatarOwner}
          alt={post.userName}
          width={100}
          className="w-10 h-10 rounded-full mr-3"
        />
        <h4 className="font-bold text-lg">{post.userName}</h4>
      </div>
      <p className="text-gray-400 text-sm">{getTimeAgo(post.updatedAt)}</p>
      <p className="text-gray-300 mt-2">
        {expanded ? post.description : `${post.description.substring(0, 80)}...`}
        {post.description.length > 80 && (
          <button onClick={toggleExpand} className="text-blue-400 ml-1">
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  )
}
