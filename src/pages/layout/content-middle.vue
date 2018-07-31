<template>
  <!-- 中心区域 -->
  <div class="content-middle">
    <div id="view-wrap" class="view-wrap">
      <GridLine></GridLine>
      <ContentView ref="view"></ContentView>
    </div>
    <textarea :class="{'view-code':true,'exp-bottom':expBottom}" @change="updateCode">
      {{code}}
    </textarea>

    <div :class="{'btn-exp':true,'btn-exp-left':true,'exp':expLeft}" @click="setExpLeft(!expLeft)">
      <i class="iconfont icon-left"></i>
    </div>
    <div :class="{'btn-exp':true,'btn-exp-right':true,'exp':expRight}" @click="setExpRight(!expRight)">
      <i class="iconfont icon-left"></i>
    </div>
    <div :class="{'btn-exp':true,'btn-exp-bottom':true,'exp':expBottom}" @click="setExpBottom(!expBottom)">
      <i class="iconfont icon-left"></i>
    </div>
  </div>
</template>
<script>
  import GridLine from './content-middle-grid.vue'
  import ContentView from './content-middle-view.vue'
  export default {
    name: 'content-middle',
    data(){
      return {
        expLeft: true,
        expRight: true,
        expBottom: true,
      }
    },
    computed: {
      code(){
        return JSON.stringify(this.$store.state)
      }
    },
    methods: {
      setExpLeft(v){
        this.expLeft = v
        this.$emit('panelExp', {expLeft: this.expLeft, expRight: this.expRight})
      },
      setExpRight(v){
        this.expRight = v
        this.$emit('panelExp', {expLeft: this.expLeft, expRight: this.expRight})
      },
      setExpBottom(v){
        this.expBottom = v
      },
      updateCode(e){
        console.log(e.target.value);
        this.$store.commit('SET_ALL',JSON.parse(e.target.value));
      }
    },
    components: {
      GridLine,
      ContentView
    }
  }
</script>
<style>
  .content-middle {
    flex: 1;
    background: #eee;
    height: 100%;
    transition: all .3s;
    position: relative;
    overflow: hidden;
  }

  /* 左右区域缩放 */
  .btn-exp {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 10px;
    height: 20px;
    background: #fff;
    margin: auto;
    line-height: 20px;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
  }

  .btn-exp .iconfont {
    display: block;
    color: #999;
    transform: translateX(-3px);
  }

  .btn-exp:hover .iconfont {
    color: #bbb;
  }

  .btn-exp.btn-exp-left.exp {
    left: 0;
    transform: rotate(0deg);
  }

  .btn-exp.btn-exp-left {
    left: 0;
    transform: rotate(180deg);
  }

  .btn-exp.btn-exp-right.exp {
    right: 0;
    transform: rotate(180deg);
  }

  .btn-exp.btn-exp-right {
    right: 0;
    transform: rotate(0deg);
  }

  .btn-exp.btn-exp-bottom.exp {
    bottom: 295px;
    transform: rotate(270deg);
  }

  .btn-exp.btn-exp-bottom {
    bottom: -5px;
    top: unset;
    right: 0;
    transform: rotate(90deg);
    left: 0;
    margin: auto;
    transition: bottom .3s;
  }

  /* 视图区 */
  .view-wrap {
    width: 100%;
    height: 100%;
    transition: all .3s;
    transform-origin: top left;
  }
  .view-code{
    position: absolute;
    width: 100%;
    height: 300px;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    bottom: 0;
    word-break: break-all;
    word-wrap: break-word;
    background: #0999;
    transition: all .3s;
    transform: translateY(300px);
    padding: 20px;
    box-sizing: border-box;
    color:#fff;
    font-size: 16px;
    font-family: consolas;
  }
  .view-code.exp-bottom{
    transform: translateY(0);
  }

  .view-code::selection {
    background:#ff645d;
    color:#fff;
  }
</style>
