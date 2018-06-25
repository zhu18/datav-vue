<template>
  <Chart :p-id="this.pId" ref="parent" :p-type="this.pType" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content"></div>
  </Chart>
</template>

<script>
  import Chart from './Chart.vue'
  import ChartServer from '9cf-chart'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartChartPie',
        width:400,
        height:280,
        name: '饼图',
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
      contentId(){
        return PartServer.partContentId(this.id)
      }
    },
    methods: {
      onResize() {
        this.chart.resize();
        console.log('--pie--resized');
      },
      onSelected(e) {
        //选中创建属性面板
        this.settingPanel(e.part,e.setting)
      },
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
          }catch(e){}
        }
        g_base.open()

      }
    },
    created() {
      console.log('---pie--created');
    },
    mounted() {
      this.$nextTick(() => {
        console.log('---pie-next--mounted');
        this.chart = ChartServer.init({id:112, container: this.contentId})
        setTimeout(()=>{
          this.chartOption=this.chart.getOption()
          this.chart.setOption({backgroundColor:'rgba(255,255,255,.3)'})
        },2000)

        //this.chart.setOption()

      })
      console.log('---pie--mounted');
    },
    components: {
      Chart
    }
  }
</script>

