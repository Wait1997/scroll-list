<template>
  <div id="app">
    <el-select v-scroll="handleScroll" v-model="value" placeholder="请选择">
      <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script>
import { throttle } from './utils/utils'

export default {
  name: 'App',
  data() {
    return {
      pageIndex: 1,
      pageSize: 100,
      value: '',
      list: []
    }
  },
  mounted() {
    this.list = this.apiData(this.pageIndex)
  },
  methods: {
    handleScroll: throttle(function(direction) {
      if (direction) {
        console.log(direction)
        this.pageIndex = this.pageIndex + 1
        this.list.push(...this.apiData(this.pageIndex))
      }
    }),
    apiData(pageIndex) {
      const list = []
      for (let i = this.pageSize * (pageIndex - 1); i < this.pageSize * pageIndex; i++) {
        list.push({
          name: `这是一条测试数据 代号：${i}`,
          id: i
        })
      }
      return list
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
