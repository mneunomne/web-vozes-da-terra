<template>
  <b-col :md="getIsMobile ? 12 : 9">
    <header class="mb-4">
      <div class="row">
        <h3 class="page-title">{{ $t('audios.title') }}</h3>
      </div>
      <div class="filter-types">
        <a
          class="tag-name"
          v-for="type in getTypes"
          v-bind:key="type[0]"
          @click="onTypeClick"
          :class="{'active': currentFilter === type[0]}"
        >{{ type[0] }}</a>
      </div>
      <h3 v-if="currentFilter !== ''">{{ currentFilter }}</h3>
    </header>
    <div v-infinite-scroll="loadAudios" infinite-scroll-disabled="busy">
      <AudioBox
        v-for="(item, index) in getCurrentAudios()"
        v-bind:key="item.id"
        :filename="item.filename"
        :tags="item.tags"
        :index="index"
        :type="item.type"
        :id="item.id"
        :description="'this is a description'"
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
    onTypeClick (evt) {
      console.log('filter type')
      let type = evt.target.innerText
      this.currentFilter = type
      this.lastAudioIndex = 0
      this.fetchAudiosByType(type).then(resp => {
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

.page-title {
  display: -webkit-inline-box;
}

.filter-types {
  float: right;
  .tag-name {
    font-size: 12px;
  }
}
</style>

