/**
 * VUE APP ( https://github.com/viticm/vue-app )
 * $Id example.js
 * @link https://github.com/viticm/vue-app for the canonical source repository
 * @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 * @license
 * @user viticm( viticm.ti@gmail.com )
 * @date 2020/06/30 10:26
 * @uses The example zh_CN defines.
 */
export default {
  warning: '创建和编辑页面是不能被 keep-alive 缓存的，\
  因为keep-alive 的 include 目前不支持根据路由来缓存，\
  所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，\
  可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，\
  直接缓存所有页面。详情见'
}
