<template>
  <div class="header" :class="{ 'isDesktop': !getIsMobile }">
    <div class="header--content">
      <div class="nav">
        <a @click="isMenuOpen = !isMenuOpen" class="nav-link nav-item nav-title">Vozes da Terra</a>
        <NavMenu v-if="getIsMobile" class="nav-menu" :class="{'isMenuOpen': isMenuOpen}"></NavMenu>
      </div>
      <div class="lang-button">
        <span @click="$i18n.locale ='en'" :class="{ 'selected': $i18n.locale === 'en' }">en</span>
        <span @click="$i18n.locale ='pt'" :class="{ 'selected': $i18n.locale === 'pt' }">pt</span>
      </div>
    </div>
  </div>
</template>

<script>

import NavMenu from '@/components/NavMenu'

import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: {
    NavMenu
  },
  computed: {
    ...mapGetters([
      'getAudioData',
      'getIsMobile'
    ])
  },
  data () {
    return {
      isMenuOpen: false
    }
  },
  mounted () {
    console.log('getAudioData' ,this.getAudioData)
  }
}
</script>
<style lang="scss">
.header {
  margin-bottom: 2em;
  padding: 15px;
  background: url('../assets/images/terra.jpg') fixed no-repeat top;
  background-size: auto;
  background-position-y: -100%;
  &.isDesktop {
    background-size: 100%; 
    background-position-y: 0px;
    .header--content {
      padding: 2em;
    }
  }
}

.nav {
  display: inline-block; 
}

.nav-title {
  font-size: 1.3em;
}

.nav-menu {
  transition: all 0.3s;
  overflow: hidden;
  height: 0px;
  &.isMenuOpen {
    height: 140px;
  }
}
</style>

