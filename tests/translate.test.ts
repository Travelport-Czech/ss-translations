import { translate } from '../src/translate'
import { enTranslation } from './fixtures/enTranslation'
import { csTranslation } from './fixtures/csTranslation'
import { TranslationEnum } from './fixtures/TranslationEnum'

const translations = {
  en: enTranslation,
  cs: csTranslation
}

const t = (key: TranslationEnum, params: string[], language: string) => {
  return translate(key, params, language, translations)
}

describe('translate test', () => {
  it('should success with basic example with animals', () => {
    const translationKey = TranslationEnum.Dog
    const translationParams = ['Dr.', 'Jack']
    const language = 'en'

    const result = t(translationKey, translationParams, language)
    expect(result).toBe('dog Dr. Jack')
  })

  it('should throw error with bad number od parameters', () => {
    const translationKey = TranslationEnum.Dog
    const translationParams = ['Dr.']
    const language = 'en'

    const toThrow = () => {
      t(translationKey, translationParams, language)
    }
    expect(toThrow).toThrow(`Bad number of params for message 'dog {?} {?}'`)
  })
})
