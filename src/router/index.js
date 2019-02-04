import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import About from '@/views/About'
import Contact from '@/views/Contact'
import Audios from '@/views/Audios'
import Edit from '@/views/Edit'
import Gallery from '@/views/Gallery'

Vue.use(Router)

export function createRouter() {
  return new Router({
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/audios',
        name: 'audios',
        component: Audios
      },
      {
        path: '/contact',
        name: 'contact',
        component: Contact
      },
      {
        path: '/edit',
        name: 'edit',
        component: Edit
      },
      {
        path: '/gallery',
        name: 'gallery',
        component: Gallery
      }
    ]
  })
}
