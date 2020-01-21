import { TranslationKeysBase } from '../../src/translate'
import { TranslationEnum } from './TranslationEnum'

export interface TranslationKeys extends TranslationKeysBase {
  readonly [TranslationEnum.Cat]: string,
  readonly [TranslationEnum.Dog]: string
}
