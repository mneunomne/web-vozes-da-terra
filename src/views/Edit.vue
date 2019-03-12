<template>
  <b-col md="9">
    <form class="password" v-if="!isPasswordCorrect">
      Enter password:<br>
      <input type="password" name="password" value="" v-model="password">
    </form>
    <div v-else>
      <b-row class="mb-2">
        <button class="btn-success" @click="onSave">Save</button>
      </b-row>
      <form class="form_edit">
        <form class="form_element"
          v-for="(item, index) in formData"
          :key="index"
        >
          <!-- Filename -->
          <div class="input_field">
            Filename<br>
            <input class="value" disabled="true" type="text" name="filename" :value="item.filename">
          </div>
          <!-- Title -->
          <div class="input_field">
            Title<br>
            <input class="value" type="text" @input="evt => onChange(evt, 'title', item.id)" :value="item.title">
          </div>
          <!-- Voice -->
          <div class="input_field">
            Performer<br>
            <input class="value" type="text" @input="evt => onChange(evt, 'voiceOf', item.id)" name="author" :value="item.voiceOf">
          </div>
          <!-- Description -->
          <div class="input_field">
            Description<br>
            <textarea class="value" @input="evt => onChange(evt, 'description', item.id)" type="description" name="filename" :value="item.description"></textarea>
          </div>
          <!-- Type -->
          <div class="input_field">
            Type<br>
            <select name="" id="">
              <option>{{ item.type }}</option>
              <option>toantes</option>
              <option>sons</option>
            </select>
          </div>
          <!-- ID -->
          <div class="input_field">
            Id<br>
            <input class="value" disabled="true" type="text" name="filename" :value="item.id">
          </div>
          <!-- TAGS -->
          <div  class="input_field">
            Tags<br>
            <vue-tags-input v-if="item.tags !== undefined"
              @before-adding-tag="handler => addingTag(handler, item.id)"
              v-model="tags[item.id]"
              :tags="validateTags(item.tags)"
              @tags-changed="newTags => onChangeTags(newTags, item.id)"
            />
          </div>
          <!-- MEDIA ELEMENT -->
          <div class="audio-el">
            <vue-audio :file="'./audios/'+item.filename"/>
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="onClickDelete(item.id)"
          >Delete</button>
        </form>
      </form>
    </div>
  </b-col>
</template>

<script>
import VueAudio from 'vue-audio'
import { VueTagsInput, createTag, createTags } from '@johmun/vue-tags-input';
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
      formData: [],
      payload: {},
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
      let payload = this.payload
      for (let id in payload){
        this.formData = this.formData.map(function (item) {
          if (item.id === id) {
            for (let field in payload[id]) {
              item[field] = payload[id][field]
            }
          }
          return item
        })
      }
      this.updateJSON(this.formData)
    },
    onChangeTags (newTags, id) {
      this.formData = this.formData.filter(function (item) {
        if (item.id === id) {
          item.tags = newTags.map(function(tag) {
            return tag.text
          })
        }
        return true
      })
    },
    onChange (evt, type, id) {
      console.log('evt', evt)
      let data = evt.target.value
      this.payload[id] = {}
      this.payload[id][type] = data
    },
    addingTag(handler, id) {
      handler.addTag()
      this.tags[id] = ''
    },
    validateTags (tags) {
      return createTags(tags)
    },
    onClickDelete (id) {
      var r = confirm("Tem certeza que quer deletar esse áudio ?")
      if (r == true) {
        this.formData = this.formData.filter(function (item) {
          return item.id !== id
        })
      }
    }
  },
  mounted () {
    this.formData = this.getAudioData
    console.log('this.formData', this.formData)
  },
  watch: {
    getAudioData (val) {
      this.formData = this.getAudioData
    }
  }
}
</script>
<style lang="scss" scoped>
form {
  padding: 1em;
  margin-bottom: 2em;
}

.input_field {
  margin-bottom: 0.5em;
}

.form_element {
  border: 1px solid #ccc;
}

.value {
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

.btn-danger {
  float: right;
}

.audio-el {
  display: -webkit-inline-box;
  height: 47px;
  padding: 0px 5px 5px 5px;
}
</style>

