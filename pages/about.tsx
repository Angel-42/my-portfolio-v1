import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <div>
      <h2>{t('ABOUT.TITLE')}</h2>
      <p dangerouslySetInnerHTML={{ __html: t('ABOUT.INTRO') }} />

      <h3 style={{marginTop: '1rem'}}>{t('ABOUT.WHOAMI_TITLE')}</h3>
      <p>{t('ABOUT.WHOAMI_DESC')}</p>

      <h3 style={{marginTop: '1rem'}}>{t('ABOUT.SEARCH_TITLE')}</h3>
      <p dangerouslySetInnerHTML={{ __html: t('ABOUT.SEARCH_DESC') }} />

      <h3 style={{marginTop: '1rem'}}>{t('ABOUT.SKILLS_TITLE')}</h3>
      <ul>
        <li>C / C++ / Bas niveau</li>
        <li>TypeScript / Node.js / Web</li>
        <li>Flutter / Dart / Mobile</li>
        <li>Linux, Bash, Git</li>
      </ul>

      <h3 style={{marginTop: '1rem'}}>{t('ABOUT.FORMATION_TITLE')}</h3>
      <p>{t('ABOUT.FORMATION_TITLE')} — 3ème année (parcours informatique)</p>

      <h3 style={{marginTop: '1rem'}}>{t('ABOUT.CONTACT_TITLE')}</h3>
      <p>{t('CONTACT.EMAIL_LINE')} <a href="mailto:severan.angel.pro@gmail.com">severan.angel.pro@gmail.com</a></p>
    </div>
  )
}
