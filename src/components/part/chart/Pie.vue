<script>
  import Chart from './Chart.vue'
  import ChartServer from '9cf-chart'
  export default{
    extends: Chart,
    data() {
      return {
        type: 'part.chart.pie',
      }
    },
    created() {
      this.$nextTick(() => {
        console.log('---pie-next--created');
      })
      console.log('---pie--created');
    },
    mounted() {
      this.$nextTick(() => {
        console.log('---pie-next--mounted');
        ChartServer.init({id:112, container: this.id})

      })
      console.log('---pie--mounted');
    }
  }
</script>

