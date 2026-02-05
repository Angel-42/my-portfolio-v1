import { useLanguage } from '../context/LanguageContext'
import Link from 'next/link'

export default function About() {
  const { t } = useLanguage()

  return (
    <div style={{maxWidth: 900, margin: '0 auto'}}>
      <h2 style={{fontSize: '2.2rem', marginBottom: '0.5rem'}}>{t('ABOUT.TITLE')}</h2>
      <p style={{fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontStyle: 'italic'}}>
        {t('ABOUT.INTRO')}
      </p>

      <section style={{marginBottom: '2rem'}}>
        <h3 style={{fontSize: '1.4rem', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.95)'}}>{t('ABOUT.WHOAMI_TITLE')}</h3>
        <p style={{lineHeight: 1.7, color: 'rgba(255,255,255,0.85)'}}>
          {t('ABOUT.WHOAMI_DESC')}
        </p>
      </section>

      <section style={{marginBottom: '2rem'}}>
        <h3 style={{fontSize: '1.4rem', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.95)'}}>{t('ABOUT.PASSIONS_TITLE')}</h3>
        <p style={{lineHeight: 1.7, color: 'rgba(255,255,255,0.85)'}} dangerouslySetInnerHTML={{ __html: t('ABOUT.PASSIONS_DESC') }} />
      </section>

      <section style={{marginBottom: '2rem'}}>
        <h3 style={{fontSize: '1.4rem', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.95)'}}>{t('ABOUT.SKILLS_TITLE')}</h3>
        <div style={{lineHeight: 1.8, color: 'rgba(255,255,255,0.85)'}}>
          <div dangerouslySetInnerHTML={{ __html: t('ABOUT.SKILLS_SOLID') }} style={{marginBottom: '0.5rem'}} />
          <div dangerouslySetInnerHTML={{ __html: t('ABOUT.SKILLS_PRACTICE') }} />
        </div>
      </section>

      <section style={{marginBottom: '2rem'}}>
        <h3 style={{fontSize: '1.4rem', marginBottom: '0.8rem', color: 'rgba(255,255,255,0.95)'}}>{t('ABOUT.FORMATION_TITLE')}</h3>
        <p style={{color: 'rgba(255,255,255,0.85)'}}>{t('ABOUT.FORMATION_DESC')}</p>
      </section>

      <section style={{
        marginTop: '3rem',
        padding: '2rem',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        textAlign: 'center'
      }}>
        <p style={{fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.88)', marginBottom: '1.5rem'}}>
          {t('ABOUT.CTA_TEXT')}
        </p>
        <Link href="/contact" className="btn btn-primary">
          {t('ABOUT.CTA_BUTTON')}
        </Link>
      </section>
    </div>
  )
}
