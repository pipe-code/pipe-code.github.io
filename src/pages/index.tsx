import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useLang } from '@/context/LanguageContext'

const GlassLogo = dynamic(() => import('@/components/GlassLogo'), { ssr: false })

export default function IndexPage() {
  const { route, t } = useLang()

  const pageTitle = route === 'home'
    ? t('home', 'meta_title')
    : t('about', 'meta_title')

  const pageDesc = route === 'home'
    ? t('home', 'meta_description')
    : t('about', 'meta_description')

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {route === 'home'  && <GlassLogo />}
      {route === 'about' && <AboutPage />}
    </>
  )
}

function AboutPage() {
  const { t } = useLang()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh',
      color: '#cdd6f4',
      fontFamily: '"JetBrains Mono", "Cascadia Code", monospace',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12, color: '#89b4fa' }}>
          {t('about', 'heading')}
        </h1>
        <p style={{ fontSize: 18, color: '#7f849c' }}>{t('about', 'role')}</p>
      </div>
    </div>
  )
}
