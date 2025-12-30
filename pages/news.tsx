import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { getAllNews, NewsItem } from '../lib/news'

type Props = { news: NewsItem[] }

export default function NewsPage({ news }: Props) {
  const [filter, setFilter] = useState<'ALL'|'NEWS'|'REPO'|'POST'>('ALL')
  const list = filter === 'ALL' ? news : news.filter(n => n.tag === filter)

  return (
    <main style={{maxWidth: 900, margin: '2rem auto', padding: '0 1rem'}}>
      <h1>Chronicles</h1>
      <div style={{display:'flex', gap:8, marginTop:12, marginBottom:12}}>
        {(['ALL','NEWS','REPO','POST'] as const).map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: '6px 10px', borderRadius: 8, border: '1px solid #e6eef8', background: filter === t ? '#2563eb' : '#fff', color: filter === t ? '#fff' : '#0b1220', cursor: 'pointer'
            }}
          >{t}</button>
        ))}
      </div>

      <ul style={{listStyle: 'none', padding: 0, marginTop: 8}}>
        {list.map(n => (
          <li key={n.id} style={{padding: 14, borderRadius: 10, background: '#fff', marginBottom: 12}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12, alignItems:'center'}}>
              <div>
                <h3 style={{margin: 0}}>{n.title}</h3>
                <small style={{color: '#6b7280'}}>{new Date(n.date).toLocaleString()}</small>
                <p style={{marginTop:8}}>{n.summary}</p>
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
                <div style={{fontWeight:700, color: n.tag === 'NEWS' ? '#0b1220' : n.tag === 'REPO' ? '#2563eb' : '#06b6d4'}}>{n.tag}</div>
                {n.url ? <a href={n.url} target="_blank" rel="noreferrer" style={{color: '#2563eb'}}>Voir</a> : null}
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

