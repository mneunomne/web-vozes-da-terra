<template>
  <div class="audio-box" v-if="type === 'toantes' && !error">
    <p class="filename">{{ filename }}</p>
    <div class="tags">
      <a class="tag-name" v-for="item in tags" v-bind:key="item">{{ item }}</a>
    </div>
    <div class="waveform-box" :id="'waveform-' + this.index"></div>
    <a @click="play">Play</a>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer'
export default {
  name: 'AudioBox',
  data () {
    return {
      wavesurfer: null,
      error: false
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
    }
  },
  methods: {
    play () {
      this.wavesurfer.play()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.wavesurfer = WaveSurfer.create({
          container: '#waveform-' + this.index,
          waveColor: 'black',
          progressColor: 'purple'
      })
      this.wavesurfer.on('error',() => {
        this.error = true
      });
      this.wavesurfer.load('./src/assets/audios/'+this.filename)
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

a {
  cursor: pointer;
  margin-right: 4px;
  font-size: 10px;
  display: inline-block;
  text-decoration: underline !important;
  &:hover {
    color: blue !important;
  }
}

.waveform-box {
  // width: 100%;
}
</style>

