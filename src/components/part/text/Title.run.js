/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import $ from 'jquery'
import Runtime from '@/assets/js/Runtime.js'

export default {
  run(opt) {
    console.log('run title...')
    Runtime.paramParse(opt)
    $('#'+opt.contentId).css({
      verticalAlign:opt.verticalAlign,
      textAlign:opt.textAlign,
      fontSize:opt.fontSize,
      color:opt.fontColor,
      fontFamily:opt.fontFamily})
      .text(opt.text)

  }
}
