<template>
  <div>
    <h3>{{ $t('audios.title') }}</h3>
    <div v-infinite-scroll="loadAudios" infinite-scroll-disabled="busy">
      <AudioBox
        v-for="(item, index) in getCurrentAudios()"
        v-bind:key="index"
        :filename="item.filename"
        :tags="item.tags"
        :index="index"
        :type="item.type"
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
      maxItensPerPage: 15
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
      let start = Math.max(0, end-this.maxItensPerPage)
      return resp.slice(start, end) 
    },
    loadAudios () {
      console.log('load', this.lastAudioIndex)
      this.lastAudioIndex += 1
    },
    filterByTag (data) {
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
