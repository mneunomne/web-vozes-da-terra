<template>
  <div>
    <form class="form_element"
      v-for="(item, index) in getSomeAudios.slice(0, 10)"
      v-bind:key="item"
    >
      <p>{{ index }}</p>
      filename:<br>
      <input type="text" name="filename" :value="item.filename">
      <br>
      tags:<br>
      <vue-tags-input
        v-model="models[index]"
        :tags="item.tags"
        @tags-changed="newTags => tags = newTags"
      />
      <br>
      audio:<br>
      <vue-audio class="audio-el" :file="'./src/assets/audios/'+item.filename"/>
    </form>
  </div>
</template>

<script>
import VueAudio from 'vue-audio'
import VueTagsInput from '@johmun/vue-tags-input'
import AudioBox from '@/components/AudioBox'
import { mapGetters } from 'vuex'

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
      models: []
    }
  },
  computed: {
    ...mapGetters([
      'getSomeAudios'
    ])
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.form_element {
  border: 1px solid #ccc;
  padding: 1em;
  margin-bottom: 2em;
}

input {
  width: 450px;
  margin-bottom: 0.5em;
}

.audio-el {
  display: -webkit-inline-box;
  border: 1px solid #ccc;
  height: 47px;
  padding: 0px 5px 5px 5px;
}
</style>

