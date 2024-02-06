import Head from 'next/head'

type Props = {
  title: string
  description?: string
}

export const HeadMeta = ({ title, description }: Props) => {
  const desc = description ? description : `Inctagram ${title}`

  return (
    <Head>
      <title>{title}</title>
      <meta content={desc} name={'description'} />
      <meta content={'width=device-width, initial-scale=1'} name={'viewport'} />
      <link href={'/favicon.ico'} rel={'icon'} />
    </Head>
  )
}
