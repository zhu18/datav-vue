<template>
  <div id="view" :class="{selected:isSelected}" :style="{width:viewWidth +'px',height: viewHeight+'px'}"
       @mousedown.prevent.self="onViewSelected">
    <div :p-id="part.id" :p-type="part.type" :is="part.type" :name="part.name" v-for="part in parts"></div>
  </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import PartServer from '@/components/part/PartServer.js'

  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState(['parts']),
      ...mapGetters(['viewWidth', 'viewHeight']),
      isSelected() {
        return !PartServer.getSelectedPart()
      }
    },
    watch: {
      viewWidth(val) {
        val ? this.initViewSize() : null
      },

    },
    methods: {
      initViewSize() {
        let viewSize = {width: this.viewWidth, height: this.viewHeight};
        let viewWrap = document.getElementById('view-wrap')
        let ch = viewWrap.offsetHeight
        let cw = viewWrap.offsetWidth

        let minRatio = Math.min(cw / viewSize.width, ch / viewSize.height)
        let zoomScale = Math.floor(minRatio * 10) / 10
        zoomScale = zoomScale < 1 ? zoomScale : 1
        this.$store.commit('SET_VIEWZOOM', zoomScale)

        viewWrap.style.transform = 'scale(' + zoomScale + ')'
      },
      onViewSelected() {
        let part = PartServer.getSelectedPart()
        if (part) {
          PartServer.updatePart({id: part.id, selected: false})
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initViewSize()
      })
      window.onresize = () => {
        this.initViewSize()
      }
    },
    components: PartServer.partComponents
  }


</script>
<style>
  #view {
    overflow: hidden;
    background: #234;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 20px;
    box-shadow: 0 0 20px #000;
    z-index: 0;
    background-size: cover;
  }

  #view.selected {
    outline: 2px solid rgb(228, 60, 89);
  }

  .ui-resizable {
    width: 400px;
    height: 240px;
    margin: 50px;
    position: relative;
  }

  .resizable-r {
    width: 10px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    cursor: e-resize;
  }

  .resizable-b {
    width: 100%;
    height: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    cursor: s-resize;
  }

  .resizable-rb {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: nw-resize;
  }

  /* 组件 */
  .part {
    width: 150px;
    height: 100px;
    position: absolute;
    outline: 1px solid rgba(43, 183, 255, .8)
  }

  .part-title {
    height: 20px;
    border-bottom: 1px solid #aaa;
    background: #eee;
  }

  .part.text {
    width: 400px;
    height: 100px;
    font-size: 40px;
    color: #fff;
    text-align: center;
  }

  .part:hover {
    background: rgba(43, 183, 255, .3);
    z-index: 1000;
  }

  .part.selected {
    background: rgba(228, 60, 89, .3);
    outline: 2px solid rgb(228, 60, 89);
    z-index: 999;
  }

  .part .opt {
    visibility: hidden;
    position: absolute;
    top: -20px;
    left: -2px;
  }

  .part .opt .clone, .part .opt .del {
    width: 20px;
    height: 20px;
    float: left;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
    text-align: center;
  }

  .part .opt .clone:hover, .part .opt .del:hover {
    opacity: .8;
  }

  .part:hover .opt {
    visibility: visible;
  }

  .part.selected:hover .opt {
    background: rgb(228, 60, 89);
  }

  .part:hover .opt {
    background: rgb(43, 183, 255);
  }


</style>
