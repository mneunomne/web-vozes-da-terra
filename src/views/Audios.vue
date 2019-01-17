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
      lastAudioIndex: 0,
      isFiltering: false
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
      if (this.isFiltering) {
        return this.filteredAudios
        } else {
        return this.getAudioData
      }
    },
    loadAudios () {
      let cur = this.getCurrentAudios()
      let len = cur.length
      let counter = 0
      for(let i in cur.slice(this.index, len)) {
        counter++
        if (counter > 10) break
        this.audios.push(cur[i])
        this.lastAudioIndex++
      }
    },
    filterByTag (data) {
      this.lastAudioIndex = 0
      // console.log('data', data)
      this.fetchAudiosByTags(data).then(resp => {
        console.log('resp', resp)
        this.isFiltering = true
        this.filteredAudios = resp
      })
    }
  },
  mounted () {
    this.loadAudios()
  }
}
</script>
