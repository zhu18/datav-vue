<template>
  <Chart :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content"></div>
  </Chart>
</template>
<script>
  import Chart from './Chart.vue'
  import Runtime from './Bar.run.js'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartChartBar',
        width:400,
        height:280,
        name: '柱状图',
        chartId:'1409'
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-barchart',
      }
    },
    computed: {
      id() {
        return this.pId;
      },
      contentId(){
        return PartServer.partContentId(this.id)
      },
      $self() {
        return PartServer.getPartById(this.id)
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

        part={...part}
        p_data.add(part, 'chartId').name('图表ID').onFinishChange((v)=>{
          PartServer.updatePart({id: this.id, chartId: v})
        })
      }
    },
    created() {
      console.log('---bar--created');
    },
    mounted() {
      this.chart=Runtime.run(this.$self)
      console.log('---bar--mounted');
    },
    components: {
      Chart
    }
  }
</script>

