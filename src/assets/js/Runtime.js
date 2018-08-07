/**
 * Created by 九次方前端研发部-朱润亚<zry@jusfoun.com> on 2018/7/19.
 */
import config from './config'

export default class Runtime {
  static _urlParams
  static _sysParams = {
    '@@date': Runtime.sys_Date,
    '@@random': Runtime.sys_Random,
  }

  static init () {
    Runtime._urlParams = Runtime.urlArgs()
  }

  //运行时参数解析
  static paramParse (opt) {
    Runtime._urlParams = Runtime.urlArgs()
    for (let p in opt) {
      if (typeof opt[p] === 'string' && opt[p].indexOf('@') !== -1) {
        console.log(opt[p] + '=' + Runtime.getParamValue(opt[p]))
        opt[p] = Runtime.getParamValue(opt[p])
      }
    }
  }

  static getParamValue (str) {
    //'@aa()+23+@@bb(1,2)'+@@cc => @aa(),@@bb(1,2),@@cc
    let ps = str.match(/@+[a-zA-z0-9_(]+[^)]+\)|@+[a-zA-z0-9_]+/g)
    ps && ps.forEach((p) => {
      //@@系统参数
      if (p.indexOf('@@') !== -1) {
        //得到方法名称 @@date('yyyy-MM-d') => @@date
        let fn=p.match(/@+[a-z0-9A-z_]+/g)
        //得到参数 @@date('yyyy-MM-d') =>['yyyy-MM-d']
        let params = p.replace(fn,'').replace(/\(|\)/g,'').split(',')
        //调用 @@date('yyyy-MM-d') => Runtime.sys_Date('yyyy-MM-d')
        let sys_fn=Runtime._sysParams[fn]
        if(sys_fn)
        {
          let v = sys_fn(...params)
          str = str.replace(new RegExp(p.replace('(','\\(').replace(')','\\)'), 'g'), v)
        }
        else {
          console.log('无效的系统参数：'+fn)
        }
      }
      //@用户参数
      else {
        // @a = 3
        let v = Runtime._urlParams[p.replace('@', '')]
        //'@a+3+@a'  '3+3+3'
        str = str.replace(new RegExp(p, 'g'), v)
      }
    })
    // '3+3+3'=>9
    try {
      return eval(str)
    } catch (e) {
      console.log('运行时参数错误:' + str + '\n' + e.message)
      return ''
    }
  }

  static sys_Date (fmt) {
    fmt=fmt||"'yyyy-MM-dd'"
    let date = new Date()
    return date.format(fmt)
  }



  static sys_Random(min,max){
    min=min||0,max=max||10
    let rnd=Math.random() * parseInt(max) + parseInt(min)
    return parseInt(rnd)
  }

  static urlArgs () {
    let args = {}
    let query = location.search.substring(1)
    let pairs = query.split('&')
    for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=')
      if (pos === -1) {
        continue
      }
      let name = pairs[i].substring(0, pos)
      let value = pairs[i].substring(pos + 1)
      value = decodeURIComponent(value)
      args[name] = value
    }
    return args
  }
}

Date.prototype.format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
  {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }

  for(var k in o)
  {
    if(new RegExp("("+ k +")").test(fmt))
    {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }

  return fmt;
}
