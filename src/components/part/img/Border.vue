<template>
  <PartImg :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content" >
    </div>
  </PartImg>
</template>

<script>
  import PartImg from './Img.vue'
  import Runtime from './Border.run.js'
  import PartServer from '@/components/part/PartServer.js'

  const E_borderImgs={
    '边框1':'/static/img/border/border1.png',
    '边框2':'/static/img/border/border2.png',
    '边框3':'/static/img/border/border3.png',
    '边框4':'/static/img/border/border4.png',
    '边框5':'/static/img/border/border5.png',
    '边框6':'/static/img/border/border6.png',
    '边框7':'/static/img/border/border7.png',
    '边框8':'/static/img/border/border8.png',
    '边框9':'/static/img/border/border9.png',
  }
  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartImgBorder',
        name: '图片边框',
        src:E_borderImgs['边框1']
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-image ',
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

        let g_img = p_style.addFolder('图片')
        let obj={...part}
        g_img.add(obj, 'src', E_borderImgs).name('样式').onChange((v) => {
          PartServer.updatePart({id: this.id, src: v})
        })

        g_img.open()

      }
    },

    created() {
      console.log('---boder--created');
    },
    mounted() {
      Runtime.run(this.$self, (map)=>{

      })
      console.log('---boder--mounted');
    },
    components: {
      PartImg
    }
  }
</script>

<style>

</style>

