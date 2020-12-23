<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id someone.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/12/23 11:22
 - @uses Someone page.
-->
<template>
  <someone-detail :is-edit="false" />
</template>

<script>
import SomeoneDetail from './components/SomeoneDetail'

export default {
  name: 'SomeoneEditForm',
  components: { SomeoneDetail }
}
</script>
