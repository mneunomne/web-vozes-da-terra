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
  },
  getTypes (state) {
    return state.types
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
  setTypes ({commit}) {
    let payload = []
    let data = state.data
    for (let i in data) {
      let hasFound = false
      for(let j in payload) {
        if (payload[j][0] === data[i].type) {
          payload[j][1]++
          hasFound = true
          break
        }
      }
      if (!hasFound) {
        payload.push([data[i].type, 0])
      }
    }
    commit('set_types', payload)
  },
  setCanEdit({commit}) {
    commit('set_can_edit')
  },
  setLocalData ({state, commit}) {
    let payload = state.data
    for (let i in payload) {
      payload[i].id = payload[i].id || utils.generateUID()
    }
    commit('set_data', payload)
  },
  updateJSON({state}, data) {
    var FileSaver = require('file-saver')
    console.log('FileSaver', FileSaver)
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
  fetchAudiosByType ({state}, type) {
    let response = []
    let data = state.data
    for (let i in data) {
      if (data[i].type === type) {
        response.push(data[i])
      }
    }
    return response
  },
  setIsMobile ({state}) {
    state.isMobile = window.innerWidth < 845
  },
  saveJson ({commit}) {
    commit('save_file')
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
  },
  set_types (state, payload) {
    state.types = payload
  },
  save_file (state) {
    var FileSaver = require('file-saver')
    var blob = new Blob(JSON.parse(state.data), {type: "application/json;charset=utf-8"})
    FileSaver.saveAs(blob, "data-test.json")
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