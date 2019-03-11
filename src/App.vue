<template>
  <div id="app">
    <Header></Header>
      <b-container fluid>
        <b-row>
          <b-col class="side-menu" md="2" v-if="!getIsMobile">
            <NavMenu class="nav-menu" :class="{'isMenuOpen': true}"></NavMenu>
          </b-col>
          <b-col md="9">
            <router-view/>
          </b-col>
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
    this.setAudioData()
    this.setLocalData()
    this.setTags()
    this.setTypes()
  },
  methods: {
    ...mapActions([
      'setTags',
      'setIsMobile',
      'setLocalData',
      'setTypes',
      'setAudioData'
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

.nav-title {
  font-size: 15px
}
</style>
