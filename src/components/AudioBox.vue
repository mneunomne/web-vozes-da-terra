<template>
  <transition name="fade" delay="200">
    <div class="audio-box" v-if="!error">
      <p class="filename">{{ data.filename }}</p>
      <div class="tags">
        <a 
          class="tag-name"
          v-for="item in data.tags"
          v-bind:key="item"
          @click="onTagClick"
        >{{ item }}</a>
      </div>
      <div class="audioplayer">
        <div :class="{'loading': !isLoaded}" class="waveform-box" :id="'waveform-' + data.id"></div>
        <div ref="controls" class="controls" v-if='isLoaded'>
          <font-awesome-icon @click="playPause" :icon="getIsPlaying ? 'pause' : 'play'"/>
          <span>{{ getIsPlaying ? $t('pause') : $t('play') }}</span>
          <span>{{ currentTime + ' / ' + totalTime }}</span>
        </div>
      </div>
      <p v-if="data.description" class="description">{{ data.description }}</p>
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
      isLoaded: false,
      totalTime: '',
      currentTime: ''
    }
  },
  props: {
    data: {
      type: Object,
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
      this.$root.$emit(this.wavesurfer.isPlaying() ? 'play' : 'pause', this.data.id)
    },
    onTagClick (evt) {
      this.$emit('onTagClick', evt.target.innerText)
    },
    getTimeinMinute (time) {
      var minutes = Math.floor(time / 60)
      var seconds = time - minutes * 60
      return ("0" + minutes).slice(-2) + ':' + ("0" + seconds).slice(-2)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.wavesurfer = WaveSurfer.create({
          container: '#waveform-' + this.data.id,
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
        this.totalTime = this.getTimeinMinute(this.wavesurfer.getDuration().toFixed(0))
        this.currentTime = this.getTimeinMinute(this.wavesurfer.getCurrentTime().toFixed(0))
      })
      this.wavesurfer.on('audioprocess', () => {
        this.currentTime = this.getTimeinMinute(this.wavesurfer.getCurrentTime().toFixed(0))
      })
      this.wavesurfer.load('/audios/'+this.data.filename)

      this.$root.$on('play', (audio_id) => {
        if (audio_id !== this.data.id) {
          this.wavesurfer.pause()
          this.status = 'paused'
        }
      });
    }) 
  },
  beforeDestroy () {
    this.wavesurfer.destroy()
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

.audioplayer {
  padding: 1em;
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

