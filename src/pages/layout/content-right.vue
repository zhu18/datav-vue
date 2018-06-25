<template>
  <!-- 右侧区域 -->
  <div class="content-right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="样式" name="style" class="panel">
      </el-tab-pane>
      <el-tab-pane label="数据" name="data">开发中...</el-tab-pane>
      <el-tab-pane label="交互" name="event">开发中...</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import PartServer from '@/components/part/PartServer.js'


  export default {
    data() {
      return {
        activeName: 'style',
      }
    },
    computed: {

    },
    watch: {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
//      ...mapMutations({
//        setViewWidth: 'SET_VIEWWIDTH',
//        setViewHeight: 'SET_VIEWHEIGHT'
//      }),
//      setViewSize(size) {
//        size = size.split('*')
//        this.setViewWidth(size[0])
//        this.setViewHeight(size[1])
//        console.log(size)
//      },

    },
    mounted(){
//      this.viewSize = E_viewSize['1200*800']
//      this.createViewSetting()
    }
  };
</script>
<style>
  .content-right {
    height: 100%;
    position: relative;
    background: #fff;
    transition: all .3s;
    width: 0;
    transform: translateX(300px);
  }

  .txt-xs, .txt-md {

  }

  .txt-xs {
    width: 60px;
  }

  .txt-md {
    width: 180px;
  }

  .panel {
    padding: 0 2px;

  }

  .panel h3 {
    color: #666;

    border-bottom: 1px solid #eee;
  }

  .el-form-item {
    margin-bottom: 5px;
  }

  .el-input__inner {
    height: 25px;
    line-height: 25px;
    border-radius: 4px;
    padding: 0 10px;
  }
</style>
