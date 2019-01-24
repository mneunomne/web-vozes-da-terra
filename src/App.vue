<template>
  <div id="app">
    <Header></Header>
      <b-container fluid>
        <b-row>
          <b-col md="2" v-if="!getIsMobile">
            <a class="nav-link nav-item">Vozes da Terra</a>
            <NavMenu class="nav-menu" :class="{'isMenuOpen': true}"></NavMenu>
          </b-col>
          <b-col md="8">
            <router-view/>
          </b-col>
          <div class="lang-button" v-if="!getIsMobile">
            <span @click="$i18n.locale ='en'" :class="{ 'selected': $i18n.locale === 'en' }">en</span>
            <span @click="$i18n.locale ='pt'" :class="{ 'selected': $i18n.locale === 'pt' }">pt</span>
          </div>
        </b-row>
      </b-container>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NavMenu from '@/components/NavMenu'
import Vue from 'vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Footer,
    NavMenu
  },
  name: 'App',
  data() {
    return {
      index: 0,
      isMobile: window.innerWidth <= 700
    }
  },
  computed: {
    ...mapGetters([
      'getIsMobile'
    ])
  },
  created () {
    window.addEventListener('resize', () => {
      this.setIsMobile()
    })
    this.setLocalData()
    this.setTags()
    this.setTypes()
  },
  methods: {
    ...mapActions([
      'setTags',
      'setIsMobile',
      'setLocalData',
      'setTypes'
    ])
  },
  mounted () {
  }
}
</script>
<style lang="scss">
body, html {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
