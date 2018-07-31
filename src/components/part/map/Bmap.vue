<template>
  <PartMap :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content" >
    </div>
  </PartMap>
</template>

<script>
  import PartMap from './Map.vue'
  import Runtime from './Bmap.run.js'
  import PartServer from '@/components/part/PartServer.js'
  import citys from '@/../static/mapdata/city.json'


  let E_style={}
  if(!mapstyles) {
    console.error('地图样式未引入')
  }
  else{
    for(var key in mapstyles){
      var style = mapstyles[key]
      E_style[style.title]=key
    }
  }

  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartMapBmap',
        name: '百度地图',
//        lon:'116.416',
//        lat:'39.915',
        center:'北京',
        searchKey:'',
        zoom:11,
        style:'normal'
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
        console.log(this.map)
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
        //限时执行
        let timeAction = PartServer.timeAction(1000)
//        g_map.add(part, 'lon').name('经度').onChange((v) => {
//          PartServer.updatePart({id: this.id, lon: v})
//        })
//        g_map.add(part, 'lat').name('纬度').onChange((v) => {
//          PartServer.updatePart({id: this.id, lat: v})
//        })
        g_map.add(part, 'center').name('中心').onChange((v) => {
          timeAction(()=>{
            PartServer.updatePart({id: this.id, center: v})
          })
        })
        g_map.add(part, 'searchKey').name('查询关键字').onChange((v) => {
          timeAction(()=> {
            PartServer.updatePart({id: this.id, searchKey: v})
          })
        })
        g_map.add(part, 'zoom', 5, 18).name('缩放比例').onChange((v) => {
          timeAction(()=> {
            PartServer.updatePart({id: this.id, zoom: v})
          })
        })
        g_map.add(part, 'style', E_style).name('地图主题').onChange((v) => {
          PartServer.updatePart({id: this.id, style: v})
        })

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

