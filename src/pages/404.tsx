import Head from 'next/head'
import NotFoundView from '@/components/NotFoundView'

export default function NotFound() {
  return (
    <>
      <Head><title>404 — pipe-code</title></Head>
      <NotFoundView />
    </>
  )
}
