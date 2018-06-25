<template>
  <div class="content exp-left exp-right">
    <content-left></content-left>
    <content-middle></content-middle>
    <content-right></content-right>
  </div>
</template>

<script>
  import ContentLeft from './content-left.vue'
  import ContentMiddle from './content-middle.vue'
  import ContentRight from './content-right.vue'

  export default {
    name: 'layout',
    data() {
      return {
        clientWidth:document.body.clientWidth
      }
    },
    watch:{
      clientWidth(val){
        val?this.resize():null;
      }
    },
    mounted(){
    },
    methods: {
      resize(){
        console.log('resez:'+this.clientWidth);
      }
    },
    components: {
      ContentLeft,
      ContentMiddle,
      ContentRight
    }
  }
</script>

<style>
  .content{
    flex:1;
    background:#eee;
    height: calc(100% - 41px);
    display:flex;
  }


  .content.exp-left .content-left{
    width:200px;
    transform: translateX(0);
  }
  .content.exp-right .content-right{
    width:250px;
    transform: translateX(0);
  }






  .ui-resizable-helper{
    background: rgba(220,240,255,.6);
    transform-origin: top left;
  }

  .tab-prop{
    margin-top:0;
    margin-bottom: 0;
  }
  .tab-prop-content{
    background:#fff;
  }

</style>
