<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id edit.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/29 09:44
 - @uses The article edit from page.
-->
<template>
  <article-detail :is-edit="true" />
</template>

<script>
import ArticleDetail from './components/ArticleDetail'

export default {
  name: 'ArticleEditForm',
  components: { ArticleDetail }
}
</script>
