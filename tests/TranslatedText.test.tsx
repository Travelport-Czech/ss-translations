import { TranslatedText } from '../src'
import { enTranslation } from './fixtures/enTranslation'
import { csTranslation } from './fixtures/csTranslation'
import { TranslationEnum } from './fixtures/TranslationEnum'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const translations = {
  en: enTranslation,
  cs: csTranslation
}

interface Props {
  name: TranslationEnum,
  language: string
}

const Text: React.FunctionComponent<Props> = (props) => {
  const newProps = {
    ...props,
    translations
  }
  return TranslatedText(newProps)
}

describe('TranslatedText test', () => {
  it('should success with basic example with animals', () => {
    const result = renderToStaticMarkup(
      <Text name={TranslationEnum.Dog} language="en">
        {'Dr.'}
        {'Jack'}
      </Text>
    )
    expect(result).toBe('dog Dr. Jack')
  })

  it('should success with use html in param', () => {
    const result = renderToStaticMarkup(
      <Text name={TranslationEnum.Dog} language="en">
        <span>Dr.</span>
        <span>Jack</span>
      </Text>
    )
    expect(result).toBe('dog <span>Dr.</span> <span>Jack</span>')
  })

  it('should throw error with bad number od parameters', () => {
    const toThrow = () => {
      renderToStaticMarkup(
        <Text name={TranslationEnum.Dog} language="en">
          {'Dr.'}
        </Text>
      )
    }
    expect(toThrow).toThrow(`Bad number of params for message 'dog {?} {?}'`)
  })

  it('should success with hard space', () => {
    const result = renderToStaticMarkup(
      <Text name={TranslationEnum.Wolf} language="en">
        <span>Snowy</span>
      </Text>
    )
    expect(result).toBe('wolf <span>Snowy</span>')
  })
})
