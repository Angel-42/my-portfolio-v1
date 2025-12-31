export const translations = {
  en: {
    NAV: {
      ABOUT: 'About',
      WORK: 'Work',
      CHRONICLES: 'Chronicles',
      CONTACT: 'Contact'
    },
    HEADER: {
      TOGGLE_TO_EN: 'Switch to English',
      TOGGLE_TO_FR: 'Switch to French'
    },
    BUTTONS: {
      DETAILS: 'Details',
      MORE: 'More',
      BACK: 'Back',
      VIEW_CODE: 'View source',
      VISIT: 'Visit'
    },
    PROJECTS: {
      SORT_BY: 'Sort by',
      FEATURED: 'Featured',
      FILTER: 'Filter',
      TITLE: 'All projects',
      NOT_FOUND: 'Project not found',
      TECH_LABEL: 'Tech:',
      NO_README: 'No README available for this project.',
      IN_PROGRESS: 'In progress',
      IN_PROGRESS_DESC: 'Projects currently in development.',
      OTHER_PROJECTS: 'Other projects',
      OTHER_DESC: 'Completed or archived projects.',
      NONE_IN_PROGRESS: 'No projects currently in progress.',
      SORT_DATE: 'Date',
      SORT_ALPHA: 'Alphabet',
      ORDER_DESC: 'Desc',
      ORDER_ASC: 'Asc'
    },
    NEWS: {
      LATEST: 'Latest',
      SEE_ALL: 'See all',
      PAGE_TITLE: 'Chronicles',
      FILTER_ALL: 'All',
      FILTER_NEWS: 'Chronicles',
      FILTER_REPO: 'Repo',
      FILTER_POST: 'Post',
      SEE: 'See',
      LATEST_TITLE: 'Latest chronicle',
      SEE_ALL_NEWS: 'See all chronicles'
    },
    FOOTER: {
      CONTACT: 'Contact'
    },
    HOME: {
      HERO_SUBTITLE: 'Epitech student • Low-level development & modern web',
      HERO_CV: 'Download my CV',
      HERO_CONTACT: 'Contact me',
      FEATURED_TITLE: 'Featured',
      FEATURED_MORE: 'See the full list of projects or learn more about me.'
    },
    // SIDEBAR keys removed
    ABOUT: {
      TITLE: 'About',
      INTRO: 'Hello — I am Angel SEVERAN, a 3rd year student at Epitech Montpellier.',
      WHOAMI_TITLE: 'Who am I?',
      WHOAMI_DESC: 'Interested in low-level programming and network architectures, I work on C/C++ projects as well as modern TypeScript and Flutter projects.',
      SEARCH_TITLE: 'Looking for',
      SEARCH_DESC: "I am looking for an internship of 4 to 6 months starting April 2026, ideally in systems, mobile or web development.",
      SKILLS_TITLE: 'Skills',
      FORMATION_TITLE: 'Education',
      CONTACT_TITLE: 'Contact'
    },
    CONTACT: {
      TITLE: 'Contact',
      EMAIL_LINE: 'You can contact me by email:',
      CV_LINE: 'Download my CV:',
      NETWORKS_TITLE: 'Networks',
      EMAIL_LABEL: 'Email',
      LINKEDIN_LABEL: 'LinkedIn',
      GITHUB_LABEL: 'GitHub'
    }
  },
  fr: {
    NAV: {
      ABOUT: 'À propos',
      WORK: 'Projets',
      CHRONICLES: 'Chroniques',
      CONTACT: 'Contact'
    },
    HEADER: {
      TOGGLE_TO_EN: 'Passer en anglais',
      TOGGLE_TO_FR: 'Passer en français'
    },
    BUTTONS: {
      DETAILS: 'Détails',
      MORE: 'Plus',
      BACK: 'Retour',
      VIEW_CODE: 'Voir le code',
      VISIT: 'Visiter'
    },
    PROJECTS: {
      SORT_BY: 'Trier par',
      FEATURED: 'En vedette',
      FILTER: 'Filtrer',
      TITLE: 'Tous mes projets',
      NOT_FOUND: 'Projet non trouvé',
      TECH_LABEL: 'Tech:',
      NO_README: "Aucun README disponible pour ce projet.",
      IN_PROGRESS: 'En cours',
      IN_PROGRESS_DESC: "Projets actuellement en développement.",
      OTHER_PROJECTS: 'Autres projets',
      OTHER_DESC: 'Projets terminés ou archivés.',
      NONE_IN_PROGRESS: "Aucun projet en cours pour l'instant.",
      SORT_DATE: 'Date',
      SORT_ALPHA: 'Alphabet',
      ORDER_DESC: 'Desc',
      ORDER_ASC: 'Asc'
    },
    NEWS: {
      LATEST: 'Dernières',
      SEE_ALL: 'Voir tout',
      PAGE_TITLE: 'Chroniques',
      FILTER_ALL: 'Tout',
      FILTER_NEWS: 'Chroniques',
      FILTER_REPO: 'Repo',
      FILTER_POST: 'Post',
      SEE: 'Voir',
      LATEST_TITLE: 'Dernière chronique',
      SEE_ALL_NEWS: 'Voir toutes les chroniques'
    },
    FOOTER: {
      CONTACT: 'Contact'
    },
    HOME: {
      HERO_SUBTITLE: 'Étudiant Epitech • Développement bas‑niveau & Web moderne',
      HERO_CV: 'Télécharger mon CV',
      HERO_CONTACT: 'Me contacter',
      FEATURED_TITLE: "À l'affiche",
      FEATURED_MORE: "Voir la liste complète des projets ou en savoir plus sur moi."
    },
    // SIDEBAR keys removed
    ABOUT: {
      TITLE: 'À propos',
      INTRO: "Bonjour — je suis Angel SEVERAN, étudiant en 3ème année à Epitech Montpellier.",
      WHOAMI_TITLE: 'Qui suis‑je ?',
      WHOAMI_DESC: 'Passionné par la programmation bas‑niveau et les architectures réseau, je travaille sur des projets en C/C++ ainsi que sur des projets modernes en TypeScript et Flutter.',
      SEARCH_TITLE: 'Recherche',
      SEARCH_DESC: "Je suis à la recherche d'un stage de 4 à 6 mois à partir d'avril 2026, idéalement en développement système, mobile ou web.",
      SKILLS_TITLE: 'Compétences',
      FORMATION_TITLE: 'Formation',
      CONTACT_TITLE: 'Contact'
    },
    CONTACT: {
      TITLE: 'Contact',
      EMAIL_LINE: 'Tu peux me contacter par email :',
      CV_LINE: 'Télécharger mon CV :',
      NETWORKS_TITLE: 'Réseaux',
      EMAIL_LABEL: 'Email',
      LINKEDIN_LABEL: 'LinkedIn',
      GITHUB_LABEL: 'GitHub'
    }
  }
} as const

export type LocaleKey = typeof translations

export default translations
