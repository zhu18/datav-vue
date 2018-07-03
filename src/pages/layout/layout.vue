<template>
  <div :class="{content:true,'exp-left':expLeft,'exp-right':expRight,'view-mode':viewMode}">
    <content-left></content-left>
    <content-middle @panelExp="onPanelExp" ref="middle"></content-middle>
    <content-right></content-right>
  </div>
</template>

<script>
  import ContentLeft from './content-left.vue'
  import ContentMiddle from './content-middle.vue'
  import ContentRight from './content-right.vue'

  export default {
    name: 'layout',
    data() {
      return {
        clientWidth: document.body.clientWidth,
        expLeft: true,
        expRight: true,
        viewMode: false,
      }
    },
    watch: {
      clientWidth(val){
        val ? this.resize() : null;
      },
      $route(to, from) {
        this.setMode(to.name)
      }
    },
    mounted(){
      this.setMode(this.$route.name)
    },
    methods: {
      resize(){
        console.log('resez:' + this.clientWidth);
      },
      onPanelExp(e){
        this.expLeft = e.expLeft
        this.expRight = e.expRight
        setTimeout(() => {this.$refs.middle.$refs.view.initViewSize()}, 400)
      },
      setMode(mode){
        if(mode==='view'){
          this.$refs.middle.setExpLeft(false)
          this.$refs.middle.setExpRight(false)
          this.$refs.middle.setExpBottom(false)
          this.$refs.middle.$refs.view.showGrid=false
          this.viewMode=true
        }
        else if(mode==='layout'){
          this.$refs.middle.setExpLeft(true)
          this.$refs.middle.setExpRight(true)
          this.$refs.middle.setExpBottom(true)
          this.$refs.middle.$refs.view.showGrid=true
          this.viewMode=false
        }
      }
    },
    components: {
      ContentLeft,
      ContentMiddle,
      ContentRight
    }
  }
</script>

<style>
  .content {
    flex: 1;
    background: #eee;
    height: calc(100% - 41px);
    display: flex;
  }

  .content.exp-left .content-left {
    width: 200px;
    transform: translateX(0);
  }

  .content.exp-right .content-right {
    width: 250px;
    transform: translateX(0);
  }

  .ui-resizable-helper {
    background: rgba(220, 240, 255, .6);
    transform-origin: top left;
  }

  .tab-prop {
    margin-top: 0;
    margin-bottom: 0;
  }

  .tab-prop-content {
    background: #fff;
  }

</style>
