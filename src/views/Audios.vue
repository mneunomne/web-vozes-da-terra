<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <header class="mb-4">
      <div class="row">
        <h3 class="page-title">{{ $t('audios.title') }}</h3>
        <div class="filter-types">
          <a
            class="tag-name"
            v-for="tag in getTags.filter((_t) => {return _t[1]>0})"
            v-bind:key="tag[0]"
            @click="filterByTag(tag[0])"
            :class="{'active': currentFilter === tag[0]}"
          >{{ tag[0] }}</a>
        </div>
      </div>
      <h4 v-if="currentFilter !== ''">{{ currentFilter }}:</h4>
    </header>
    <div v-infinite-scroll="loadAudios" infinite-scroll-disabled="busy">
      <AudioBox
        v-for="item in getCurrentAudios()"
        v-bind:key="item.id"
        :data="item"
        @onTagClick="filterByTag"
      ></AudioBox>
    </div>
  </b-col>
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
      currentFilter: ''
    }
  },
  components: {
    AudioBox
  },
  computed: {
    ...mapGetters([
      'getAudioData',
      'getTypes',
      'getTags',
      'getIsMobile'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAudiosByTags',
      'fetchAudiosByType'
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
      this.currentFilter = data
      this.lastAudioIndex = 0
      this.fetchAudiosByTags(data).then(resp => {
        this.isFiltering = true
        this.filteredAudios = resp
      })
    },
    onTagClick (evt) {
      console.log('filter type')
      let type = evt.target.innerText
      this.currentFilter = type
      this.lastAudioIndex = 0
      this.fetchAudiosByTag(tag).then(resp => {
        this.isFiltering = true
        this.filteredAudios = resp
      })
    }
  },
  mounted () {
    console.log('types', this.getTypes)
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}


.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}

.page-title {
  width: 100%;
  margin-bottom: 0.5em;
}

.filter-types {
  text-decoration: underline;
  .tag-name {
    font-size: 12px;
    text-transform: capitalize;
  }
}
</style>

