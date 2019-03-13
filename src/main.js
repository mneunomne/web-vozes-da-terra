import './scss/main.scss'

import 'babel-polyfill'

// Plugins
import './plugins/bootstrap'
import './plugins/fontawesome'
import './plugins/notifications'

import infiniteScroll from 'vue-infinite-scroll'

import Vue from 'vue'
import App from './App'

import { createRouter } from './router'
import { createStore } from './store'
import { createI18n } from './i18n'

import AudioVisual from 'vue-audio-visual'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import VueJustifiedLayout from 'vue-justified-layout'

library.add(faPlay, faPause)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(AudioVisual)
Vue.use(infiniteScroll)
Vue.component('vue-justified-layout', VueJustifiedLayout)

export function createApp() {
  const router = createRouter()
  const store = createStore()
  const i18n = createI18n()

  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })

  return { app, router, store }
}

const { app } = createApp()
app.$mount('#app')
