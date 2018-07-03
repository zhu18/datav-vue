/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/27.
 */
import $ from 'jquery'
import PartChartLine from '@/components/part/chart/Line.run.js'
import PartChartPie from '@/components/part/chart/Pie.run.js'
import PartChartBar from '@/components/part/chart/Bar.run.js'
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
      PartChartLine,
      PartChartPie,
      PartTextTitle,
      PartChartBar
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
