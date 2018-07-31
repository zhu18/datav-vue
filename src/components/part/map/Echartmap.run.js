/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/6/26.
 */
import ChartServer from '9cf-chart'
require('9cf-chart/map/js/china')

export default {
  run(opt) {
    return ChartServer.init({id: opt.chartId, container: opt.contentId})
  }
}
