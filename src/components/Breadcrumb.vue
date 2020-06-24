<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id breadcrumbs.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/05 14:55
 - @uses the route link breadcrumbs component.
         目前面包屑导航由于组件的限制，无法完美的解决过度动画的问题
         （transition）
-->
<template>
  <v-breadcrumbs :items="levelList">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item>
        <span v-if="item.redirect === 'noRedirect' ||
          item == levelList[levelList.length - 1]">
          {{ generateTitle(item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ generateTitle(item.meta.title) }}
        </a>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import { generateTitle } from '@/utils/i18n'
import { compile } from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs

      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getbreadcrumbs()
    }
  },
  created() {
    this.getbreadcrumbs()
  },
  methods: {
    generateTitle,
    getbreadcrumbs () {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title)
      const first = matched[0]

      if (! this.isIndex(first)) {
        matched =
          [{ path: '/', meta: { title: 'index' }}].concat(matched)
      }

      this.levelList = matched.filter(item => item.meta &&
        item.meta.title &&
        item.meta.breadcrumb !== false)
    },
    isIndex (route) {
      if (! route) {
        return false
      }
      if (route.meta && 'index' === route.meta.title) {
        return true
      }
      const name = route.name
      if (! name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Index'.toLocaleLowerCase()
    },
    pathCompile (path) {
      const { params } = this.$route
      return compile(path)(params)
    },
    handleLink (item) {
      const { redirect, path } = item
      if (redirect) {
        if (redirect !== this.$route.path) {
          this.$router.push(redirect)
        }
        return
      }
      const toPath = this.pathCompile(path)
      this.$router.push(toPath)
    }
  }
}
</script>
