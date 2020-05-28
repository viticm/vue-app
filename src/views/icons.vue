<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id icons.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/05/25 15:46
 - @uses The icons page.
-->
<template>
  <v-container grid-list-xl fluid>
    <v-card>
      <v-subheader>
        Icons
        <v-spacer></v-spacer>
        <a :href="'https://cdn.materialdesignicons.com/' + version">
          https://cdn.materialdesignicons.com/{{ version }}
        </a>
      </v-subheader>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(item, index) in iconsMap"
          :key="index"
          class="icon-item"
        >
          <v-tooltip
            z-index="1003"
            top
          >
            <template
              v-slot:activator="{ on }"
            >
              <v-btn v-on="on" icon
                @click="handleClipboard('.icon-item', 'mdi-' + item)"
                >
                <v-icon>mdi-{{ item }}</v-icon>
              </v-btn>
            </template>
            <span>mdi-{{ item }}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import handleClipboard from '@/utils/clipboard'
import icons from '@/data/icons'
import iconsJson from '@mdi/font/package.json'

export default {
  name: 'VIcons',
  data() {
    return {
      iconsMap: icons,
      version: iconsJson.version
    }
  },
  methods: {
    handleClipboard(target, text) {
      console.log('target text', target, text)
      handleClipboard(target, text)
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-item {

}
</style>
