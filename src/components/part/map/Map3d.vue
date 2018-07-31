<template>
  <PartMap :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize"
           @selected="onSelected">
    <div :id="contentId" class="part-content">
    </div>
  </PartMap>
</template>

<script>
  import PartMap from './Map.vue'
  import Runtime from './Map3d.run.js'
  import PartServer from '@/components/part/PartServer.js'
  let china = require('@/../static/mapdata/china.json')

  let E_area = {
    '世界': 'world.json',
    '中国': 'china.json',
  }
  china.features.map((c) => {
    E_area[c.properties.name] = '/geometryProvince/' + c.properties.id + '.json'
  })
console.log(E_area)
  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartMapMap3d',
        name: '3D地图',
        area: E_area['中国'],
        cameraX:0,
        cameraY:0,
        cameraZ:40,
        color: 0x3366ff,     //地图颜色
        hoverColor: 0xff9933,//鼠标移入颜色
        lineColor: 0xffffff, //线颜色
        opacity: 1,          //地图透明度
        hasPhong: true,      //是否反光材质
        shininess: 50,      //反光材质光滑度
        hasHoverHeight: true,  //鼠标移入区域升高
        //高级参数
        hasLoadEffect: false, //是否有加载动画
        hasControls: false,   //用户是否能控制视角
        autoRotate: false,   //是否自动旋转视角
        debugger: false,     //调试模式
        //浮动信息框
        msgBackground: 'rgba(0,0,0,.3)',//信息框背景颜色
        msgColor: 'rgba(255,255,255,.8)',//信息框字体颜色
        msgBorderColor: 'rgba(180,180,180,.8)'//信息框边框颜色

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
        // 触发window.resize  激活map.resize方法
        var e = document.createEvent("Event");
        e.initEvent("resize", true, true);
        window.dispatchEvent(e);
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
//
//        hasStats:true,      //是否显示性能面板
//          hasControls:true,   //用户是否能控制视角
//          autoRotate:false,   //是否自动旋转视角
//          ambientColor:0x333333,//环境光颜色
//          directionalColor:0xffffff,//平行光颜色
//          hasLoadEffect:false,//是否有加载效果
//        debugger:false,     //调试模式
//          cameraPosition:{x:0,y:0,z:40},//相机位置
//        extrude:extrudeOption,//立体厚度参数
//          color:0x3366ff,     //地图颜色
//          hoverColor:0xff9933,//鼠标移入颜色
//          lineColor:0xffffff, //线颜色
//          opacity:1,          //地图透明度
//          hasPhong:true,      //是否反光材质
//          shininess:50,      //反光材质光滑度//
//          hasHoverHeight:true,  //鼠标移入区域升高

        part = {...part}
        let g_map = p_style.addFolder('3D地图')
        //限时执行
        let timeAction = PartServer.timeAction(500)

        g_map.add(part, 'area', E_area).name('显示区域').onChange((v) => {
          PartServer.updatePart({id: this.id, area: v})
        })
        g_map.add(part, 'cameraX',-100,100).name('相机X').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, cameraX: v})
          })
        })
        g_map.add(part, 'cameraY',-100,100).name('相机Y').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, cameraY: v})
          })
        })
        g_map.add(part, 'cameraZ',0,300).name('相机Z').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, cameraZ: v})
          })
        })
        g_map.addColor(part, 'color').name('地图颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, color: v})
          })
        })
        g_map.addColor(part, 'hoverColor').name('地图高亮颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, hoverColor: v})
          })
        })
        g_map.addColor(part, 'lineColor').name('线颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, lineColor: v})
          })
        })
        g_map.add(part, 'opacity', 0, 1).name('地图透明度').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, opacity: v})
          })
        })
        g_map.add(part, 'hasPhong').name('是否反光材质').onChange((v) => {
          PartServer.updatePart({id: this.id, hasPhong: v})
        })
        g_map.add(part, 'shininess', 0, 2000).name('反光材质光滑度').onChange((v) => {
          PartServer.updatePart({id: this.id, shininess: v})
        })
        g_map.add(part, 'hasHoverHeight').name('鼠标移入区域升高').onChange((v) => {
          PartServer.updatePart({id: this.id, hasHoverHeight: v})
        })
        g_map.open()

        //信息框设置
        let g_mapMsg = p_style.addFolder('提示框')
        g_mapMsg.addColor(part, 'msgBackground').name('信息框背景颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, msgBackground: v})
          })
        })
        g_mapMsg.addColor(part, 'msgColor').name('信息框字体颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, msgColor: v})
          })
        })
        g_mapMsg.addColor(part, 'msgBorderColor').name('信息框边框颜色').onChange((v) => {
          timeAction(() => {
            PartServer.updatePart({id: this.id, msgBorderColor: v})
          })
        })
        g_mapMsg.open()

        //地图高级设置
        let g_mapAdvanced = p_style.addFolder('高级设置')

        g_mapAdvanced.add(part, 'hasLoadEffect').name('是否有加载效果').onChange((v) => {
          PartServer.updatePart({id: this.id, hasLoadEffect: v})
        })
        g_mapAdvanced.add(part, 'hasControls').name('用户是否能控制视角').onChange((v) => {
          PartServer.updatePart({id: this.id, hasControls: v})
        })
        g_mapAdvanced.add(part, 'autoRotate').name('是否自动旋转视角').onChange((v) => {
          PartServer.updatePart({id: this.id, autoRotate: v})
        })
        g_mapAdvanced.add(part, 'debugger').name('调试模式').onChange((v) => {
          PartServer.updatePart({id: this.id, debugger: v})
        })

      }
    },

    created() {
      console.log('---map3d--created');
    },
    mounted() {
      Runtime.run(this.$self, (map) => {

      })
      console.log('---map3d--mounted');
    },
    components: {
      PartMap
    }
  }
</script>

<style>

</style>

