<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id server-list.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/07/16 20:05
 - @uses The game server list page.
-->
<template>
  <v-container grid-list-xl fluid>
    <v-row>
      <v-col cols="12">
        <v-spacer />
        <v-btn @click="newItem">{{ $t('common.new') }}</v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="path"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { fetchServerList, deleteServer } from '@/api/game'
import i18n from '@/lang'

export default {
  data : () => {
    return {
      desserts: []
    }
  },
  computed: {
    headers () {
      return [
        {
          text: i18n.t('game.hostName'),
          align: 'start',
          sortable: false,
          value: 'host_name',
        },
        { text: i18n.t('game.innerIP'), value: 'inner_ip' },
        { text: i18n.t('game.netIP'), value: 'net_ip' },
        { text: i18n.t('common.actions'), value: 'actions', sortable: false },
      ]
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const r = await fetchServerList()
      if (20000 === r.code) {
        this.desserts = r.data
      }
    },
    newItem () {
      this.$router.push('/game/server-create')
    },
    editItem (item) {
      this.$router.push('/game/server-edit/' + item.id)
    },
    async deleteItem (item) {
      const index = this.desserts.indexOf(item)
      const a = await this.$dialog.confirm({
          text: i18n.t('common.confirmRemove'),
          title: i18n.t('common.warning'),
          actions: {
            false: i18n.t('common.cancel'),
            true: {
              text: i18n.t('common.confirm')
            }
          }
      })
      // const a = confirm(i18n.t('common.confirmRemove'))
      if (a) {
        const r = await deleteServer(item.id)
        if (20000 === r.code) {
          this.desserts.splice(index, 1)
        }
      }
    }
  }
}

</script>
