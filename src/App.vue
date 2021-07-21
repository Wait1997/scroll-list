<template>
  <div id="app">
    <el-select v-scroll="handleScroll" v-model="value" placeholder="请选择">
      <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      pageIndex: 1,
      pageSize: 100,
      value: '',
      pageLimit: 4,
      pageMap: [],
      list: []
    }
  },
  mounted() {
    this.list = this.ajaxData(this.pageIndex)
  },
  methods: {
    handleScroll(direction, el, middlePosition) {
      if (direction) {
        if (this.pageMap.length >= this.pageLimit) {
          // 当长度相等的时候， 绝对不能超出长度  则有进必有出
          // 删除 pageMap 列表的第一个元素
          this.pageMap.shift()
          // 对应删除list中一页的数据量
          this.list.splice(0, this.pageSize)
          // 回滚到中间位置
          el.scrollTop = middlePosition
        }
        // 请求下一页数据
        this.pageMap.push(this.pageIndex++)
        this.list.push(...this.ajaxData(this.pageIndex))
      } else {
        // 如果在向上滚动时，如果还没有到达第一页则继续加载。 如果已到达则停止加载
        if (this.pageMap[0] > 1) {
          // 向上滚动，取出pageMap中第一个元素值减1
          this.pageIndex = this.pageMap[0] - 1
          // 同步设置分页
          // ①先删除最后一个元素
          this.pageMap.pop()
          // ②将新元素添加在头部
          this.pageMap = [this.pageIndex, ...this.pageMap]
          // ①删除list中最后一页的数据
          this.list.splice(-this.pageSize, this.pageSize)
          // ②将新数据添加在头部位置
          this.list = [...this.ajaxData(this.pageIndex), ...this.list]
          // 回滚到中间位置
          el.scrollTop = middlePosition
        } else {
          return false
        }
      }
    },
    ajaxData(pageIndex) {
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
