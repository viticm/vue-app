<template>
   <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <v-toolbar-title>{{ $store.getters.app_name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon href="https://github.com/viticm/vue-app">
      <v-icon>mdi-github</v-icon>
    </v-btn>
    <v-btn icon @click="handleFullScreen()">
      <v-icon>mdi-fullscreen</v-icon>
    </v-btn>
    <v-menu offset-y origin="center center" 
      class="elelvation-1" 
      :nudge-right="140" 
      :nudge-bottom="14" 
      transition="scale-transition">
      <template v-slot:activator="{ on  }">
        <v-btn icon v-on="on">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>mdi-message</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <notification-list></notification-list>
    </v-menu>

    <locales-menu />

    <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
      <template v-slot:activator="{ on  }">
        <v-btn icon large v-on="on">
          <v-avatar size="35px">
            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="Leafly"/>
          </v-avatar>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
                     @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
                     :key="index">
          <v-list-item-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>
<script>
  import NotificationList from '@/components/widgets/list/NotificationList'
  import {toggleFullScreen} from '@/utils/util'
  import LocalesMenu from '@/components/widgets/LocalesMenu.vue'

  export default {
    name: 'app-toolbar',
    components: {
      NotificationList,
      LocalesMenu
    },
    computed: {
      toolbarColor () {
        return this.$vuetify.options.extra.mainNav
      },
      drawer: {
        get () {
          return this.$store.getters.drawer
        },
        set (val) {
          this.$store.dispatch('app/toggleDrawer', val)                                
        }
      },
      items () {
        return [
          {
            icon: 'mdi-account-circle',
            href: '#',
            title: this.$t('common.profile'),
            click: (e) => {
              console.log(e)
            }
          },
          {
            icon: 'mdi-image-filter-vintage',
            href: '#',
            title: this.$t('common.settings'),
            click: (e) => {
              console.log(e)
            }
          },
          {
            icon: 'mdi-fullscreen-exit',
            href: '#',
            title: this.$t('signin.signout'),
            click: this.handleLogout
          }
        ]
      }
    },
    methods: {
      handleFullScreen () {
        toggleFullScreen()
      },
      async handleLogout () {
        const r = await this.$dialog.confirm({
          text: this.$t('signin.signoutComfirm'),
          title: this.$t('common.warning'),
          actions: {
            false: this.$t('common.cancel'),
            true: {
              color: 'red',
              text: this.$t('signin.signout'),
              persistent: false
            }
          }
        })
        if (true === r) {
          await this.$store.dispatch('user/logout')
          this.$router.push(`/signin?redirect=${this.$route.fullPath}`)
        }
      }
    }
  }
</script>
