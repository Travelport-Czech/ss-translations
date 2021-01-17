# ss-translations
Strict and Simple Translation Solution for typescript

## Install

```
> npm install @travelport-czech/ss-translations
```

## Usage
```typescript
import { translate } from './translate'
import { TranslationKeysBase } from './TranslationKeysBase'

enum TranslationEnum {
  Cat = 'Cat',
  Dog = 'Dog'
}

interface TranslationKeys extends TranslationKeysBase {
  readonly [TranslationEnum.Cat]: string,
  readonly [TranslationEnum.Dog]: string
}

const enTranslation: TranslationKeys = {
  Cat: 'cat',
  Dog: 'dog {?} {?}'
}

const csTranslation: TranslationKeys = {
  Cat: 'kočka',
  Dog: 'pes {?} {?}'
}

const translations = {
  en: enTranslation,
  cs: csTranslation
}

const t = (key: TranslationEnum, params: string[], language: string) => {
  return translate(key, params, language, translations)
}

const translationKey = TranslationEnum.Dog
const translationParams = ['Dr.', 'Jack']
const language = 'en'

const result = t(translationKey, translationParams, language)
// result: 'dog Dr. Jack'
```

Number of params {?} is checked:

```typescript
const translationKey = TranslationEnum.Dog
const translationParams = ['Dr.']
const language = 'en'

const result = t(translationKey, translationParams, language)
// throws `Bad number of params for message 'dog {?} {?}'`
```

All translations must have all keys:

```typescript
const skTranslation: TranslationKeys = {
  Cat: 'mačka'
}
// Property '[TranslationEnum.Dog]' is missing in type
```

No fails in translation key name:

```typescript
const translationKey = 'Dok'
const translationParams = ['Dr.']
const language = 'en'

const result = t(translationKey, translationParams, language)
// Typescript parser: Argument of type '"Dok"' is not assignable to parameter of type 'TranslationEnum'.
```

No typing errors:

```typescript
const skTranslation: TranslationKeys = {
  Cat: 'mačka',
  Dok: 'pes'
}
// Typescript parser: Property '[TranslationEnum.Dog]' is missing in type
```

No character collisions:

```typescript
const skTranslation: TranslationKeys = {
  Cat: 'mačka',
  Dog: 'pe's'
}
// Typescript parser: ',' expected.
```

## Usage with React
```typescript
import { TranslatedText } from './TranslatedText'
import { TranslationKeysBase } from './TranslationKeysBase'
import * as React from 'react'

enum TranslationEnum {
  Cat = 'Cat',
  Dog = 'Dog'
}

interface TranslationKeys extends TranslationKeysBase {
  readonly [TranslationEnum.Cat]: string,
  readonly [TranslationEnum.Dog]: string
}

const enTranslation: TranslationKeys = {
  Cat: 'cat',
  Dog: 'dog {?} {?}'
}

const csTranslation: TranslationKeys = {
  Cat: 'kočka',
  Dog: 'pes {?} {?}'
}

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

<Text name={TranslationEnum.Dog} language="en">
    <span>Dr.</span>
    <span>Jack</span>
</Text>

// after render: dog <span>Dr.</span> <span>Jack</span>
```

## Placeholders
* `{?}` - parameter
* `{_}` - fixed space

## Export and Import to/from Excel

use tools repo [ss-translations-tools](https://github.com/Travelport-Czech/ss-translations-tools)

## Prepare development environment

Clone project
```bash
> git clone ...
```
Install dependencies
```bash
> npm install
```
Run tests
```bash
> npm run test
```

## Version release workflow

Version is automatically changed if the master branch is changed

* Based on the commit messages, increment the version from the lastest release.
If the string "BREAKING CHANGE" is found anywhere in any of the commit messages or descriptions the major version will be incremented.
* If a commit message begins with the string "feat" then the minor version will be increased. This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".
* All other changes will increment the patch version.
