<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <router-view/>
    </b-container>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Header,
    Footer
  },
  name: 'App',
  data() {
    return {
      index: 0
    }
  },
  mounted () {
    this.setTags()
  },
  methods: {
    ...mapActions([
      'setTags'
    ])
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
