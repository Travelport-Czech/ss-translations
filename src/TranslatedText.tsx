import * as React from 'react'
import { prepare } from './prepare'
import { TranslationKeysBase } from './TranslationKeysBase'

interface Props {
  name: string,
  language: string,
  translations: { [key: string]: TranslationKeysBase }
}

export const TranslatedText: React.FunctionComponent<Props> = (props) => {
  const {
    name,
    language,
    translations,
    children
  } = props

  const childrenList = React.Children.toArray(children)

  const parts = prepare(name, childrenList, language, translations)

  const result = parts.reduce((acc: React.ReactNode[], current: string, index: number): React.ReactNode[] => {
    acc.push(
      <React.Fragment key={index}>
        {current.replace(/{_}/g, '\u00a0')}
        {childrenList[index]}
      </React.Fragment>
    )

    return acc
  }, [])

  return <React.Fragment>{result}</React.Fragment>
}
