import dynamic from 'next/dynamic'
import Head from 'next/head'

const GlassLogo = dynamic(() => import('@/components/GlassLogo'), { ssr: false })

export default function Home() {
  return (
    <>
      <Head>
        <title>Pipe Code</title>
        <meta name="description" content="Pipe Code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlassLogo />
    </>
  )
}
