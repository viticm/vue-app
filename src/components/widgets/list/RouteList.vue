<template>
  <v-list-group
    v-if="item.children &&
        !(1 === item.children.length &&
        'index' === item.children[0].path)"
    v-model="item.model"
    :prepend-icon="'object' === typeof item.meta ? item.meta.icon : ''"
    :sub-group="sub"
    no-action
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-if="item.meta && item.meta.title">
          {{ $t('route.' + item.meta.title) }}
        </v-list-item-title>
        <v-list-item-title v-else-if="item.name">
          {{ $t('route.' + item.name) }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <template v-for="(child, i) in item.children">
      <route-link 
        v-if="! child.children" 
        :key="i" 
        :item="child"
        :to="resolvePath(child.path)" />

      <!-- Sub slot, vuetify just deep 2 -->
      <!--
      <slot
        v-else-if="! sub"
        name="sub"
        :item="child">
      </slot>
      -->

      <!-- Use recursion -->
      <route-list v-else-if="! sub" 
        :key="child.path" 
        :item="child" 
        :base-path="resolvePath(child.path)"
        sub />

    </template>

  </v-list-group>
  <route-link v-else 
    :item="item" 
    :key="item.name" 
    :to="resolvePath(item.path, item.children && item.children[0])" />
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import RouteLink from './RouteLink'
export default {
  name: 'RouteList',
  components: {
    RouteLink,
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    sub: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    resolvePath (routePath, child) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      if ('object' === typeof child) {
        return path.resolve(this.basePath, child.path || 'index')
      } else {
        // console.log('resolvePath', routePath, this.basePath)
        return path.resolve(this.basePath, routePath)
      }
    },
  }

}

</script>
