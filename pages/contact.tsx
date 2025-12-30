import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return (
    <div>
      <h2>{t('CONTACT.TITLE')}</h2>
      <p>{t('CONTACT.EMAIL_LINE')} <a href="mailto:severan.angel.pro@gmail.com">severan.angel.pro@gmail.com</a></p>
      <p>{t('CONTACT.CV_LINE')} <a href={`${base}/cv.pdf`} target="_blank" rel="noreferrer">CV (PDF)</a></p>
      <h3 style={{marginTop: '1rem'}}>{t('CONTACT.NETWORKS_TITLE')}</h3>
      <ul>
        <li><a href="mailto:severan.angel.pro@gmail.com">{t('CONTACT.EMAIL_LABEL')}</a></li>
        <li><a href="https://linkedin.com/in/angel-severan-1867582b1" target="_blank" rel="noreferrer">{t('CONTACT.LINKEDIN_LABEL')}</a></li>
        <li><a href="https://github.com/Angel-42" target="_blank" rel="noreferrer">{t('CONTACT.GITHUB_LABEL')}</a></li>
      </ul>
    </div>
  )
}
