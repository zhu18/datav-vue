<template>
  <PartText :p-id="this.pId" ref="parent" :p-type="this.pType" @resize="onResize" @selected="onSelected">
    <div :id="contentId" class="part-content" :style="{
      verticalAlign:verticalAlign,
      textAlign:textAlign,
      fontSize:fontSize,
      color:fontColor,
      fontFamily:fontFamily
    }">{{text}}
    </div>
  </PartText>
</template>

<script>
  import PartText from './Text.vue'
  import PartServer from '@/components/part/PartServer.js'

  const E_fontFamily={
    '微软雅黑':'Microsoft Yahei',
    '新宋':'SimSun',
    '幼圆':'YouYuan',
    '黑体':'SimHei'
  }
  const E_textAlign={
    '局左':'left',
    '居中':'center',
    '居右':'right'
  }
  const E_verticalAlign={
    '局上':'top',
    '居中':'middle',
    '居下':'bottom'
  }
  export default{
    props: ['pId', 'pType'],
    option() {
      return {
        type: 'PartTextTitle',
        name: '标题文字',
        width: 500,
        height: 200,
        top: 0,
        left: 400,
        fontSize: 50,
        fontFamily: E_fontFamily['微软雅黑'],
        fontColor: '#ffffff',
        text: '请输入要显示的文字',
        textAlign: E_textAlign['居中'],
        verticalAlign: E_verticalAlign['居中'],
      }
    },
    // 设计时-左侧菜单组件呈现效果
    menu() {
      return {
        icon: 'iconfont icon-format-text',
      }
    },
    computed: {
      id() {
        return this.pId
      },
      contentId() {
        return PartServer.partContentId(this.id)
      },
      $self() {
        return PartServer.getPartById(this.id)
      },
      text(){
        return this.$self.text
      },
      fontColor(){
        return this.$self.fontColor
      },
      fontSize(){
        return parseInt(this.$self.fontSize) + 'px'
      },
      fontFamily(){
        return this.$self.fontFamily
      },
      textAlign(){
        return this.$self.textAlign
      },
      verticalAlign(){
        return this.$self.verticalAlign
      }
    },
    methods: {
      onResize() {

      },
      onSelected(e) {
        //选中创建属性面板
        this.settingPanel(e.part, e.setting)
      },
      settingPanel(part, setting) {
        this.$refs.parent.settingPanel(part, setting)

        this.setting = setting
        let p_style = this.setting.style
        let p_data = this.setting.data
        let p_event = this.setting.event

        let g_font = p_style.addFolder('文字')
        g_font.add(part, 'text').name('文字').onChange((v) => {
          PartServer.updatePart({id: this.id, text: v})
        })
        g_font.add(part, 'fontSize', 10, 100).name('大小').onChange((v) => {
          PartServer.updatePart({id: this.id, fontSize: v})
        })
        g_font.add(part, 'fontFamily', E_fontFamily).name('字体').onChange((v) => {
          PartServer.updatePart({id: this.id, fontFamily: v})
        })
        g_font.addColor(part, 'fontColor').name('颜色').onChange((v) => {
          PartServer.updatePart({id: this.id, fontColor: v})
        })
        g_font.add(part, 'textAlign',E_textAlign).name('水平对齐').onChange((v) => {
          PartServer.updatePart({id: this.id, textAlign: v})
        })
        g_font.add(part, 'verticalAlign',E_verticalAlign).name('垂直对齐').onChange((v) => {
          PartServer.updatePart({id: this.id, verticalAlign: v})
        })

        g_font.open()

      }
    },

    created() {
      console.log('---title--created');
    },
    mounted() {
      console.log('---title--mounted');
    },
    components: {
      PartText
    }
  }
</script>

<style>
  .part.text.title {
    display: table;
  }

  .part.text.title .part-content {
    display: table-cell;
  }
</style>

