<template>
  <div :id="id" :class="typeClass" v-drag="onDrag" v-resizable="onResize"
       :style="{top:$self.top+'px', left:$self.left+'px', width:$self.width +'px', height:$self.height +'px'}"
       @mousedown.prevent.self="onSelected">
    <div class='opt'>
      <div class='clone'><i class='iconfont icon-clone' title='复制' @click.prevent.self="clone"></i></div>
      <div class='del'><i class='iconfont icon-close' title='删除' @click.prevent.self="remove"></i></div>
    </div>
    <div :id="id+'_content'" ></div>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapGetters } from 'vuex'
  import PartServer from '@/components/part/PartServer.js'

  export default{
    props: ['pId', 'pType'],
    data() {
      return {
        //组件类型
        type: 'part',
        run: false,
      }
    },
    render(h) {
      return h('div', {
        class: this.typeClass,
        attrs: {id: this.id},
        style: {
          top: this.$self.top + 'px',
          left: this.$self.left + 'px',
          width: this.$self.width + 'px',
          height: this.$self.height + 'px'
        },
        directives: [{
          name: 'drag',
          value: this.onDrag,
        }, {
          name: 'resizable',
          value: this.onResize,
        }],
        on: {
          click: (e) => {
            e.preventDefault()
            this.onSelected()
            return false
          }
        }

      }, [
        // part=>opt
        h('div', {
          class: 'opt'
        }, [
          // part=>opt=>clone
          h('div', {class: 'clone'}, [
            // part=>opt=>icon-clone
            h('i', {
              class: 'iconfont icon-clone', on: {
                click: (e) => {
                  e.preventDefault()
                  this.clone()
                  return false
                }
              }
            })
          ]),
          // part=>opt=>del
          h('div', {class: 'del'}, [
            // part=>opt=>icon-close
            h('i', {
              class: 'iconfont icon-close', on: {
                click: (e) => {
                  e.preventDefault()
                  this.remove()
                  return false
                }
              }
            })
          ]),
        ]),
        // part=>content
        this.partRender(h)
      ])
    },
    computed: {
      // 得到已选中组件
      ...mapGetters(['viewZoom', 'selectedPart']),
      id() {
        return this.pId;
      },
      name() {
        return this.$self.name
      },
      typeClass() {
        return this.type.replace(/\./g, ' ') + ' ' + (this.isSelected ? 'selected' : '');
      },
      isSelected() {
        return this.$self.selected
      },
      $self() {
        return PartServer.getPartById(this.id)
      }
    },
    created() {
      this.$nextTick(() => {
        console.log('---part-next--created');
      })
      console.log('---part--created');
    },
    mounted() {
      this.$nextTick(() => {

      })

      console.log('---part--mounted id:' + this.id + ' type:' + this.pType);
    },
    methods: {
      onDrag(val) {
        PartServer.updatePart({id: this.id, top: val.y, left: val.x})
      },
      onResize(val) {
        PartServer.updatePart({id: this.id, ...val})
      },
      onSelected(e) {
        if (this.selectedPart && this.id != this.selectedPart.id) {
          //this.$store.commit('UPDATE_PART', {id: this.selectedPart.id, selected: false})
          PartServer.updatePart({id: this.selectedPart.id, selected: false})
        }
        PartServer.updatePart({id: this.id, selected: true})
        //this.$store.commit('UPDATE_PART', {id: this.id, selected: true})
      },
      remove() {
        //this.$store.commit('DEL_PART', {id: this.id})
        PartServer.deletePart({id: this.id})
      },
      clone() {
        PartServer.clonePart(this.$self)
      }
    },
    directives: {
      drag: {
        bind(el, binding) {
          let oDiv = el   //当前元素

          oDiv.onmousedown = function (e) {
            e.stopPropagation()
            let zoom = store.state.viewZoom
            let part = PartServer.getPartById(oDiv.id)
            let viewWidth = store.state.viewWidth - part.width
            let viewHeight = store.state.viewHeight - part.height

            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft
            let disY = e.clientY - oDiv.offsetTop
            let l = (e.clientX - disX)
            let t = (e.clientY - disY)

            document.onmousemove = function (e) {
              e.stopPropagation()
              //通过事件委托，计算移动的距离
              let l = (e.clientX - disX)
              let t = (e.clientY - disY)

              var xMax = viewWidth //document.documentElement.clientWidth - 100
              var xMin = 0
              var yMax = viewHeight //document.documentElement.clientHeight - 100
              var yMin = 0

              if (l >= xMax) {
                l = xMax
              } else if (l <= xMin) {
                l = xMin
              }

              if (t >= yMax) {
                t = yMax
              } else if (t <= yMin) {
                t = yMin
              }
              console.log('l:' + l + ',t:' + t)
              //移动当前元素
              oDiv.style.left = l + 'px'
              oDiv.style.top = t + 'px'
              //将此时的位置传出去
              binding.value({x: +l, y: +t})
              return false
            }
            document.onmouseup = function (e) {
              e.stopPropagation()
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        }
      },
      resizable: {
        bind: function (el, binding) {
          var panel = el
          var right = document.createElement('div')
          var bottom = document.createElement('div')
          var right_bottom = document.createElement('div')
          right.className = 'resizable-r resizable-control'
          bottom.className = 'resizable-b resizable-control'
          right_bottom.className = 'resizable-rb resizable-control'
          //将元素添加到文档中
          panel.appendChild(right)
          panel.appendChild(bottom)
          panel.appendChild(right_bottom)
          //为每一个元素添加事件，并传入相应的参数
          right.onmousedown = function (event) {
            event.stopPropagation();
            fnDown(event, panel, right, 'right', binding)
          }
          bottom.onmousedown = function (event) {
            event.stopPropagation();
            fnDown(event, panel, bottom, 'bottom', binding)
          }
          right_bottom.onmousedown = function (event) {
            event.stopPropagation();
            fnDown(event, panel, right_bottom, 'right_bottom', binding)
          }
        }
      }
    }
  }
  function fnDown (event, panel, control, type, binding) {
    event = event || window.event
    //按下鼠标时，鼠标距离控制元素左上角的距离
    //由于控制元素是绝对定位的，而且有一个已经定位的父元素，所以控制元素的offsetLeft值与offsetTop值需要额外处理
    //控制元素right其offsetTop值为0.其真正距离页面上端的距离应该为它自己的offsetTop加上其父元素的offsetTop；
    //其offsetLeft为390，其真正距离页面左边的距离应该加上其父元素的offsetLeft
    let m_start_x = event.clientX - (control.offsetLeft + panel.offsetLeft)
    let m_start_y = event.clientY - (control.offsetTop + panel.offsetTop)

    document.onmousemove = function (event) {
      event = event || window.event
      //计算控制元素移动的动态距离
      var l = event.clientX - panel.offsetLeft - m_start_x
      var t = event.clientY - panel.offsetTop - m_start_y
      //控制其移动最小距离
      if (l < 100) {
        l = 100
      }
      if (t < 50) {
        t = 30
      }
      //对不同类型的控制元素分别进行处理
      switch (type) {
        case 'right':
          //让控制元素跟随鼠标移动
          //一定要记得加单位！！！
          control.style.left = l + 'px'
          //调整面板
          panel.style.width = l + 10 + 'px'
          binding.value({width: l + 10})
          break
        case 'bottom':
          control.style.top = t + 'px'
          panel.style.height = t + 10 + 'px'
          binding.value({height: t + 10})
          break
        case 'right_bottom':
          control.style.left = l + 'px'
          control.style.top = t + 'px'
          panel.style.width = l + 10 + 'px'
          panel.style.height = t + 10 + 'px'
          binding.value({width: l + 10, height: t + 10})
      }
      return false
    }

    document.onmouseup = function () {
      //取消鼠标跟随
      document.onmousemove = null
      document.onmouseup = null
      //将控制元素的位置复原
      var controls = document.getElementsByClassName('resizable-control')
      for (var i = 0, l = controls.length; i < l; i++) {
        controls[i].style.left = ''
        controls[i].style.top = ''
      }
    }
  }
</script>
