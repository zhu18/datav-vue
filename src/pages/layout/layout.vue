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
    width:300px;
    transform: translateX(0);
  }


  /* 组件 */
  .part-menu{
    width: 150px;
    margin: 10px auto;
    border-radius: 4px;
    border:1px solid #888;
    background:#eeeeee;
  }
  .part-menu h3{
    text-align: center;
  }
  .part-template{
    display: none;
  }
  .part{
    width: 150px;
    height: 100px;
    position: absolute;
    outline:1px solid rgba(43, 183, 255, .8)
  }
  .part-title{
    height: 20px;
    border-bottom: 1px solid #aaa;
    background:#eee;
  }
  .part.text{
    width: 400px;
    height: 100px;
    font-size: 40px;
    color:#fff;
    text-align: center;
  }
  .part:hover{
    background:  rgba(43, 183, 255, .3);
  }
  .part.selected{
    background: rgba(228, 60, 89,.3);
    outline: 2px solid rgb(228, 60, 89);
  }
  .part .opt{
    visibility:hidden;
    position: absolute;
    top:0;
    left:0;
  }
  .part .opt .clone,.part .opt .del{
    width: 20px;
    height: 20px;
    float: left;
    background: rgb(228, 60, 89);
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
  }
  .part .opt .clone:hover,.part .opt .del:hover{
    background:#bf465b;
  }
  .part.selected .opt{
    visibility:visible;
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
