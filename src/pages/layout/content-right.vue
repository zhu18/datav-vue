<template>
  <!-- 右侧区域 -->
  <div class="content-right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="样式" name="style">
        <el-select v-model="viewSize" placeholder="请选择" @change="setViewSize">
            <el-option label="1920*1080" value="1920*1080" />
            <el-option label="800*600" value="800*600" />
        </el-select>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data">开发中...</el-tab-pane>
      <el-tab-pane label="交互" name="event">开发中...</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        activeName: 'style',
        viewSize: '1920*1080'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      ...mapMutations({
        setViewWidth:'SET_VIEWWIDTH',
        setViewHeight:'SET_VIEWHEIGHT'
      }),
      setViewSize(size) {
        size = size.split('*')
        this.setViewWidth(size[0])
        this.setViewHeight(size[1])
        console.log(size)
      }
    }
  };
</script>
<style>
  .content-right{
    height: 100%;
    position: relative;
    background:#fff;
    transition: all .3s;
    width:0;
    transform: translateX(300px);
  }
</style>
