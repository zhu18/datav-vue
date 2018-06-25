<template>
  <Chart :p-id="this.pId" :p-type="this.pType" @resize="onResize">
    <div :id="id+'_content'" class="part-content" ></div>
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
        type: 'PartChartBar',
        width:400,
        height:280,
        name: '柱状图',
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
    },
    methods: {
      onResize() {
        this.chart.resize()
        console.log('--pie--resized');
      }
    },
    created() {
      console.log('---bar--created');
    },
    mounted() {
      this.$nextTick(() => {
        this.chart = ChartServer.init({id: 1409, container: this.id + '_content'})

      })
      console.log('---bar--mounted');
    },
    components: {
      Chart
    }
  }
</script>

