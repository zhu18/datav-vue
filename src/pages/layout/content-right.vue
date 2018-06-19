<template>
  <!-- 右侧区域 -->
  <div class="content-right">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="样式" name="style" class="panel">

        <el-form :inline="true" v-if="part">
          <el-form-item label="标识:">
            <el-input v-model="part.id" class="txt-md" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称:">
            <el-input v-model="part.name" class="txt-md"></el-input>
          </el-form-item>
          <h3>位置</h3>
          <el-form-item label="左侧:">
            <el-input :value="part.left" @change="updatePartLeft" class="txt-xs"></el-input>
          </el-form-item>
          <el-form-item label="顶部:">
            <el-input :value="part.top"  @change="updatePartTop" class="txt-xs"></el-input>
          </el-form-item>
          <h3>大小</h3>
          <el-form-item label="宽度:">
            <el-input :value="part.width"  @change="updatePartWidth" class="txt-xs"></el-input>
          </el-form-item>
          <el-form-item label="高度:">
            <el-input :value="part.height"  @change="updatePartHeight" class="txt-xs"></el-input>
          </el-form-item>
        </el-form>

        <template v-if="!part">
          <el-form :inline="true">
            <el-form-item label="画布:">
              <el-select v-model="viewSize" placeholder="请选择" class="txt-md" @change="setViewSize">
                <el-option label="1920*1080" value="1920*1080"/>
                <el-option label="800*600" value="800*600"/>
              </el-select>
            </el-form-item>
            <el-form-item label="背景:">
              <el-input v-model="viewBackground" class="txt-md"></el-input>
            </el-form-item>
          </el-form>
        </template>
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
        viewSize: '1920*1080',
        viewBackground: '',

      }
    },
    computed: {
      part() {
        return PartServer.getSelectedPart()
      }
    },
    watch: {
      viewBackground(cur, old) {
        document.getElementById('view').style.backgroundImage = 'url(' + cur + ')'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
      ...mapMutations({
        setViewWidth: 'SET_VIEWWIDTH',
        setViewHeight: 'SET_VIEWHEIGHT'
      }),
      setViewSize(size) {
        size = size.split('*')
        this.setViewWidth(size[0])
        this.setViewHeight(size[1])
        console.log(size)
      },
      updatePartLeft(v) {
        console.log('====update----:'+v)
        PartServer.updatePart({id:this.part.id,left:v})
      },
      updatePartTop(v) {
        PartServer.updatePart({id:this.part.id, top:v})
      },
      updatePartWidth(v) {
        PartServer.updatePart({id:this.part.id,width:v})
      },
      updatePartHeight(v) {
        PartServer.updatePart({id:this.part.id,height:v})
      }
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
    padding: 10px 20px;

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
