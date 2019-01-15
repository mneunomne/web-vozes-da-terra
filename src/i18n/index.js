import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Locales
import en from './en'
import pt from './pt'

Vue.use(VueI18n)

export function createI18n() {
  return new VueI18n({
    locale: process.env.APP_LOCALE || 'pt',
    messages: {
      en,
      pt
    }
  })
}
