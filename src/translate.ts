export interface TranslationKeysBase {
  [key: string]: string
}

export const translate = (
  translationKey: string,
  translationKeyParams: string[],
  language: string,
  translations: { [key: string]: TranslationKeysBase }
) => {
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

  return parts.reduce((prev, current, index): string => {
    const message = current.replace(/{_}/g, '\u00a0')
    return `${prev}${message}${translationKeyParams[index] ? translationKeyParams[index] : ''}`
  }, '')
}
