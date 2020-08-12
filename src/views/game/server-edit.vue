<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id server-edit.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/17 15:09
 - @uses The server edit page.
-->
<template>
  <server-detail :is-edit="true" />
</template>

<script>
import ServerDetail from './components/ServerDetail'

export default {
  name: 'ServerEditForm',
  components: { ServerDetail }
}
</script>
