<script>
  import Chart from './Chart.vue'
  export default{
    extends: Chart,
    data() {
      return {
        type: 'part.chart.bar',
      }
    },
    created() {
      this.$nextTick(() => {
        console.log('---bar-next--created')
      })
      console.log('---bar--created');
    },
    mounted() {
      this.$nextTick(() => {
        console.log('---bar-next--mounted')
      })
      console.log('---bar--mounted');
    }
  }
</script>

