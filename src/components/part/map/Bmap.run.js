/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import $ from 'jquery'


export default {
  run(opt) {
    // 百度地图API功能
    var map = new BMap.Map(opt.contentId,{minZoom:5,maxZoom:18});    // 创建Map实例

    map.centerAndZoom(opt.center, opt.zoom);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.MapTypeControl({
      mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
      ]}));
    var local = new BMap.LocalSearch(map, {
      renderOptions:{map: map}
    });
    local.search(opt.searchKey);

    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setMapStyle({style:opt.style});

  }
}
