<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id RouteLink.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/04 11:41
 - @uses The route link.
-->
<template>
  <v-list-item
    link
    :to="to"
  >
    <v-list-item-action v-if="item.meta && item.meta.icon">
      <v-icon>{{ item.meta.icon }}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title v-if="item.meta && item.meta.title">
        {{ $t('route.' + item.meta.title) }}
      </v-list-item-title>
      <v-list-item-title v-else-if="item.name">
        {{ $t('route.' + item.name) }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'RouteLink',
  props: {
    item: {
      type: Object,
      required: true
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
