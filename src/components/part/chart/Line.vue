<template>
  <Chart :p-id="this.pId" ref="parent" :p-type="this.pType" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content"></div>
  </Chart>
</template>
<script>
  import Chart from './Chart.vue'
  import ChartServer from '9cf-chart'
  import PartServer from '@/components/part/PartServer.js'
  import dat from 'dat.gui'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartChartLine',
        name: '折线图',
        width: 300,
        height: 180,
        line:['a','b','c']
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-linechart',
      }
    },
    methods: {
      onResize() {
        this.chart.resize()
        console.log('--line--resized')
      },
      onSelected(e) {
        //选中创建属性面板
        this.settingPanel(e.part, e.setting)
      },
      settingPanel(part,setting) {
        this.$refs.parent.settingPanel(part,setting)

        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event

        p_style.add(part,'line',part.line)
        p_data.add(part,'type')
        p_event.add(part,'type')



      }
    },
    computed: {
      id() {
        return this.pId
      },
      contentId(){
        return PartServer.partContentId(this.id)
      }
    },
    created() {
      console.log('---line--created:' + this.pId + ',type:' + this.pType)
    },
    mounted() {
      this.chart = ChartServer.init({id: 369, container: this.contentId})
      console.log('---line--mounted')
    },
    components: {
      Chart
    }

  }
</script>

<style>
  .part.chart.line {
    width: 400px;
    height: 300px;
  }
</style>

