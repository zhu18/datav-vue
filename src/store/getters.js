const themeCls = state => state.themeCls
const viewWidth = state => state.viewWidth
const viewHeight = state => state.viewHeight
const viewZoom = state => state.viewZoom
// 得到选中组件
const selectedPart = state => {
  return state.parts.find(part => part.selected)
}

export { themeCls, viewWidth, viewHeight, viewZoom, selectedPart }
