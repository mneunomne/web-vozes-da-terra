<template>
  <transition name="fade" delay="200">
    <div class="audio-box" v-if="!error">
      <p class="filename">{{ filename }}</p>
      <div class="tags">
        <a 
          class="tag-name"
          v-for="item in tags"
          v-bind:key="item"
          @click="onTagClick"
        >{{ item }}</a>
      </div>
      <div class="audioplayer">
        <div :class="{'loading': !isLoaded}" class="waveform-box" :id="'waveform-' + this.id"></div>
        <div ref="controls" class="controls" v-if='isLoaded'>
          <font-awesome-icon @click="playPause" :icon="getIsPlaying ? 'pause' : 'play'"/>
          <span>{{ getIsPlaying ? $t('pause') : $t('play') }}</span>
          <span>{{ currentTime + ' / ' + totalTime }}</span>
        </div>
      </div>
      <p v-if="description" class="description">{{ description }}</p>
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
    filename: {
      type: String,
      required: true
    },
    tags: {
      type: Array
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
    },
    description: {
      type: String,
      required: false
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
        this.totalTime = this.getTimeinMinute(this.wavesurfer.getDuration().toFixed(0))
        this.currentTime = this.getTimeinMinute(this.wavesurfer.getCurrentTime().toFixed(0))
      })
      this.wavesurfer.on('audioprocess', () => {
        this.currentTime = this.getTimeinMinute(this.wavesurfer.getCurrentTime().toFixed(0))
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

.audioplayer {
  padding: 1em;
  margin-bottom: 1em;
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

