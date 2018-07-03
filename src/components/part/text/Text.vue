<template>
  <Part :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <slot></slot>
  </Part>
</template>
<script>
  import Part from './../Part.vue'

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartText',
        name: '文字',
      }
    },
    computed: {
      id() {
        return this.pId
      }
    },
    methods: {
      onResize() {
        console.log('--chart--resize--')
        this.$emit('resize')
      },
      onSelected(e) {
        this.$emit('selected', e)
      },
      onStateChange(e){
        this.$emit('stateChange', e)
      },
      settingPanel(part, setting) {
        this.$refs.parent.settingPanel(part, setting)
        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event
      }
    },
    created() {
      console.log('---text--created')
    },
    mounted() {
      console.log('---text--mounted')
    },
    components: {
      Part
    }
  }
</script>

<style>
  .part.text {

  }
</style>

