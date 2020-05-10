<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
  >
    <v-list dense>
      <v-list-item link to="dashboard">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('route.dashboard') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="settings">
        <v-list-item-action>
          <v-icon>mdi-image-filter-vintage</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('route.settings')  }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="route">
        <v-list-item-action>
          <v-icon>mdi-router</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('route.routes')}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
      }
    }
  }
</script>
