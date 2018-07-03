<template>
  <Chart :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content"></div>
  </Chart>
</template>

<script>
  import Chart from './Chart.vue'
  import Runtime from './Pie.run.js'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartChartPie',
        width:400,
        height:280,
        name: '饼图',
        chartId:'112'
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-piechart',
      }
    },
    computed: {
      id() {
        return this.pId
      },
      contentId() {
        return this.$self.contentId
      },
      $self() {
        return PartServer.getPartById(this.id)
      }
    },
    methods: {
      onResize() {
        console.log('--pie--resized');
        this.chart.resize();
      },
      onSelected(e) {
        //选中创建属性面板
        this.settingPanel(e.part,e.setting)
      },
      onStateChange(part) {
        console.log('--pie--stateChange')
        try{this.chart.dispose()}catch (e){}
        this.chart =  Runtime.run(part)
      },
      // 设计时-右侧菜单配置
      settingPanel(part, setting) {
        this.$refs.parent.settingPanel(part, setting)
        let p_style = setting.style
        let p_data = setting.data
        let p_event = setting.event

        //style
        let g_base = p_style.addFolder('图表样式')
        for(let key in this.chartOption) {
          try{
          g_base.add(this.chartOption, key)
          }catch(e) {}
        }
        g_base.open()

        p_data.add(part, 'chartId').name('图表ID').onChange(()=>{
          return false;
        }).onFinishChange((v)=>{
          PartServer.updatePart({id: this.id, chartId: v})
        })

      }
    },
    created() {
      console.log('---pie--created');
    },
    mounted() {
        // 运行时-显示图表
        this.chart = Runtime.run(this.$self)
      console.log('---pie--mounted');
    },
    components: {
      Chart
    }
  }
</script>

