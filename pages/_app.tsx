import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { LanguageProvider } from '../context/LanguageContext'

export default function App({ Component, pageProps }: AppProps)
{
  return (
    <LanguageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageProvider>
  )
}
