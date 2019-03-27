<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <div class="row page-title">
      <h3>{{ $t('home.title') }}</h3>
    </div>
    <div class="row img-section thumb">
      <b-col md="12">
        <img class="img-fluid" :src="require('../assets/images/home/fernando_pote.jpg')"/>
      </b-col>
    </div>
    <div class="row">
      <p>O projeto artístico de cunho antropológico “Voz da Terra” desenvolve artefatos eletrônicos sonoros que possibilitam a escuta, amplificação e produção de memória na cultura indígena. Este artefato é co-criado com povos indígenas, e mescla a tradição ancestral com tecnologias digitais de comunicação e armazenamento de informação. O dispositivo tecno-indígena consiste em um mini-computador(raspberry pi) com a capacidade de gravar áudio,  para posteriormente armazenar e executar o conteúdo automaticamente na web e em outro dispositivo emissor. Esse sistema é acoplado e montado dentro de objetos de cerâmica construído por artesãos integrantes das aldeias.</p>
      <p>Em um orifício modelado na escultura de barro os habitantes da aldeia podem gravar: cânticos tradicionais; reclames sobre suas lutas e resistências por demarcação de terras; histórias da tribo e demais mensagens que valorizem, fortaleçam e empoderem a aldeia. Esse material armazenado na web compõem o banco de sonoridades presente nesta plataforma de acesso público, que tem por objetivo a salvaguarda, difusão, amplificação e transmissão da memória e patrimônio cultural da Aldeia.</p>
      <p>Além da função de guardar e propagar a cultura indígena, este vasilhame de cerâmica, mistura de barro e silício, pode ser usado também como emissor sonoro em performances, e itinerância em diversos espaços. Ao circular por outras Aldeias e espaços urbanos/culturais, a cerâmica leva um pedaço de terras indígenas, preenchida por suas histórias e cultura. A “Voz da Terra” é um projeto open-source, compartilhando saberes, para realização de uma tecnologia cidadã-aldeã.</p>
    </div>
    <div class="row img-section thumb">
      <b-col md="12">
        <img class="img-fluid" :src="require('../assets/images/foto_1.jpg')"/>
      </b-col>
    </div>
    <AudioBox v-if="getAudioData.filter((a) => { return a.id === 'aglhi3' })[0].id" :data="getAudioData.filter((a) => { return a.id === 'aglhi3' })[0]"/>
    <div class="row img-section thumb">
      <b-col md="12">
        <img class="img-fluid" :src="require('../assets/images/home/diagrama_dispositivo.jpg')"/>
      </b-col>
    </div>
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

