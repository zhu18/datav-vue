import Part from '@/components/part/Part.vue'
import PartChart from '@/components/part/chart/Chart.vue'
import PartChartLine from '@/components/part/chart/Line.vue'
import PartChartPie from '@/components/part/chart/Pie.vue'
import PartChartBar from '@/components/part/chart/Bar.vue'
import store from '@/store'
import * as mutationTypes from '@/store/mutation-types'

class PartServer {
  static create (part) {
    let _opt = {
      id: '',
      name: '未知组件',
      type: '',
      selected: false,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
    }
    part = Object.assign(_opt, part)
    return part
  }

  static get partComponents () {
    return {
      Part,
      PartChart,
      PartChartLine,
      PartChartPie,
      PartChartBar,
    }
  }

  static newPartId () {
    return 'part_' + (store.state.parts.length + 1)
  }

  // 添加组件
  static addPart (part) {
    store.commit(mutationTypes.ADD_PART, part)
    console.log('===添加组件:' + part.id)
  }

  // 更新组件 part:{id,updatefiled}
  static updatePart (part) {
    store.commit(mutationTypes.UPDATE_PART, part)
    console.log('===更新组件:' + part.id)
  }

  // 删除组件 part:{id}
  static deletePart (part) {
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
    let clonePart = {
      ...part,
      id: PartServer.newPartId(),
      top: part.top + 10,
      left: part.left + 10,
      selected: false,
    }
    PartServer.addPart(clonePart)
    console.log('===复制组件:' + part.id)
  }
}

export default PartServer
