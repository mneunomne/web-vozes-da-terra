<template>
  <div class="header">
    <div class="title">
      <div>
        <a @click="isMenuOpen = !isMenuOpen" class="nav-link nav-item">Vozes da Terra</a>        
        <NavMenu class="nav-menu" :class="{'isMenuOpen': isMenuOpen}"></NavMenu>
      </div>
    </div>
    <div class="lang-button">
      <span @click="$i18n.locale ='en'" :class="{ 'selected': $i18n.locale === 'en' }">en</span>
      <span @click="$i18n.locale ='pt'" :class="{ 'selected': $i18n.locale === 'pt' }">pt</span>
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
      'getAudioData'
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
<style lang="scss" scoped>
.header {
  margin-bottom: 2em;
  padding: 15px;
  background: url('../assets/images/potes.jpg') fixed no-repeat top;
  background-size: contain;
}

.title {
  display: inline-flex;
}


.nav-menu {
  transition: all 0.3s;
  overflow: hidden;
  height: 0px;
  &.isMenuOpen {
    height: 70px;
  }
} 

.lang-button {
  float: right;
  display: inline-flex;
  background: white;
  span {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    &.selected {
      text-decoration: underline;
    }
  }
}
</style>

