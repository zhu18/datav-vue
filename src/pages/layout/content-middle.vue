<template>
  <!-- 中心区域 -->
  <div class="content-middle">
    <div id="view-wrap" class="view-wrap">
      <GridLine></GridLine>
      <ContentView></ContentView>
    </div>

    <div class="btn-exp btn-exp-left"></div>
    <div class="btn-exp btn-exp-right"></div>
  </div>
</template>
<script>
  import GridLine from './content-middle-grid.vue'
  import ContentView from './content-middle-view.vue'
  export default {
    name: 'content-middle',
    data(){
      return {

      }
    },
    methods:{
    },
    components:{
      GridLine,
      ContentView
    }
  }
</script>
<style>
  .content-middle{
    flex:1;
    background:#eee;
    height: 100%;
    transition: all .3s;
    position: relative;
    overflow: hidden;
  }
  /* 左右区域缩放 */
  .btn-exp{
    position: absolute;
    top:0;
    width:20px;
    height:20px;
    background:#35a;
  }
  .btn-exp.btn-exp-left{
    left:0;
  }
  .btn-exp.btn-exp-right{
    right:0;
  }
  /* 视图区 */
  .view-wrap{
    width:100%;
    height: 100%;
    transition: all .3s;
    transform-origin: top left;
  }
</style>
