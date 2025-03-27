import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translation from '../public/locales/en/translation.json';

// Supported languages
export const SUPPORTED_LANGUAGES = ['en', 'es', 'pt'] as const;
export type SupportedLanguages = (typeof SUPPORTED_LANGUAGES)[number];

// Load resources
const loadResources = async () => {
  const resources: Record<SupportedLanguages, typeof translation> =
    {} as Record<SupportedLanguages, typeof translation>;
  await Promise.all(
    SUPPORTED_LANGUAGES.map(async (lang) => {
      resources[lang] = (
        await import(`../public/locales/${lang}/translation.json`)
      ).default as typeof translation;
    })
  );

  return resources;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: await loadResources(),
    supportedLngs: SUPPORTED_LANGUAGES,
  });

export default i18n;
