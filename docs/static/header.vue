<template>
    <div class="header-wrap">
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
        window.href='http://localhost:7070/view1.html'
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
    background-color: #333;
    ul{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      li{
        color: $cl-txt;
        padding: 0 20px;
        cursor: pointer;
        &.active{
          color: red
        }
      }
    }

  }


  //换肤相关
  .theme-red{
    .header-wrap{
      li{
        &.active{
          color: red
        }
      }
    }
  }

  .theme-blue{
    .header-wrap{
      li{
        &.active{
          color:blue
        }
      }
    }
  }

  .theme-yellow{
    .header-wrap{
      li{
        &.active{
          color: yellow
        }
      }
    }
  }

</style>

