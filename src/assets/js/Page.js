/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import $ from 'jquery'
import Part from './Part.js'

let opt = {
  parts: [{type: 'txt'}],
  themeCls: '',
  viewHeight: '800',
  viewWidth: '1200',
  viewZoom: 0.6,
}

class Page {
  constructor (opt) {
    var _opt = {
      //等比缩放
      sizeEqualRatio: false
    }
    $.extend(true, _opt, opt)
    $.extend(true, this, _opt)
    this.el = $('<div>').attr({id: 'view', class: 'view'}).appendTo('body')
    // 状态为运行时
    window.PART_STATUS = 'runtime'
  }

  init (opt) {
    $.extend(true, this, opt)
    this.el.css({backgroundColor: this.viewBackgroundColor, backgroundImage: 'url(' + this.viewBackgroundImage + ')'})

    this.parts.forEach((p) => {
      let part = new Part()
      part.init(p, this.el)
    })

    let page = this
    window.onresize = function () {
      page.resize()
    }
    page.resize()
  }

  resize (w, h) {
    w = w || this.viewWidth
    h = h || this.viewHeight
    let ch = document.body.offsetHeight || document.documentElement.offsetHeight
    let cw = document.body.offsetWidth || document.documentElement.offsetWidth
    let view = document.getElementById('view')
    view.style.width = w + 'px'
    view.style.height = h + 'px'

    if (this.sizeEqualRatio) {
      let minRatio = Math.min(cw / w, ch / h)
      // let zoomScale = Math.floor(minRatio * 10) / 10
      // zoomScale = zoomScale < 1 ? zoomScale : 1

      view.style.transform = 'scale(' + minRatio + ')'
    }
    else {
      let widthRatio = cw / w
      let heightRation = ch / h
      view.style.transform = 'scale(' + widthRatio + ',' + heightRation + ')'
    }
  }
}

export default Page
