/**
 * Vue app ( https://github.com/viticm/vue-app )
 * $Id index.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2014- viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm<viticm.ti@gmail.com>
 * @date 2020/04/27 19:57
 * @uses The vue app lang config.
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import settings from '@/settings'
import vuetify from '@/lang/vuetify'
import en from './en_US'
import zh from './zh_CN'
import { storeGet } from '@/utils/store'

Vue.use(VueI18n)

const messages = {
  en: {
    ...en,
    $vuetify: vuetify.en,
  },
  'zh-CN': {
    ...zh,
    $vuetify: vuetify.zh,
  }
}

export function getLanguage() {
  const chooseLanguage = storeGet('VUE-APP-LANGUAGE')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

/**
 * VueI18n instance
 */
const i18n = new VueI18n({
  // No warning
  silentFallbackWarn: true,
  // set locale options: en_US | zh_CN
  locale: getLanguage(),
  // set locale messages
  messages
})

/**
 * Set locale to new value at Vue and Vuex.
 *
 * @param {Boolean} newLocale themeDark new value
 */
export async function setLocale(locale) {
  if (i18n.locale !== locale) {
    console.log(`[Locale] Set to "${locale}"`)
    i18n.locale = locale || settings.locale
  } else {
    console.warn(`[Locale] "${locale}" is current`)
  }
}

export default i18n
