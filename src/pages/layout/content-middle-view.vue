<template>
  <div id="view" :style="{width:viewWidth +'px',height:viewHeight+'px'}">

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        activeNames: ['1']

      };
    },
    computed: {
      ...mapGetters(['viewWidth','viewHeight'])
    },
    watch: {
      viewWidth(val){
        val ? this.initViewSize():null
      }
    },
    methods: {
      initViewSize(){
        let viewSize={width:this.viewWidth,height:this.viewHeight};
        let viewWrap = document.getElementById("view-wrap");
        let ch=viewWrap.offsetHeight;
        let cw=viewWrap.offsetWidth;

        let minRatio=Math.min(cw/viewSize.width,ch/viewSize.height)
        let zoomScale = Math.floor(minRatio * 10) / 10;
        zoomScale = zoomScale<1?zoomScale:1;
        this.$store.commit('SET_VIEWZOOM',zoomScale)
        console.log('gett:'+this.$store.getters.viewZoom+';state:'+this.$store.state.viewZoom);

        viewWrap.style.transform="scale("+zoomScale+")";

        console.log(cw+","+ch+'    '+zoomScale);
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initViewSize()
      })
      window.onresize=()=>{
        this.initViewSize()
      }
    }
  }


</script>
<style>
  #view{
    overflow: hidden;
    background:#234;
    height: 100%;
    position: absolute;
    top: 20px;
    left: 20px;
    box-shadow: 0 0 20px #000;
    z-index: 0;
  }
  #view.selected{
    outline: 2px solid rgb(228, 60, 89);
  }
</style>
