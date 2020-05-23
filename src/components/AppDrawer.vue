<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
		<v-list dense>
			<template v-for="item in items">
        <template v-if="! item.hidden">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children && 
                !(1 === item.children.length && 
                'index' === item.children[0].path)"
            :key="item.path"
            v-model="item.model"
            :prepend-icon="getIcon(item)"
            append-icon=""
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
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="item.path ? 
              ('/' === item.path ? '' : item.path)+'/' + child.path : 
              child.path"
            >
              <v-list-item-action v-if="child.meta && child.meta.icon">
                <v-icon>{{ child.meta.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-if="child.meta && child.meta.title">
                  {{ $t('route.' + child.meta.title) }}
                </v-list-item-title>
                <v-list-item-title v-else-if="child.name">
                  {{ $t('route.' + child.name) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.name"
            link
            :to="(item.redirect || item.path || '') + 
              (item.children && item.children.length > 0 ? '/index' : '')"
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
			</template>
		</v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    computed: { 
      drawer: {
        get() {
          return this.$store.getters.drawer
        },
        set(val) {
          this.$store.dispatch('app/toggleDrawer', val)                                
        }
      },
      items () {
        return this.$store.getters.routes
      }
    },
    created () {
      // console.log('The routes:', this.$store.getters.routes)
    },
    methods: {
      getIcon (item) {
        if (typeof item !== 'object' || typeof item.meta !== 'object') {
          return ''
        }
        const icon = item.model ? item.meta.icon : item.meta['icon-alt'];
        return icon || ''
      }
    }
  }
</script>
