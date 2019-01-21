<template>
  <div>
    <h2>{{ $t('audios.title') }}</h2>
    <h3 v-if="currentTag !== ''">{{ currentTag }}</h3>
    <div v-infinite-scroll="loadAudios" infinite-scroll-disabled="busy">
      <AudioBox
        v-for="(item, index) in getCurrentAudios()"
        v-bind:key="item.id"
        :filename="item.filename"
        :tags="item.tags"
        :index="index"
        :type="item.type"
        :id="item.id"
        @onTagClick="filterByTag"
      ></AudioBox>
    </div>
  </div>
</template>

<script>
import AudioBox from '@/components/AudioBox'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Audios',
  data () {
    return {
      busy: false,
      audios: [],
      filteredAudios: [],
      lastAudioIndex: 5,
      isFiltering: false,
      maxItensPerPage: 15,
      currentTag: ''
    }
  },
  components: {
    AudioBox
  },
  computed: {
    ...mapGetters([
      'getAudioData'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAudiosByTags'
    ]),
    getCurrentAudios () {
      let resp = this.isFiltering ? this.filteredAudios : this.getAudioData
      let end =  Math.min(this.lastAudioIndex+5, resp.length)
      let start = 0
      return resp.slice(start, end) 
    },
    loadAudios () {
      this.busy = true
      setTimeout(() => {
        this.lastAudioIndex += 1
        this.busy = false
      }, 300)
    },
    filterByTag (data) {
      this.currentTag = data
      this.lastAudioIndex = 0
      this.fetchAudiosByTags(data).then(resp => {
        this.isFiltering = true
        this.filteredAudios = resp
      })
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>

