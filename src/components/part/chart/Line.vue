<template>
  <Chart :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content"></div>
  </Chart>
</template>
<script>
  import Chart from './Chart.vue'
  import Runtime from './Line.run.js'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartChartLine',
        name: '折线图',
        width: 300,
        height: 180,
        chartId: '1589'
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
      onStateChange(part) {
        console.log('--line--stateChange')
        try{this.chart.dispose()}catch (e){}
        this.chart =  Runtime.run(part)
      },
      settingPanel(part,setting) {
        this.$refs.parent.settingPanel(part,setting)

        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event

        p_data.add(part, 'chartId').name('图表ID').onChange(()=>{
          return false;
        }).onFinishChange((v)=>{
          PartServer.updatePart({id: this.id, chartId: v})
          try{this.chart.dispose()}catch (e){}
          this.chart =  Runtime.run(this.$self)
        })
      }
    },
    computed: {
      id() {
        return this.pId
      },
      contentId(){
        return PartServer.partContentId(this.id)
      },
      $self() {
        return PartServer.getPartById(this.id)
      }
    },
    created() {
      console.log('---line--created:' + this.pId + ',type:' + this.pType)
    },
    mounted() {
      this.chart=Runtime.run(this.$self)
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

