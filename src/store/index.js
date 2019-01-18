import Vue from 'vue'
import Vuex from 'vuex'
import audio_data from '@/assets/audios' 
import utils from '@/utils'


Vue.use(Vuex)

const state = {
  data: audio_data,
  tags: [],
  canEdit: false,
  isMobile: window.innerWidth < 845
}

const getters = {
  getAudioData (state) {
    return state.data
  },
  getSortedTags (state) {
    return state.tags
  },
  getSomeAudios (state) {
    return state.data.slice(0, 30)
  },
  getCanEdit (state) {
    return state.canEdit
  },
  getIsMobile (state) {
    return state.isMobile
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
  },
  setLocalData ({state, commit}) {
    let payload = state.data
    for (let i in payload) {
      payload[i].id = utils.generateUID()
    }
    commit('set_data', payload)
  },
  updateJSON({state}, data) {
    const blob = new Blob([data], {type: ''})
  },
  fetchAudiosByTags ({state}, filter) {
    let response = []
    let data = state.data
    for (let i in data) {
      let tags = data[i].tags
      for (let j in tags) {
        if (tags[j].toLowerCase() === filter.toLowerCase()) {
          response.push(data[i])
        }
      }
    }
    return response
  },
  setIsMobile ({state}) {
    state.isMobile = window.innerWidth < 845
  }
}

const mutations = {
  set_tags (state, payload) {
    state.tags = payload
  },
  set_can_edit (state) {
    state.canEdit = true
  },
  set_data (state, payload) {
    state.data = payload
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