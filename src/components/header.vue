<template>
    <div class="header-wrap">
      <h1><img class="logo" src="@/assets/img/logo.png"/>可视化工具</h1>
      <ul>
        <!-- tag="li" 可以设定 router-link生成什么样的页面元素 -->
        <router-link class="item" tag="li" :to="{name:'layout'}">
          编辑
        </router-link>
        <router-link class="item" tag="li" :to="{name:'view'}">
          预览
        </router-link>
        <li class="item" @click="runtimeView"> 编译&运行时</li>
      </ul>
    </div>
</template>

<script type="text/javascript">

  export default {
    methods:{
      runtimeView(){
        localStorage['datav-last-page']=JSON.stringify(this.$store.state)
        window.open('./static/view.html')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .header-wrap{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: $color-background;
    h1{
      float: left;
      line-height: 40px;
      padding: 0 10px;
      .logo{
        width: 26px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
    ul{
      width: 50%;
      float: right;
      display: flex;
      justify-content: flex-end;
      li{
        color: $cl-txt;
        padding: 0 20px;
        cursor: pointer;
        background:$color-background;
        transition: all .5s;
        &:hover{
          background:$color-background-h;
        }
        &.active{
          color: $cl-txt;
          background:$color-highlight-background;
          &:hover{
            background:$color-highlight-background-h;
          }
        }
      }
    }

  }



</style>

