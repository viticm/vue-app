<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id server-create.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/17 15:09
 - @uses The server create page.
-->
<template>
  <server-detail :is-edit="false" />
</template>

<script>
import ServerDetail from './components/ServerDetail'

export default {
  name: 'ServerCreateForm',
  components: { ServerDetail }
}
</script>
