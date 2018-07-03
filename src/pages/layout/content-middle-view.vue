<template>
  <div id="view" :class="{selected:isSelected,view:true}" :style="{
  width:viewWidth +'px',
  height: viewHeight+'px',
  backgroundColor:viewBackgroundColor,
  backgroundImage:'url('+viewBackgroundImage+')'
}"
       @mousedown.prevent.self="onViewSelected">
    <div :p-id="part.id" :p-type="part.type" :is="part.type" :name="part.name" v-for="part in parts"></div>
  </div>
</template>
<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'
  import PartServer from '@/components/part/PartServer.js'

  const E_viewSize = {
    '1920*1080': '1920*1080',
    '1200*800': '1200*800',
    '800*600': '800*600'
  }

  export default {
    data() {
      return {
        viewSize: '',
        viewBackgroundColor: '#1a1a1a',
        viewBackgroundImage: 'http://pic.qiantucdn.com/58pic/18/13/50/38N58PICTcD_1024.jpg',
        showGrid: true,
      }
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
      viewSize(cur, old) {
        cur != old ? this.setViewSize(cur) : null
      },
      viewBackgroundColor(cur, old){
        this.setViewBackgroundColor(cur)
      },
      viewBackgroundImage(cur, old){
        this.setViewBackgroundImage(cur)
      },
      showGrid(cur, old) {
        document.getElementById('canvas').style.display = cur ? 'block' : 'none'
      },
      isSelected(cur, old) {
        if (cur) {
          this.createViewSetting()
        }
      },
    },
    methods: {
      ...mapMutations({
        setViewWidth: 'SET_VIEWWIDTH',
        setViewHeight: 'SET_VIEWHEIGHT',
        setViewBackgroundColor: 'SET_VIEWBACKGROUNDCOLOR',
        setViewBackgroundImage: 'SET_VIEWBACKGROUNDIMAGE'
      }),
      setViewSize(size) {
        size = size.split('*')
        this.setViewWidth(size[0])
        this.setViewHeight(size[1])
        console.log(size)
      },
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
      initBackground(){
        this.setViewBackgroundColor(this.viewBackgroundColor)
        this.setViewBackgroundImage(this.viewBackgroundImage)
      },
      onViewSelected() {
        let part = PartServer.getSelectedPart()
        if (part) {
          PartServer.updatePart({id: part.id, selected: false})
        }
      },
      createViewSetting(){
        let setting = PartServer.createSetting()
        let p_style = setting.style
        let p_data = setting.data
        let p_event = setting.event

        //style
        let g_base = p_style.addFolder('基础属性')
        g_base.add(this, 'viewSize', E_viewSize).name('画布尺寸')
        g_base.addColor(this, 'viewBackgroundColor').name('背景颜色')
        g_base.add(this, 'viewBackgroundImage').name('背景图片')
        g_base.add(this, 'showGrid').name('显示网格').listen()
        g_base.open()
      }
    },
    mounted() {
      this.viewSize = E_viewSize['1200*800'];
      this.initViewSize()
      this.initBackground()
      this.createViewSetting()

      window.onresize = () => {
        this.initViewSize()
      }
    },
    components: PartServer.partComponents
  }


</script>
<style>
  .view {
    overflow: hidden;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 20px;
    box-shadow: 0 0 20px #000;
    z-index: 0;
    background-color: #234;
    background-size: cover;
    background-position: center;
  }

  .view.selected {
    outline: 2px solid rgb(228, 60, 89);
  }

  .view-mode .view{
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
    box-shadow: 0 0 20px #000;
  }
  .view-mode .view.selected {
    outline:0
  }

</style>
