import Vue from 'vue'
import Vuex from 'vuex'
import audio_data from '@/assets/audios' 

Vue.use(Vuex)

const state = {
  data: audio_data,
  tags: [],
  canEdit: false
}

const getters = {
  getAudioData (state) {
    return state.data
  },
  getSortedTags (state) {
    return state.tags
  },
  getSomeAudios (state) {
    return state.data.slice(0, 100)
  },
  getCanEdit (state) {
    return state.canEdit
  }
}

const actions = {
  setTags ({state, commit}) {    
    let payload = []
    let data = state.data
    for (let i in data) {
      let tags = data[i].tags
      for (let j in tags) {
        let tagName = tags[j].toLowerCase()
        let hasFound = false
        for (let l in payload){
          if (payload[l][0] === tagName) {
            payload[l][1]++
            hasFound = true
            break
          }
        }
        if (!hasFound) {
          payload[payload.length] = [tagName, 0]
        }
      }
    }
    payload.sort(function(a, b) {
      return b[1] - a[1];
    });
    commit('set_tags', payload)
  },
  setCanEdit({commit}) {
    commit('set_can_edit')
  }
}

const mutations = {
  set_tags (state, payload) {
    state.tags = payload
  },
  set_can_edit (state) {
    state.canEdit = true
  }
}

export function createStore() {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}