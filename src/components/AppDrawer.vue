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
          
          <!-- The route list -->
          <route-list v-else 
            :key="item.path" 
            :item="item" 
            :base-path="item.path" />
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import RouteList from '@/components/widgets/list/RouteList'

export default {
  components: {
    RouteList,
  },

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
  }
}
</script>
