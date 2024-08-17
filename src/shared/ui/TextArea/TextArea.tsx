import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import type { PageText } from '@/src/entities/Posts/model/types'

type Props = {
  errorMessage?: string
  type?: 'default' | 'comment'
  pageText: PageText
  className?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = ({
  errorMessage,
  type = 'default',
  pageText,
  className,
  ...restProps
}: Props) => {
  const [hasContent, setHasContent] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      setHasContent(textareaRef.current.value.trim() !== '')
    }
  }, [textareaRef])

  const handleInputChange = () => {
    setHasContent(textareaRef.current?.value.trim() !== '')
  }

  return (
    <>
      {type === 'comment' ? (
        <div className="relative">
          <>
            <TextareaAutosize
              id="com"
              ref={textareaRef}
              className={`w-full outline-none placeholder-light-900 rounded-sm py-1.5 px-3 h-auto bg-dark-700 border-light-900 focus:border-b focus:outline-none focus:border-primary-300 transition-colors peer border-b overflow-hidden resize-none ${className}`}
              rows={1}
              onInput={handleInputChange}
            />
            <label
              htmlFor="com"
              className={`absolute left-0 top-1 text-light-900 text-s cursor-text peer-focus:text-xs peer-focus:-top-4 peer-focus:text-primary-300 transition-all ${
                hasContent ? 'text-xs -top-4 text-primary-300' : ''
              } ${className}`}
            >
              {pageText.addComment}
            </label>
          </>
        </div>
      ) : (
        <>
          <textarea
            className={`w-full outline-none placeholder-light-900 border rounded-sm py-1.5 px-3 bg-dark-500 disabled:placeholder-dark-100 disabled:text-dark-100 focus:border-b ${
              errorMessage
                ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
                : 'border-dark-100 focus:border-primary-700 focus:ring-primary-700'
            }`}
            {...restProps}
          />
          {errorMessage && <span className="text-danger-500">{errorMessage}</span>}
        </>
      )}
    </>
  )
}
