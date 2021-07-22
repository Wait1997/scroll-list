import Vue from 'vue'

export default () => {
  Vue.directive('scroll', {
    bind(el, binding) {
      let scrollPosition = 0
      // 获取滚动页面DOM
      const SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
      SCROLL_DOM.addEventListener('scroll', function() {
        const LIMIT_BOTTOM = 100
        // 当前的滚动位置 减去  上一次的滚动位置
        // 如果为true则代表向上滚动，false代表向下滚动
        const flagToDirection = this.scrollTop - scrollPosition > 0
        // 记录当前的滚动位置
        scrollPosition = this.scrollTop
        // 记录滚动位置距离底部的位置
        const scrollBottom = this.scrollHeight - (this.scrollTop + this.clientHeight) < LIMIT_BOTTOM

        if (scrollBottom) {
          binding.value(flagToDirection)
        }
      })
    }
  })
}
