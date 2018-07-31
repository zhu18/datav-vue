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
        type: 'PartImg',
        name: '图片',
      }
    },
    computed: {
      id() {
        return this.pId
      }
    },
    methods: {
      onResize() {
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
      console.log('---img--created')
    },
    mounted() {
      console.log('---img--mounted')
    },
    components: {
      Part
    }
  }
</script>

<style>
  .part.img {

  }
</style>

