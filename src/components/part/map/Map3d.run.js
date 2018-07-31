/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import $ from 'jquery'
// import {JFE} from '@/../static/jfe.js'
let JFE = require('@/../static/jfe.js')

export default {
  run(_opt, cb) {
    console.log('run map3d...')
    let content = $('#' + _opt.contentId)

    let baseUrl = (window.PART_STATUS === 'runtime') ? './' : './static/'

    $.getJSON(baseUrl + 'mapdata/'+_opt.area, (geoData) => {
      let opt = {
        name: 'map1',
        el: content[0],
        geoData,
        hasControls: _opt.hasControls,   //用户是否能控制视角
        autoRotate: _opt.autoRotate,   //是否自动旋转视角
        debugger: _opt.debugger,     //调试模式
        area: {
          data: [],
          color: _opt.color,     //地图颜色
          hoverColor: _opt.hoverColor,//鼠标移入颜色
          lineColor: _opt.lineColor, //线颜色
          opacity: _opt.opacity,          //地图透明度
          hasPhong: _opt.hasPhong,      //是否反光材质
          shininess: _opt.shininess,      //反光材质光滑度
          hasHoverHeight: _opt.hasHoverHeight,  //鼠标移入区域升高
        },
        mark: {
          data: [],
          color: 0xffffff,
        },
        line: {
          data: [],
          hoverExclusive: false
        },

      }

      geoData.features.forEach((i) => {
        //点数据
        // opt.mark.data.push({name:i.properties.name,color:0xca3355,coord:i.properties.cp,size:Math.random()*2.5});
        //线数据
        //   opt.line.data.push({fromName:i.properties.name,
        //     toName:'北京',
        //     haloDensity:10,
        //     hasHalo:true,
        //     hasHaloAnimate:false,
        //     spaceHeight:Math.random() * 20,
        //     color:0x0dbdff,
        //     haloColor:0x052659,
        //     haloSize:Math.random() * 10,
        //     coords:[i.properties.cp,[116.4551,40.2539]],
        //     value:Math.random()*7});
      })

      let map = new JFE.visual.Map3D(opt)
      //信息提示面板
      let infoPanel = $('<div>').css({
        position: 'fixed',
        background: _opt.msgBackground,
        color: _opt.msgColor,
        textAlign: 'center',
        borderRadius: '5px',
        padding: '10px 15px',
        border: '1px solid ' + _opt.msgBorderColor,
        transition: 'all 0.3s',
      }).appendTo(content)

      // if (_opt.hasLoadEffect) {
      //   map.setCameraPosition({x: -2, y: -26, z: 30}, 1000, 300)
      // }
      map.setCameraPosition({x:_opt.cameraX,y:_opt.cameraY,z:_opt.cameraZ},_opt.hasLoadEffect?1000:0)

      map.addEventListener('mousedown', function (event) {
        let area = event.target
        /* if(area.type==='Area'){

         let data=[];
         let color = Math.random() * 0xffffff;
         geoData.features.forEach((i)=>{
         //线数据
         data.push({
         fromName:i.properties.name,
         toName:area.name,
         haloDensity:10,
         spaceHeight:8,
         haloRunRate:0.05,
         color:color,
         haloSize:Math.random()*10,
         haloColor:0x052659,
         coords:[i.properties.cp,area.userData.cp],
         value:Math.random()*1});

         })
         data.push({
         fromName:area.name,
         toName:area.name,
         haloDensity:10,
         spaceHeight:1,
         haloRunRate:0.5,
         color:color,
         haloSize:12,
         coords:[area.userData.cp,area.userData.cp],
         value:Math.random()*1});

         map.initLine({data});

         // map.mark.data=[];
         // map.mark.data.push({name:'台风-依安',coord:[116,23],value:2,color:0xff0000,size:4,value:12},);
         // map.initMark();
         }*/
      })

      map.addEventListener('mouseout', (event) => {
        let obj = event.target
        infoPanel.hide()

        if (obj.type === 'Line') {

        }
      })
      var haloColorR, haloColorG, haloColorB
      map.addEventListener('mouseover', (event) => {
        let obj = event.target
        let mapName = ''
        if (obj.type === 'Line') {
          mapName = obj.userData.fromName + '-' + obj.userData.toName

        }
        else {
          mapName = obj.userData.name + ':' + obj.userData.id
        }
        infoPanel.html(mapName)
        infoPanel.show()
        let left = $(window).scrollLeft() + event.clientX + 20 + 'px'
        let top = $(window).scrollTop() + event.clientY + 20 + 'px'
        infoPanel.css({top, left})
      })

      map.addEventListener('resize', function (event) {
        console.log('map resize...')
      })

      cb(map)
      // map.addCameraPosition({x:-30,y:15,z:15},1000)
      //map.setPosition({x:-13,y:0,z:35})
    })

  }
}
