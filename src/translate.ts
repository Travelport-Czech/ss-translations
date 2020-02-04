import { TranslationKeysBase } from './TranslationKeysBase'
import { prepare } from './prepare'

export const translate = (
  translationKey: string,
  translationKeyParams: string[],
  language: string,
  translations: { [key: string]: TranslationKeysBase }
) => {
  const parts = prepare(translationKey, translationKeyParams, language, translations)

  return parts.reduce((prev, current, index): string => {
    const message = current.replace(/{_}/g, '\u00a0')
    return `${prev}${message}${translationKeyParams[index] ? translationKeyParams[index] : ''}`
  }, '')
}
