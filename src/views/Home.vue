<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <div class="row page-title">
      <b-col md="12">
        <h3>{{ $t('home.title') }}</h3>
      </b-col>
    </div>
    <div class="row img-section thumb">
      <b-col md="12">
        <img class="img-fluid" :src="require('../assets/images/home/fernando_pote.jpg')"/>
        </br>
      </b-col>
    </div>
    <div class="row">
      <b-col md="12" v-html="$t('about.text')"></b-col>
    </div>
    <div class="row img-section thumb">
      <b-col md="6">
        <img class="img-fluid" :src="require('../assets/images/foto_1.jpg')"/>
        <p class="img-caption">{{ $t('about.caption1') }}</p>
      </b-col>
      <b-col md="6">
        <img class="img-fluid" :src="require('../assets/images/home/ceramica_pank_ce.jpg')"/>
        <p class="img-caption">{{ $t('about.caption2') }}</p>
      </b-col>
    </div>
    <div class="row quote">
      <p><i>{{ $t('about.quote') }}</i></p>
      <p>Fernando Pankararu</p>
    </div>
    <div class="row quote">
      <b-col md="12">
        <AudioBox v-if="getAudioData.filter((a) => { return a.id === 'aglhi3' })[0].id" :data="getAudioData.filter((a) => { return a.id === 'aglhi3' })[0]"/>
      </b-col>
    </div>
    <!--
    <div class="row img-section thumb">
      <b-col md="12">
        <img class="img-fluid" :src="require('../assets/images/home/diagrama_dispositivo.jpg')"/>
      </b-col>
    </div>
    -->
  </b-col>
</template>
<script>

import AudioBox from '@/components/AudioBox'
import swal from 'sweetalert2'
import VueNotifications from 'vue-notifications'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    AudioBox
  },
  computed: {
    ...mapGetters([
      'getIsMobile',
      'getAudioData'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAudioById'
    ])
  }
}
</script>
<style lang="scss" scoped>

</style>

