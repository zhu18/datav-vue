<script>
  import Chart from './Chart.vue'
  import Vue from 'vue'

  export default{
    extends: Chart,
    data() {
      return {
        type: 'part.chart.line',
      }
    },
    methods: {
      partRender(h) {
        return h('div', {
          attrs: {id: this.id + '_content111'}
        }, 'zhu18')
      }
    },
    created() {
      this.$nextTick(() => {
        console.log('---line-next--created');
      })
      console.log('---line--created');
    },
    mounted() {
      this.$nextTick(() => {
        console.log('---line-next--mounted');

      })
      console.log('---line--mounted');
    }
  }
</script>

<style>
  .part.chart.line {
    width: 400px;
    height: 300px;
  }
</style>

