template>
  <div class="theme-wrap">
       <ul>
        <li v-for="item in themeList"
          :class="item"
          @click="changeTheme(item)"
        ></li>
      </ul>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    data(){
      return{
        isShow:false,
        themeList:['red','blue','yellow']
      }
    },
    methods:{
      //vuex中设置mutations
      ...mapMutations({
        setTheme: 'SET_THEME'
      }),
      changeTheme(theme) {
        // 存取 localStorage 以防页面刷新 丢失主题
        localStorage.setItem('theme', theme)
        this.setTheme(theme)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/lib-variable";
  @import "~assets/css/lib-mixin";
  .theme-wrap {
    ul{
      display: flex;
      li{
        width:50px;
        height: 30px;
        margin: 0 5px;
        cursor: pointer;
        &.red{
           background: #f00;
        }
        &.blue{
          background: #00f;
        }
        &.yellow{
          background: #ff0
        }
      }
    }
  }
</style>
