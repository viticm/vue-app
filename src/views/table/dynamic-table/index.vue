<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id index.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/08 19:32
 - @uses The dynamic table template.
-->
<template>
  <v-container fluid>
    <v-card>
      <br />
      <div style="margin:0 0 5px 20px">
        {{ $t('table.dynamicTips1') }}
      </div>
      <fixed-thead />

      <div style="margin:30px 0 5px 20px">
        {{ $t('table.dynamicTips2') }}
      </div>
      <unfixed-thead />
    </v-card>
  </v-container>
</template>

<script>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'

export default {
  name: 'DynamicTable',
  components: { FixedThead, UnfixedThead }
}
</script>

