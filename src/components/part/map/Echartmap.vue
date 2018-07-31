<template>
  <PartMap :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content" >
    </div>
  </PartMap>
</template>

<script>
  import PartMap from './Map.vue'
  import Runtime from './EchartMap.run.js'
  import PartServer from '@/components/part/PartServer.js'



  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartMapEchartmap',
        name: 'Echart地图',
        chartId:'1554'
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-zhongguoditu',
      }
    },
    computed: {
      id() {
        return this.pId
      },
      contentId() {
        return this.$self.contentId
      },
      $self() {
        return PartServer.getPartById(this.id)
      }
    },
    methods: {
      onResize() {
        this.map.resize()
      },
      onSelected(e) {
        //选中创建属性面板
        this.settingPanel(e.part, e.setting)
      },
      onStateChange(e){
        Runtime.run(e)
      },
      settingPanel(part, setting) {
        this.$refs.parent.settingPanel(part, setting)

        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event

        let g_map = p_style.addFolder('地图')

//        g_map.add(part, 'lon').name('经度').onChange((v) => {
//          PartServer.updatePart({id: this.id, lon: v})
//        })
//        g_map.add(part, 'lat').name('纬度').onChange((v) => {
//          PartServer.updatePart({id: this.id, lon: lat})
//        })
//        g_map.add(part, 'zoom', 5, 18).name('缩放比例').onChange((v) => {
//          PartServer.updatePart({id: this.id, zoom: v})
//        })
//        g_font.add(part, 'fontFamily', E_fontFamily).name('字体').onChange((v) => {
//          PartServer.updatePart({id: this.id, fontFamily: v})
//        })
//        g_font.addColor(part, 'fontColor').name('颜色').onChange((v) => {
//          PartServer.updatePart({id: this.id, fontColor: v})
//        })
//        g_font.add(part, 'textAlign', E_textAlign).name('水平对齐').onChange((v) => {
//          PartServer.updatePart({id: this.id, textAlign: v})
//        })
//        g_font.add(part, 'verticalAlign', E_verticalAlign).name('垂直对齐').onChange((v) => {
//          PartServer.updatePart({id: this.id, verticalAlign: v})
//        })

        g_map.open()

      }
    },

    created() {
      console.log('---bmap--created')
    },
    mounted() {
      this.map = Runtime.run(this.$self)
      console.log('---bmap--mounted')
    },
    components: {
      PartMap
    }
  }
</script>

<style>
.anchorBL{
  display: none;
}
</style>

