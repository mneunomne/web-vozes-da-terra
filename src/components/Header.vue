<template>
  <div class="header" :class="{ 'isDesktop': !getIsMobile }">
    <div class="header--content" v-if="getIsMobile">
      <div class="title">
        <a @click="isMenuOpen = !isMenuOpen" class="nav-link nav-item">Vozes da Terra</a>
        <NavMenu class="nav-menu" :class="{'isMenuOpen': isMenuOpen}"></NavMenu>
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
  margin-bottom: 3em;
  padding: 20px;
  background: url('../assets/images/potes_alta.jpg') fixed no-repeat top;
  background-size: 100vw;
  &.isDesktop {
    min-height: 180px;
  }
}

.title {
  display: inline-block; 
}

.nav-menu {
  transition: all 0.3s;
  overflow: hidden;
  height: 0px;
  &.isMenuOpen {
    height: 168px;
  }
}
</style>

