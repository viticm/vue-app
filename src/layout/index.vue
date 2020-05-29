<template>
  <v-app id="inspire">
    <app-drawer class="app--drawer" />
    <app-toolbar class="app--toolbar" />
    
    <v-content>
      <v-container
        class="fill-height"
        fluid
        top
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <app-tab v-if="tagsView && ! isMobile" />
            <keep-alive :include="cachedViews">
              <router-view :key="key" />
            </keep-alive>
          </v-col>
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
import { isMobile } from '@/utils/util'
import AppRightSettings from '@/components/AppRightSettings'
import AppTab from '@/components/AppTab'
export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppRightSettings,
    AppTab
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

  computed: {
    cachedViews () { 
      return this.$store.state.tagsView.cachedViews 
    },
    key () {
      return this.$route.path
    },
    tagsView () {
      return this.$store.state.settings.tagsView
    },
    isMobile () {
      return isMobile()
    },
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
