<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id create.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/08 20:02
 - @uses The example article create page.
-->
<template>
  <article-detail :is-edit="false" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'ArticleCreateForm',
  components: { ArticleDetail }
}
</script>
