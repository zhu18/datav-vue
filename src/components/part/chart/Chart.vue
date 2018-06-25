<template>
  <Part :p-id="this.pId" ref="parent" :p-type="this.pType" @resize="onResize" @selected="onSelected">
    <slot></slot>
  </Part>
</template>
<script>
  import Part from './../Part.vue'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'part.chart',
        chart: 'chartdata',
      }
    },
    computed: {
      id() {
        return this.pId
      }
    },
    created() {
      console.log('---chart--created:' + this.pId + ',type:' + this.pType);
    },
    methods: {
      onResize() {
        console.log('--chart--resize--')
        this.$emit('resize')
      },
      onSelected(e) {
        this.$emit('selected', e)
      },
      settingPanel(part, setting) {
        this.$refs.parent.settingPanel(part, setting)
        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event

        p_style.add(part,'type')
      }

    },
    mounted() {
      console.log('---chart--mounted');
    },
    components: {
      Part
    }
  }
</script>

<style>
  .part.chart.line {
    width: 400px;
    height: 300px;
  }
</style>

