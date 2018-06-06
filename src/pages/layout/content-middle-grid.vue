<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    methods: {

    },
    mounted() {
      this.$nextTick(()=>{
          initCanvas(this.$refs.canvas);
        })
    }
  }

  function initCanvas(canvas){
    let max=5000
    canvas.width=max
    canvas.height=max
    let ctx = canvas.getContext('2d')
    let offsetX=20
    let offsetY=20


    ctx.rect(0,0,max+offsetX,offsetY);
    ctx.rect(0,0,offsetX,max+offsetY);
    ctx.fillStyle="#fff";
    ctx.fill();

    // x,y轴
    ctx.moveTo(offsetX,offsetY);
    ctx.lineTo(max+offsetX,offsetY);
    ctx.moveTo(offsetX,offsetY);
    ctx.lineTo(offsetX,max+offsetY);
    ctx.fillStyle="#000";
    // x轴刻度
    for(var i=0;i<max/10;i++){
      var x=i*10+offsetX;
      if(i%10==0){// 100 & font
        ctx.moveTo(x,0);
        ctx.lineTo(x,offsetY);
        ctx.font="14px";
        ctx.fillText(i*10,x+2,10);
      }
      else if(i%5==0){// 50
        ctx.moveTo(x,offsetY-10);
        ctx.lineTo(x,offsetY);
      }
      else
      {
        ctx.moveTo(x,offsetY-5);
        ctx.lineTo(x,offsetY);
      }
    }

    // y轴刻度
    for(var i=0;i<max/10;i++){
      var y=i*10+offsetY;
      if(i%10==0){
        ctx.moveTo(0,y);
        ctx.lineTo(offsetX,y);
        ctx.font="14px";
        ctx.fillText(i*10,2,y+10);
      }
      else if(i%5==0){
        ctx.moveTo(offsetX-10,y);
        ctx.lineTo(offsetX,y);
      }
      else
      {
        ctx.moveTo(offsetX-5,y);
        ctx.lineTo(offsetX,y);
      }
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0,0,0,1)';
    ctx.stroke();


    // 网格
    for(var i=0;i<max/10;i++)
    {
      var x=i*10+offsetX;
      var y=i*10+offsetY;

      if(i%10==0){
        ctx.beginPath();
        ctx.moveTo(x,offsetY);
        ctx.lineTo(x,max);
        ctx.moveTo(offsetX,y);
        ctx.lineTo(max,y);

        ctx.setLineDash([3,3]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,90,90,.8)';
        ctx.stroke();
      }
      else if(i%5==0){
        ctx.beginPath();
        ctx.moveTo(x,offsetY);
        ctx.lineTo(x,max);
        ctx.moveTo(offsetX,y);
        ctx.lineTo(max,y);
        ctx.setLineDash([3,3]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,.2)';
        ctx.stroke();
      }
    }
  }
</script>
<style>
  #canvas{
    position: absolute;
    top:0;
    left:0;
    pointer-events: none;
    z-index: 1;
  }
</style>
