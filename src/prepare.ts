import { TranslationKeysBase } from './TranslationKeysBase'

export const prepare = (
  translationKey: string,
  translationKeyParams: unknown[],
  language: string,
  translations: { [key: string]: TranslationKeysBase }
): string[] => {
  const translationTable = translations[language]
  if (!translationTable) {
    throw new Error(`Missing translations for language '${language}'`)
  }

  const translatedMessage = translationTable[translationKey]
  if (!translatedMessage) {
    throw new Error(`Missing translations for key '${translationKey}'`)
  }

  const parts = translatedMessage.split('{?}')
  if (parts.length - 1 !== translationKeyParams.length) {
    throw new Error(`Bad number of params for message '${translatedMessage}'`)
  }

  return parts
}
