<template>
  <transition name="fade" delay="200">
    <div class="audio-box" v-if="!error">
      <p v-if="title" class="title">{{ title }}</p>
      <p v-else class="filename">{{ filename }}</p>
      <p v-if="performer" class="performer">{{ performer }}</p>
      <p v-if="description" class="description">{{ description }}</p>
      <div class="tags">
        <a 
          class="tag-name"
          v-for="item in tags"
          v-bind:key="item"
          @click="onTagClick"
        >{{ item }}</a>
      </div>
      <div :class="{'loading': !isLoaded}" class="waveform-box" :id="'waveform-' + this.id"></div>
      <div ref="controls" class="controls"></div>
      <a @click="playPause">{{ getIsPlaying ? 'Pause' : 'Play' }}</a>
    </div>
  </transition>
</template>

<script>
import WaveSurfer from 'wavesurfer'
window.WaveSurfer = WaveSurfer

export default {
  name: 'AudioBox',
  data () {
    return {
      wavesurfer: null,
      error: false,
      status: '',
      isLoaded: false
    }
  },
  props: {
    filename: {
      type: String
    },
    performer: {
      type: String
    },
    title: {
      type: String
    },
    tags: {
      type: Array
    },
    description: {
      type: String
    },
    type: {
      type: String
    },
    index: {
      type: Number,
      required: true
    },
    id: {
      type: String,
      required: true 
    }
  },
  computed: {
    getIsPlaying: function () {
      return this.status === 'playing'
    }
  },
  methods: {
    playPause () {
      this.wavesurfer.playPause()
      this.status = this.wavesurfer.isPlaying() ? 'playing' : 'paused'
    },
    onTagClick (evt) {
      this.$emit('onTagClick', evt.target.innerText)
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log('WaveSurfer', WaveSurfer, this.$refs)
      this.wavesurfer = WaveSurfer.create({
          container: '#waveform-' + this.id,
          waveColor: 'black',
          progressColor: 'purple',
          responsive: true,
          mediaControls: true
      })
      this.wavesurfer.on('error',() => {
        this.error = true
      })
      this.wavesurfer.on('ready',() => {
        this.isLoaded = true
      })
      this.wavesurfer.load('/audios/'+this.filename)
    }) 
  }
}
</script>
<style lang="scss" scoped>
.audio-box {
  padding: 1em;
  border:black 1px solid;
  margin-bottom: 1em;
}

.filename {
  word-break: break-all;
}

.waveform-box {
  // width: 100%;
  &.loading {
    background: url('../assets/images/loading.gif') center no-repeat;
    background-size: contain;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  transition: opacity 0.2s .5s;
  opacity: 0;
}
</style>

