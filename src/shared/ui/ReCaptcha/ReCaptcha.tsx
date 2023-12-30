import ReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'
import React from 'react'

type Props = {
  errorMessage?: string
  onChange: (value: string | null) => void
} & Omit<ReCAPTCHAProps, 'sitekey'>

export const ReCaptcha = ({ theme = 'dark', errorMessage, ...restProps }: Props) => {
  return (
    <div className={`mx-auto pt-2 px-1.5 pb-3 ${errorMessage && 'border border-danger-500'}`}>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        {...restProps}
        theme={theme}
        hl={'en-GB'}
      />
      {errorMessage && <span className={'text-danger-500 text-xs mt-3 block'}>{errorMessage}</span>}
    </div>
  )
}
