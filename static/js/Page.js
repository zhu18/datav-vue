/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */



function Page (opt) {
  var _opt = {
    //等比缩放
    sizeEqualRatio: false
  }
  $.extend(true, this, _opt, opt)

}

Page.prototype = {
  init: function (opt) {
    $.extend(true, this, opt)

    $(this.parts).each(function(){
      var part = new Part()
      part = part.init(this)
      $('#view').append(part);
    })

    var page = this
    window.onresize = function () {
      page.resize()
    }
    page.resize()
  },
  resize: function (w, h) {
    w = w || this.viewWidth
    h = h || this.viewHeight
    let ch = document.body.offsetHeight
    let cw = document.body.offsetWidth
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



