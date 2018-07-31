/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/27.
 */
import $ from 'jquery'


// 图表
import PartChartLine from '@/components/part/chart/Line.run.js'
import PartChartPie from '@/components/part/chart/Pie.run.js'
import PartChartBar from '@/components/part/chart/Bar.run.js'
// 地图
import PartMapBmap from '@/components/part/map/Bmap.run.js'
import PartMapMap3d from '@/components/part/map/Map3d.run.js'
import PartMapEchartmap from '@/components/part/map/Echartmap.run.js'
// 图片
import PartImgBorder from '@/components/part/img/Border.run.js'
import PartImgImage from '@/components/part/img/Image.run.js'
// 文字
import PartTextTitle from '@/components/part/text/Title.run.js'

/*
 {
 "id": "part_1",
 "name": "饼图",
 "type": "PartChartPie",
 "selected": false,
 "top": 426,
 "left": 80,
 "width": 400,
 "height": 280,
 "chartId": "1453"
 },
 */
class Part {
  constructor () {

    this.el = $('<div>')
  }

  types () {
    return {
      //图表
      PartChartLine,
      PartChartPie,
      PartChartBar,
      //地图
      PartMapBmap,
      PartMapMap3d,
      PartMapEchartmap,
      //图片
      PartImgBorder,
      PartImgImage,
      //文字
      PartTextTitle,
    }
  }

  init (opt, parent) {
    $.extend(true, this, opt)
    this.el.attr({
      id: this.id,
      name: this.name,
      type: this.type,
      class: this.type.replace(/([A-Z])/g, (s) => '.' + s.toLowerCase()).replace(/\./g, ' ')
    }).css({
      top: this.top + 'px',
      left: this.left + 'px',
      width: this.width + 'px',
      height: this.height + 'px',
      background: this.background,
      borderWidth: this.borderWidth + 'px',
      borderColor: this.borderColor,
      borderStyle: this.borderStyle,
      borderRadius: 0,
      zIndex: this.zIndex
    })
    //内容容器
    let content = $('<div>').attr({id: this.contentId, class: 'part-content'})
    this.el.append(content)
    this.el.appendTo(parent)
    //内容运行
    this.run()
  }

  run () {
    console.log(this.type)
    this.types()[this.type].run(this)
  }
}

export default Part
