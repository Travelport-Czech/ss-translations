import { translateImport } from '../src/translateImport'
import * as fs from 'fs'
import * as path from 'path'

const fileName = path.join(__dirname, '../tests/fixtures/translations.xlsx')
const csTranslationCopiedPath = path.join(__dirname, '../csTranslation.ts')
const enTranslationCopiedPath = path.join(__dirname, '../enTranslation.ts')
const translationFilePaths = {
  cs: csTranslationCopiedPath,
  en: enTranslationCopiedPath
}

describe('import test', () => {
  it('should import to typescript files', () => {
    fs.unlinkSync(csTranslationCopiedPath)
    fs.unlinkSync(enTranslationCopiedPath)
    fs.copyFileSync(path.join(__dirname, '../tests/fixtures/csTranslation.ts'), csTranslationCopiedPath)
    fs.copyFileSync(path.join(__dirname, '../tests/fixtures/enTranslation.ts'), enTranslationCopiedPath)
    translateImport(fileName, translationFilePaths)

    const file = fs.readFileSync(enTranslationCopiedPath)
    expect(file.toString()).toBe(`\
import { TranslationKeys } from './TranslationKeys'

export const enTranslation: TranslationKeys = {
  Cat: 'cat',
  Dog: 'dog new {?} {?}'
}
`)
  })
})
