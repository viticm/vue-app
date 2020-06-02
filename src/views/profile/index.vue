<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id index.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/06/02 09:21
 - @uses The profile page.
-->
<template>
  <v-container fluid>
    <div v-if="user">
      <v-row>

        <v-col xs="12" sm="3">
          <user-card :user="user" />
        </v-col>

        <v-col xs="12" sm="9">
          <v-card>
            <v-tabs v-model="activeTab">
              <v-tab>{{ $t('common.activity') }}</v-tab>
              <v-tab>{{ $t('common.timeline') }}</v-tab>
              <v-tab>{{ $t('common.account') }}</v-tab>
            </v-tabs>
            <v-tabs-items v-model="activeTab">
              <v-tab-item>
                <activity />
              </v-tab-item>
              <v-tab-item>
                <timeline />
              </v-tab-item>
              <v-tab-item>
                <account :user="user" />
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>

      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'role',
      'email'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.role,
        email: this.email,
        avatar: this.avatar
      }
    }
  }
}
</script>
