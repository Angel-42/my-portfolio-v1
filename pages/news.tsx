import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { getAllNews, NewsItem } from '../lib/news'
import { useLanguage } from '../context/LanguageContext'

type Props = { news: NewsItem[] }

export default function NewsPage({ news }: Props) {
  const { t, lang } = useLanguage()
  const [filter, setFilter] = useState<'ALL'|'NEWS'|'REPO'|'POST'>('ALL')
  const list = filter === 'ALL' ? news : news.filter(n => n.tag === filter)

  const filters = [
    { id: 'ALL', label: t('NEWS.FILTER_ALL') },
    { id: 'NEWS', label: t('NEWS.FILTER_NEWS') },
    { id: 'REPO', label: t('NEWS.FILTER_REPO') },
    { id: 'POST', label: t('NEWS.FILTER_POST') }
  ] as const

  return (
    <main style={{maxWidth: 900, margin: '2rem auto', padding: '0 1rem'}}>
      <h1>{t('NEWS.PAGE_TITLE')}</h1>
      <div style={{display:'flex', gap:8, marginTop:12, marginBottom:12}}>
        {filters.map(opt => (
          <button
            key={opt.id}
            onClick={() => setFilter(opt.id as any)}
            style={{
              padding: '6px 10px', borderRadius: 8, border: '1px solid #e6eef8', background: filter === opt.id ? '#2563eb' : '#fff', color: filter === opt.id ? '#fff' : '#0b1220', cursor: 'pointer'
            }}
          >{opt.label}</button>
        ))}
      </div>

      <ul style={{listStyle: 'none', padding: 0, marginTop: 8}}>
        {list.map(n => (
          <li key={n.id} style={{padding: 14, borderRadius: 10, background: '#fff', marginBottom: 12}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'center'}}>
              <div>
                <h3 style={{margin: 0}}>{typeof n.title === 'string' ? n.title : (n.title?.[lang] || n.title?.fr || n.title?.en || '')}</h3>
                <small style={{color: '#6b7280'}}>{new Date(n.date).toLocaleString()}</small>
                <p style={{marginTop:8}}>{typeof n.summary === 'string' ? n.summary : (n.summary?.[lang] || n.summary?.fr || n.summary?.en || '')}</p>
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
                <div style={{fontWeight:700, color: n.tag === 'NEWS' ? '#0b1220' : n.tag === 'REPO' ? '#2563eb' : '#06b6d4'}}>{t(`NEWS.FILTER_${n.tag}`)}</div>
                {n.url ? <a href={n.url} target="_blank" rel="noreferrer" style={{color: '#2563eb'}}>{t('NEWS.SEE')}</a> : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const news = await getAllNews()
  return { props: { news } }
}

