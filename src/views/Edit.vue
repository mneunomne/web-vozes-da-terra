<template>
  <div>
    <form class="password" v-if="!isPasswordCorrect">
      Enter password:<br>
      <input type="password" name="password" value="" v-model="password">
    </form>
    <div v-else>
      <b-row class="mb-2">
        <button class="btn-success" @click="onSave">Save</button>
      </b-row>
      <form class="form_element"
        v-for="(item, index) in getAudioData"
        v-bind:key="item"
      >
        <div class="form-row">
          filename:<br>
          <input type="text" name="filename" :value="item.filename">
        </div>
        <div class="form-row">
          id:<br>
          <p><b>{{ item.id }}</b></p>
        </div>
        <div  class="form-row">
          tags:<br>
          <vue-tags-input
            v-model="models[index]"
            :tags="item.tags"
            @tags-changed="newTags => tags = newTags"
          />
        </div>
        <div  class="form-row">
        <br>
          audio:<br>
          <vue-audio class="audio-el" :file="'./src/assets/audios/'+item.filename"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueAudio from 'vue-audio'
import VueTagsInput from '@johmun/vue-tags-input'
import AudioBox from '@/components/AudioBox'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Audios',
  components: {
    AudioBox,
    VueTagsInput,
    VueAudio
  },
  data() {
    return {
      tag: '',
      tags: [],
      models: [],
      password: 'vozesdaterrapankararu'
    }
  },
  computed: {
    isPasswordCorrect: function () {
      return this.password === 'vozesdaterrapankararu'
    },
    ...mapGetters([
      'getSomeAudios',
      'getCanEdit',
      'getAudioData',
      'getTypes'
    ])
  },
  methods: {
    ...mapActions([
      'setCanEdit',
      'updateJSON',
      'fetchAudiosByType',
      'saveJson'
    ]),
    onSave () {
      console.log('save')
      this.saveJson()
      // get Data
      
      // this.updateJSON()
    },
    onTypeClick (type) {
      console.log('type', type)
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
form {
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 2em;
}

input {
  margin-bottom: 0.5em;
  border: 1px solid #ccc;
  width: 450px;
  max-width: 100%;
}

.password {
  input {
    border: 1px solid red;
  }
}

.audio-el {
  display: -webkit-inline-box;
  border: 1px solid #ccc;
  height: 47px;
  padding: 0px 5px 5px 5px;
}
</style>

