<template>
  <div class="home">
    <div class="card" v-for="item in utilList" :key="item.path" @click="goTo(item.path)">
      <div class="title">{{item.name}}</div>
      <div class="detail">{{item.detail}}</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data () {
    return {
      utilList: [
        { name: '中文转json', path: '/util/chineseToJson', detail: '中文通过中译英整合后转json' }
      ]
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
  .home {
    padding: 20px;
    display: flex;
    .card{
      width: 200px;
      height: 150px;
      display: flex;
      flex-direction: column;
      border: 1px solid #3a3535;
      border-radius: 20px;
      .title , .detail{
        display: flex;
        justify-content: center;
        text-align: center;
        flex:1 0 0;
      }
      .title{
        font-size: 20px;
        font-weight: 700;
        align-items: center;
      }
    }
  }
</style>
