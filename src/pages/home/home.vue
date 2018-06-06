<template>
  <div class="home-wrap">


    <a target="_blank" href="https://github.com/jusfoun-FE/spa-development-PC/blob/master/README.md">VUE-PC模板使用说明</a>

      <div class="theme-wrapper">
        <theme></theme>
      </div>



  </div>


</template>

<script type="text/javascript">
  import theme from 'components/theme/theme'
  export default {
    name: 'home',
    data(){
      return {

      }
    },
    methods:{
    },
    components:{
       theme
    }
   }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";

  .home-wrap{
    padding: 20px;
    a{
      text-decoration: underline;
      color: #F17470;
      font-size: 20px;
    }
    .theme-wrapper{
      float: right;
    }
  }

</style>
