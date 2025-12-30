import fs from 'fs'
import path from 'path'

type NewsItem = {
  id: string
  type: 'manual' | 'github' | 'linkedin' | 'project'
  tag: 'NEWS' | 'REPO' | 'POST'
  title: string | { fr?: string; en?: string; [k:string]: string | undefined }
  date: string
  summary?: string | { fr?: string; en?: string; [k:string]: string | undefined }
  url?: string
  source?: string
}

const DATA_DIR = path.join(process.cwd(), 'data')

async function fetchGithubEvents(username = 'Angel-42'): Promise<NewsItem[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events/public`, { headers: { 'User-Agent': 'portfolio-news' } })
    if (!res.ok) return []
    const events = await res.json()
    const items: NewsItem[] = []
    for (const ev of events) {
      if (ev.type === 'CreateEvent' && ev.payload?.ref_type === 'repository') {
        // create bilingual title/summary so the frontend can select language
        const repoName = ev.repo?.name || 'repo'
        items.push({
          id: `gh-create-${ev.id}`,
          type: 'github',
          tag: 'REPO',
          title: {
            en: `New repository published: ${repoName}`,
            fr: `Nouveau dépôt publié: ${repoName}`
          },
          date: ev.created_at,
          summary: ev.payload?.description ? { en: ev.payload.description, fr: ev.payload.description } : '',
          url: `https://github.com/${ev.repo?.name}`,
          source: 'github'
        })
      }
      // skip PushEvent to avoid treating regular commits as NEWS
    }
    return items
  } catch (e) {
    return []
  }
}

async function fetchGithubRepos(username = 'Angel-42'): Promise<NewsItem[]> {
  try {
    const headers: Record<string,string> = { 'User-Agent': 'portfolio-news', 'Accept': 'application/vnd.github+json' }
    if (process.env.GITHUB_TOKEN) headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=created`, { headers })
    if (!res.ok) return []
    const repos = await res.json()
    const items: NewsItem[] = repos.map((r: any) => ({
      id: `gh-repo-${r.id}`,
      type: 'github',
      tag: 'REPO',
      title: {
        en: `New repository published: ${r.name}`,
        fr: `Nouveau dépôt publié: ${r.name}`
      },
      date: r.created_at || r.pushed_at || new Date().toISOString(),
      summary: r.description ? { en: r.description, fr: r.description } : '',
      url: r.html_url,
      source: 'github'
    }))
    return items
  } catch (e) {
    // don't throw here; return empty so caller can decide fallback
    console.warn('fetchGithubRepos failed:', (e as any)?.message ?? e)
    return []
  }
}

export async function getAllNews() : Promise<NewsItem[]> {
  // load manual news
  let manual: NewsItem[] = []
  try {
    const raw = fs.readFileSync(path.join(DATA_DIR, 'news.json'), 'utf8')
    const parsed = JSON.parse(raw)
    manual = parsed.map((it: any) => ({ ...it, tag: it.tag || 'NEWS' }))
  } catch (e) { manual = [] }

  // fetch github events
  const gh = await fetchGithubEvents()
  // fetch public repos and create news items from repo creation
  const ghRepos = await fetchGithubRepos()

  // Merge manual, github repos and github events (no local fallback here)
  const combined = [...manual, ...ghRepos, ...gh]
  const seen = new Set<string>()
  const merged: NewsItem[] = []
  for (const it of combined) {
    if (seen.has(it.id)) continue
    seen.add(it.id)
    merged.push(it)
  }
  // sort by date desc
  merged.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return merged
}

export async function getLatestNews(limit = 1, tag?: 'NEWS'|'REPO'|'POST') {
  const all = await getAllNews()
  const filtered = tag ? all.filter(i => i.tag === tag) : all
  return filtered.slice(0, limit)
}

export type { NewsItem }
