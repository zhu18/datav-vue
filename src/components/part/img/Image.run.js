/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import $ from 'jquery'


export default {
  run(opt) {
    var content=$('#'+opt.contentId)
    content.html('')
    $('<img/>').attr({src:opt.src}).css({width:'100%',height:'100%'}).appendTo(content)

  }
}
