// eslint-disable-next-line no-use-before-define
import React from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/i18n/config'

export function wrapRootElement({ element }) {
  return <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
}
