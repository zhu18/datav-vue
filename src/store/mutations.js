import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.SET_THEME](state, cls) {
    state.themeCls = cls
  },
  [types.SET_VIEWHEIGHT](state, height) {
    state.viewHeight = height
  },
  [types.SET_VIEWWIDTH](state, width) {
    state.viewWidth = width
  },
  [types.SET_VIEWBACKGROUNDCOLOR](state, color) {
    state.viewBackgroundColor = color
  },
  [types.SET_VIEWBACKGROUNDIMAGE](state, img) {
    state.viewBackgroundImage = img
  },
  [types.SET_VIEWZOOM](state, zoom) {
    state.viewZoom = zoom
  },
  [types.ADD_PART](state, part) {
    state.parts.push(part)
  },
  [types.DEL_PART](state, part) {
    state.parts.splice(state.parts.findIndex(p => p.id === part.id), 1)
  },
  [types.UPDATE_PART](state, part) {
    let index = state.parts.findIndex(p => { return p.id === part.id })
    Vue.set(state.parts, index, {...state.parts[index], ...part})
  },
  [types.SET_PARTS](state, parts) {
    state.parts = [...state.parts, ...parts]
  },
  ['SET_ALL'](state, val) {
    state = {...state,...val}
  },
}
