
<script>
  import Part from './../Part.vue'
  export default{
    extends: Part,
    data() {
      return {
        type: 'part.chart',

      }
    },
    created() {
      this.$nextTick(() => {
        console.log('---chart-next--created');
      })
      console.log('---chart--created');
    },
    methods:{
      partRender(h) {

      }
    },
    mounted() {
      this.$nextTick(() => {
        console.log('---chart-next--mounted');

      })
      console.log('---chart--mounted');
    }
  }
</script>

<style>
  .part.chart.line{
    width:400px;
    height:300px;
  }
</style>

