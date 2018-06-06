<template>

    <div class="page2-wrap">
      <h2>element ui样式重置 可以写入assets/css/_diy-elementui.scss下</h2>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>

</template>

<script type="text/javascript">

  export default {
     name: 'page2',
     data() {
      return {
        dialogVisible: false
      };
    },
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

</style>
