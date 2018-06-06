<template>
  <div id="app" ref="app" class="theme-red">
    <HeaderWrap></HeaderWrap>
    <router-view/>
  </div>
</template>

<script>
import HeaderWrap from 'components/header.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  //导入getters取得state放入计算属性中
  computed: {
    ...mapGetters(['themeCls'])
  },
  mounted(){
    this.setTheme()
  },
  watch:{
    themeCls(newVal){
      newVal ? this.setTheme():null
    }
  },
  methods:{
    setTheme(){
      const target = this.$refs.app
      const localStorageCls = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'red'
      target.className = this.themeCls ? 'theme-' + this.themeCls
                                  : `theme-${localStorageCls}`
    }
  },
  components:{
    HeaderWrap
  }
}
</script>

<style>
  #app{
    height: 100vh;
  }
</style>
