// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import store from './store'
import 'assets/css/index.scss'
import 'element-ui/lib/theme-chalk/index.css'
import 'jquery-ui'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})



// //自定义指令
// Vue.directive('drag',
//   {
//     bind: function (el, binding) {
//       let oDiv = el   //当前元素
//       let self = this  //上下文
//       oDiv.onmousedown = function (e) {
//         e.stopPropagation();
//         //鼠标按下，计算当前元素距离可视区的距离
//         let disX = e.clientX - oDiv.offsetLeft
//         let disY = e.clientY - oDiv.offsetTop
//
//         document.onmousemove = function (e) {
//           e.stopPropagation();
//           //通过事件委托，计算移动的距离
//           let l = e.clientX - disX
//           let t = e.clientY - disY
//
//           var xMax = document.documentElement.clientWidth - 100
//           var xMin = 0
//           var yMax = document.documentElement.clientHeight - 100
//           var yMin = 0
//
//           if (l >= xMax) {
//             l = xMax
//           } else if (l <= xMin) {
//             l = xMin
//           }
//
//           if (t >= yMax) {
//             t = yMax
//           } else if (t <= yMin) {
//             t = yMin
//           }
//
//           //移动当前元素
//           oDiv.style.left = l + 'px'
//           oDiv.style.top = t + 'px'
//
//           //将此时的位置传出去
//           binding.value({x: l, y: t})
//           return false;
//         }
//         document.onmouseup = function (e) {
//           e.stopPropagation();
//           document.onmousemove = null
//           document.onmouseup = null
//         }
//       }
//     }
//   }
// )

//
// Vue.directive('resizable', {
//   bind: function (panel, binding) {
//     var right = document.createElement('div')
//     var bottom = document.createElement('div')
//     var right_bottom = document.createElement('div')
//     right.className = 'resizable-r resizable-control'
//     bottom.className = 'resizable-b resizable-control'
//     right_bottom.className = 'resizable-rb resizable-control'
//     //将元素添加到文档中
//     panel.appendChild(right)
//     panel.appendChild(bottom)
//     panel.appendChild(right_bottom)
//     //为每一个元素添加事件，并传入相应的参数
//     right.onmousedown = function (event) {
//       event.stopPropagation();
//       fnDown(event, panel, right, 'right')
//     }
//     bottom.onmousedown = function (event) {
//       event.stopPropagation();
//       fnDown(event, panel, bottom, 'bottom')
//     }
//     right_bottom.onmousedown = function (event) {
//       event.stopPropagation();
//       fnDown(event, panel, right_bottom, 'right_bottom')
//     }
//   }
// })
// function fnDown (event, panel, control, type) {
//   event = event || window.event
//   //按下鼠标时，鼠标距离控制元素左上角的距离
//   //由于控制元素是绝对定位的，而且有一个已经定位的父元素，所以控制元素的offsetLeft值与offsetTop值需要额外处理
//   //控制元素right其offsetTop值为0.其真正距离页面上端的距离应该为它自己的offsetTop加上其父元素的offsetTop；
//   //其offsetLeft为390，其真正距离页面左边的距离应该加上其父元素的offsetLeft
//   var m_start_x = event.clientX - (control.offsetLeft + panel.offsetLeft)
//   var m_start_y = event.clientY - (control.offsetTop + panel.offsetTop)
//
//   document.onmousemove = function (event) {
//     event = event || window.event
//     //计算控制元素移动的动态距离
//     var l = event.clientX - panel.offsetLeft - m_start_x
//     var t = event.clientY - panel.offsetTop - m_start_y
//     //控制其移动最小距离
//     if (l < 200) {
//       l = 200
//     }
//     if (t < 50) {
//       t = 50
//     }
//     //对不同类型的控制元素分别进行处理
//     switch (type) {
//       case 'right':
//         //让控制元素跟随鼠标移动
//         //一定要记得加单位！！！
//         control.style.left = l + 'px'
//         //调整面板
//         panel.style.width = l + 10 + 'px'
//         break
//       case 'bottom':
//         control.style.top = t + 'px'
//         panel.style.height = t + 10 + 'px'
//         break
//       case 'right_bottom':
//         control.style.left = l + 'px'
//         control.style.top = t + 'px'
//         panel.style.width = l + 10 + 'px'
//         panel.style.height = t + 10 + 'px'
//     }
//     return false
//   }
//
//   document.onmouseup = function () {
//     //取消鼠标跟随
//     document.onmousemove = null
//     document.onmouseup = null
//     //将控制元素的位置复原
//     var controls = document.getElementsByClassName('resizable-control')
//     for (var i = 0, l = controls.length; i < l; i++) {
//       controls[i].style.left = ''
//       controls[i].style.top = ''
//     }
//   }
// }
