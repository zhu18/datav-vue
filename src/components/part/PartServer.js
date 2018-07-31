import store from '@/store'
import * as mutationTypes from '@/store/mutation-types'
import { $ } from '@/assets/js/common/extend.js'
import dat from '@/assets/js/dat.gui.js'

import Part from '@/components/part/Part.vue'
// 图表
import PartChart from '@/components/part/chart/Chart.vue'
import PartChartLine from '@/components/part/chart/Line.vue'
import PartChartPie from '@/components/part/chart/Pie.vue'
import PartChartBar from '@/components/part/chart/Bar.vue'
// 地图
import PartMap from '@/components/part/map/Map.vue'
import PartMapBmap from '@/components/part/map/Bmap.vue'
import PartMapMap3d from '@/components/part/map/Map3d.vue'
import PartMapEchartmap from '@/components/part/map/Echartmap.vue'
// 图片
import PartImg from '@/components/part/img/Img.vue'
import PartImgBorder from '@/components/part/img/Border.vue'
import PartImgImage from '@/components/part/img/Image.vue'
// 文字
import PartText from '@/components/part/text/Text.vue'
import PartTextTitle from '@/components/part/text/Title.vue'

class PartServer {
  static create (part) {
    let partOpt = PartServer.getPartFullOption(part.type)
    console.log(partOpt)

    let _opt = {
      id: '',
      name: '未知组件',
      type: '',
      selected: false,
      top: 0,
      left: 0,
      width: 400,
      height: 400,
      contentId: '',
      zIndex: 0
    }
    part = $.extend(true, _opt, part)
    part = $.extend(true, part, partOpt)
    part.contentId = PartServer.partContentId(part.id)
    console.log(part)
    return part
  }

  static get partMenus () {
    let menu = {
      chart: [],
      map: [],
      text: [],
      img: [],
    }
    let parts = PartServer.partComponents

    for (let name in parts) {
      let part = parts[name]
      if (part.menu) {
        let partData = part.option()
        let partMenu = part.menu()
        // PartChartPie => chart
        let menuType = PartServer.typeSplit(partData.type)[1].toLowerCase()
        let menuData = {
          icon: partMenu.icon,
          type: partData.type,
          name: partData.name
        }
        menu[menuType].push(menuData)
      }
    }
    return menu
  }

  static get partComponents () {
    return {
      Part,
      PartChart,
      PartChartLine,
      PartChartPie,
      PartChartBar,
      PartMap,
      PartMapBmap,
      PartMapMap3d,
      PartMapEchartmap,
      PartImg,
      PartImgBorder,
      PartImgImage,
      PartText,
      PartTextTitle
    }
  }

  static getPartOption (partType) {
    return PartServer.partComponents[partType].option()
  }

  //PartChartPie=>[Part,Chart,Pie]
  static typeSplit (type) {
    return type.match(/([A-Z][a-z0-9_-]*)/g)
  }

  // [Part,Chart,Pie] => [Part,PartChart,PartChartPie]
  static typeFull (types) {
    let fullTypes = []
    for (let i = 0; i < types.length; i++) {
      let t = ''
      for (let l = 0; l < i + 1; l++) {
        t += types[l]
      }
      fullTypes[i] = t
    }
    return fullTypes
  }

  // 得到组件所有配置包含基类
  static getPartFullOption (partType) {
    //PartChartPie=>[Part,Chart,Pie]
    let types = PartServer.typeSplit(partType)
    // [Part,Chart,Pie] => [Part,PartChart,PartChartPie]
    let fullTypes = PartServer.typeFull(types)
    let opt = {}
    for (let i = 0; i < fullTypes.length; i++) {
      opt = $.extend(true, opt, PartServer.getPartOption(fullTypes[i]))
    }
    return opt
  }

  static newPartId () {
    return 'part_' + (store.state.parts.length + 1)
  }

  static partContentId (id) {
    return id + '_content'
  }

  // '.part.chart.pie' => 'PartChartPie'
  static typeLowerToUpper (type) {
    return type.replace(/\.(.)/g, (s) => s.replace('.', '').toUpperCase())
  }

  // PartChartPie => .part.chart.pie
  static typeUpperToLower (type) {
    return pType.replace(/([A-Z])/g, (s) => '.' + s.toLowerCase())
  }

  // 添加组件
  static addPart (part) {
    store.commit(mutationTypes.ADD_PART, part)
    console.log('===添加组件:' + part.id)
  }

  // 更新组件 part:{id,updatefiled}
  static updatePart (part) {
    store.commit(mutationTypes.UPDATE_PART, part)
    //console.log('===更新组件:' + part.id)
  }

  // 删除组件 part:{id}
  static deletePart (part) {
    if (typeof part === 'string')
      part = {id: part}
    store.commit(mutationTypes.DEL_PART, part)
    console.log('===删除组件:' + part.id)
  }

  // 根据ID得到组件
  static getPartById (id) {
    return store.state.parts.find((part) => part.id == id)
  }

  // 得到当前选中组件
  static getSelectedPart () {
    return store.state.parts.find(part => part.selected)
  }

  // 复制组件
  static clonePart (part) {
    let partId = PartServer.newPartId()
    let clonePart = {
      ...part,
      id: partId,
      top: part.top + 10,
      left: part.left + 10,
      selected: false,
      contentId: PartServer.partContentId(partId)
    }
    PartServer.addPart(clonePart)
    console.log('===复制组件:' + part.id)
  }

  // 设置面板
  static createSetting () {
    return {
      style: PartServer.createGuiStyle(),
      data: PartServer.createGuiData(),
      event: PartServer.createGuiEvent(),
    }
  }

  // 样式TAB GUI面板
  static createGuiStyle () {
    return PartServer.createGui('pane-style', true)
  }

  // 数据TAB GUI面板
  static createGuiData () {
    return PartServer.createGui('pane-data', true)
  }

  // 交互TAB GUI面板
  static createGuiEvent () {
    return PartServer.createGui('pane-event', true)
  }

  static createGui (wrapid, isClear) {
    let gui = new dat.GUI({autoPlace: false})
    let wrap = document.getElementById(wrapid)
    if (isClear) wrap.innerHTML = ''
    wrap.appendChild(gui.domElement)
    return gui
  }

  //限时执行 某个方法
  static timeAction(time){
    let timer=null
    return function(cb){
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        cb && cb()
      }, time)
    }
  }
}

export default PartServer
