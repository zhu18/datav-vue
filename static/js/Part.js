/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/27.
 */
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
var Part = function (opt) {
  $.extend(true, this, opt)
  this.el = $('<div>')
}

Part.prototype = {
  init: function (opt) {
    $.extend(true, this, opt)
    this.el.attr({
      id: this.id,
      name: this.name,
      type: this.type,
      class:this.type.replace(/([A-Z])/g, (s) => '.' + s.toLowerCase()).replace(/\./g, ' ')
    }).css({
      top: this.top + 'px',
      left: this.left + 'px',
      width: this.width + 'px',
      height: this.height + 'px'
    })
    return this.el
  }
}
