<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id server-opt-create.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/18 22:35
 - @uses The server option edit page.
-->
<template>
  <server-opt-detail :is-edit="false" />
</template>

<script>
import ServerOptDetail from './components/ServerOptDetail'

export default {
  name: 'ServerEditOptForm',
  components: { ServerOptDetail }
}
</script>
