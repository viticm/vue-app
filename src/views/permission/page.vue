<!--
 - VUE APP ( https://github.com/viticm/vue-app )
 - $Id page.vue
 - @link https://github.com/viticm/vue-app for the canonical source repository
 - @copyright Copyright (c) 2020 viticm( viticm.ti@gmail.com )
 - @license
 - @user viticm( viticm.ti@gmail.com )
 - @date 2020/05/22 19:37
 - @uses The page permission page.
-->
<template>
  <v-container grid-list-xl fluid>
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="path"
      class="elevation-1"
    >
      <!-- dialog start -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t('common.roleTable')}}
          </v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <!--
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">
                {{ $t('common.new') }}
              </v-btn>
            </template>
            -->
            <v-card
              class="mx-auto"
              max-width="500"
            >
              <v-sheet class="pa-4 primary lighten-2">
                <v-text-field
                  v-model="search"
                  label="Search Company Directory"
                  dark
                  flat
                  solo-inverted
                  hide-details
                  clearable
                  clear-icon="mdi-close-circle-outline"
                ></v-text-field>
                <v-checkbox
                  v-model="caseSensitive"
                  dark
                  hide-details
                  label="Case sensitive search"
                ></v-checkbox>
              </v-sheet>
              <v-card-text>
                <v-treeview
                  :items="items"
                  :search="search"
                  :filter="filter"
                  :open.sync="open"
                >
                  <template v-slot:prepend="{ item }">
                    <v-icon
                      v-if="item.children"
                      v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
                    ></v-icon>
                  </template>
                </v-treeview>
              </v-card-text>
            </v-card>
            <!--
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="editForm">
                    <v-row>
                      <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.name" 
                          :label="$t('common.name')">
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
            </v-card>
            -->
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- dialog end -->

      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          @click="edit(item)"
          color="primary"
        >
          Edit permission
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>

    </v-data-table>
  </v-container>
</template>

<script>
  import i18n from '@/lang'
  import { getRoles } from '@/api/role'
  export default {
    data: () => ({
      dialog: false,
      items: [
        {
          id: 1,
          name: 'Vuetify Human Resources',
          children: [
            {
              id: 2,
              name: 'Core team',
              children: [
                {
                  id: 201,
                  name: 'John',
                },
                {
                  id: 202,
                  name: 'Kael',
                },
                {
                  id: 203,
                  name: 'Nekosaur',
                },
                {
                  id: 204,
                  name: 'Jacek',
                },
                {
                  id: 205,
                  name: 'Andrew',
                },
              ],
            },
            {
              id: 3,
              name: 'Administrators',
              children: [
                {
                  id: 301,
                  name: 'Ranee',
                },
                {
                  id: 302,
                  name: 'Rachel',
                },
              ],
            },
            {
              id: 4,
              name: 'Contributors',
              children: [
                {
                  id: 401,
                  name: 'Phlow',
                },
                {
                  id: 402,
                  name: 'Brandon',
                },
                {
                  id: 403,
                  name: 'Sean',
                },
              ],
            },
          ],
        },
      ],
      open: [1, 2],
      search: null,
      caseSensitive: false,
      desserts: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const r = await getRoles()
        if (20000 === r.code) {
          this.desserts = r.data
        }
      },
      edit (item) {
        if (item.id) {
          this.dialog = true
        }
      }
    },

    computed: {
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },
      headers () {
        return [
          {
            text: i18n.t('common.name'),
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: i18n.t('common.name'), value: 'name' },
          { text: i18n.t('common.description'), value: 'description' },
          { text: i18n.t('common.actions'), value: 'actions', sortable: false },
        ]
      },
    },

  }
</script>
