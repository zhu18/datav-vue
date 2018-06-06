<template>
  <!-- 左侧区域 -->
  <div class="content-left">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item  name="chart">
        <template slot="title">
          <i class='iconfont icon-areachart'></i>图表
        </template>
        <div class="el-collapse-plan clearfix">
          <ul class="part-list">
            <li @click="createPart('line')" p-type="line"><div class="part-img"><i class="iconfont icon-linechart"></i></div><h3>折线图</h3></li>
            <li @click="createPart('pie')" p-type="pie"><div class="part-img"><i class="iconfont icon-piechart"></i></div><h3>饼图</h3></li>
            <li @click="createPart('pie')" p-type="pie"><div class="part-img"><i class="iconfont icon-barchart"></i></div><h3>柱状图</h3></li>
          </ul>
        </div>
      </el-collapse-item>
      <el-collapse-item  name="map">
        <template slot="title">
          <i class='iconfont icon-zhongguoditu'></i>地图
        </template>
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="img">
        <template slot="title">
          <i class='iconfont icon-image'></i>图片
        </template>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="text">
        <template slot="title">
          <i class='iconfont icon-format-text'></i>文字
        </template>
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import '@/../static/iconfont/iconfont.css'
  export default {
    data() {
      return {
        activeNames: ['chart']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      createPart(t,event){
        console.log(t)
        console.log(event)
      }
    }
  }
</script>
<style>
  .content-left{
    height: 100%;
    position: relative;
    background:#fff;
    transition: all .3s;
    width:0;
    transform: translateX(-200px);
    z-index: 10;
  }
  .part-list{

  }
  .part-list li{
    float: left;
    border-radius: 5px;
    border: 1px solid #aaa;
    background: #fff;
    width: 60px;
    text-align: center;
    margin: 5px 10px;
    padding: 3px;
    cursor: pointer;
    transition: all .3s;
    box-shadow: 0 0 5px rgba(0,0,0,.1);
  }
  .part-list li:hover{
    color: #409eff;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
  }
  .part-list li .part-img{
    width: auto;
    height: 40px;
    line-height: 40px;
  }
  .part-list li .part-img .iconfont{
    font-size: 30px;
  }
  .part-list li h3{
    font-weight: normal;
    font-size: 12px;
    color: #666;
  }

  .el-collapse-item__content{
    background: #eee;
  }
  .el-collapse-plan{
    padding: 10px;
  }
  .el-collapse-item__header{
    padding-left: 10px;
  }
  .el-collapse-item__header .iconfont{
    margin-right: 10px;
  }
</style>
