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
  [types.SET_VIEWZOOM](state, zoom) {
    state.viewZoom = zoom
  }
}
