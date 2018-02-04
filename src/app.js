import './sass/app.scss'
import './load-client-scripts'

import Vue from 'vue'
import 'babel-polyfill'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'

import App from './App.vue'

import { createRouter } from './router'
import { createStore } from './store'

Vue.use(BootstrapVue)

export function createApp () {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return { app, router, store }
}

const { app } = createApp()
app.$mount('#app')
