<template>
  <!-- 左侧区域 -->
  <div class="content-left">
    <el-collapse v-model="activeNames" @change="handleChange">
      <!-- 图表 -->
      <el-collapse-item name="chart">
        <template slot="title">
          <i class='iconfont icon-areachart'></i>图表
        </template>
        <div class="el-collapse-plan clearfix">
          <ul class="part-list">
            <li @click="createPart(item.type)" v-for="item in menus.chart" >
              <div class="part-img"><i :class="item.icon"></i></div>
              <h3>{{item.name}}</h3>
            </li>
          </ul>
        </div>
      </el-collapse-item>

      <!-- 地图 -->
      <el-collapse-item name="map">
        <template slot="title">
          <i class='iconfont icon-zhongguoditu'></i>地图
        </template>
        <div class="el-collapse-plan clearfix">
          <ul class="part-list">
            <li @click="createPart(item.type)" v-for="item in menus.map" >
              <div class="part-img"><i :class="item.icon"></i></div>
              <h3>{{item.name}}</h3>
            </li>
          </ul>
        </div>
      </el-collapse-item>

      <!-- 图片 -->
      <el-collapse-item name="img">
        <template slot="title">
          <i class='iconfont icon-image'></i>图片
        </template>
        <div class="el-collapse-plan clearfix">
          <ul class="part-list">
            <li @click="createPart(item.type)" v-for="item in menus.img" >
              <div class="part-img"><i :class="item.icon"></i></div>
              <h3>{{item.name}}</h3>
            </li>
          </ul>
        </div>
      </el-collapse-item>

      <!-- 文字 -->
      <el-collapse-item  name="text">
        <template slot="title">
          <i class='iconfont icon-format-text'></i>文字
        </template>
        <div class="el-collapse-plan clearfix">
          <ul class="part-list">
            <li @click="createPart(item.type)" v-for="item in menus.text" >
              <div class="part-img"><i :class="item.icon"></i></div>
              <h3>{{item.name}}</h3>
            </li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import '@/../static/iconfont/iconfont.css'
  import PartServer from '@/components/part/PartServer.js'

  export default {
    data() {
      return {
        activeNames: ['chart']
      }
    },
    computed: {
      menus(){
        return PartServer.partMenus
      }
    },
    methods: {
      ...mapMutations({
        addPart: 'ADD_PART'
      }),
      handleChange(val) {
        console.log(val)
      },
      createPart(t) {
        let opt = {id: PartServer.newPartId(), type: t}
        let part = PartServer.create(opt)
        PartServer.addPart(part)
      }
    }
  }
</script>
<style>
  .content-left {
    height: 100%;
    position: relative;
    background: #fff;
    transition: all .3s;
    width: 0;
    transform: translateX(-200px);
    z-index: 10;
    box-shadow: 0 0 10px rgba(0,0,0,.1);
  }

  .part-list {

  }

  .part-list li {
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
    box-shadow: 0 0 5px rgba(0, 0, 0, .1);
  }

  .part-list li:hover {
    color: #409eff;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  }

  .part-list li .part-img {
    width: auto;
    height: 40px;
    line-height: 40px;
  }

  .part-list li .part-img .iconfont {
    font-size: 30px;
  }

  .part-list li h3 {
    font-weight: normal;
    font-size: 12px;
    color: #666;
  }

  .el-collapse-item__content {
    background: #eee;
  }

  .el-collapse-plan {
    padding: 10px;
  }

  .el-collapse-item__header {
    padding-left: 10px;
  }

  .el-collapse-item__header .iconfont {
    margin-right: 10px;
  }
</style>
