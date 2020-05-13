<template>
  <v-app id="inspire">
    <app-drawer class="app--drawer" />
    <app-toolbar class="app--toolbar" />
    
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <router-view />
        </v-row>
      </v-container>
    </v-content>

    <app-right-settings 
      ref="rightSettings" 
      @toggleTemporary="toggleTemporary"
    />

    <v-footer app>
      <span>&copy; {{ currentYear }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import AppDrawer from '@/components/AppDrawer'
  import AppToolbar from '@/components/AppToolbar'
  import AppRightSettings from '@/components/AppRightSettings.vue'
  export default {
    components: {
      AppDrawer,
      AppToolbar,
      AppRightSettings
    },

    props: {
      source: String,
    },

    data: () => ({
      currentYear: new Date().getFullYear(),
    }),

    created () {
      this.$vuetify.theme.dark = this.$store.state.settings.themeDark
    },

    methods: {
      toggleTemporary(val) {
        if (this.$refs.sidebar) { 
          this.$refs.sidebar.toggleTemporary(val)
        }
      }
    }
  }
</script>
