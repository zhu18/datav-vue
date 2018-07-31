<template>
  <PartImg :p-id="this.pId" ref="parent" :p-type="this.pType" @stateChange="onStateChange" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content" >
    </div>
  </PartImg>
</template>

<script>
  import PartImg from './Img.vue'
  import Runtime from './Image.run.js'
  import PartServer from '@/components/part/PartServer.js'


  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartImgImage',
        name: '自定义图片',
        src:'/static/img/img1.png',
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
        g_img.add(obj, 'src').name('路径').onChange((v) => {
          PartServer.updatePart({id: this.id, src: v})
        })

        g_img.open()

      }
    },

    created() {
      console.log('---image--created');
    },
    mounted() {
      Runtime.run(this.$self, (map)=>{

      })
      console.log('---image--mounted');
    },
    components: {
      PartImg
    }
  }
</script>

<style>

</style>

